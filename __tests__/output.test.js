import genDiffJson from '../src/compare.js';
import stylish from '../src/formaters/stylish.js';
import plain from '../src/formaters/plain.js';

test('compare of 2 plain json files', () => {
    const expectedResult =
`{
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
  host: hexlet.io
  - timeout: 50
  + timeout: 20
}`;
    expect(stylish(genDiffJson('./file1', './file2'))).toBe(expectedResult);
});

test('compare of 2 plain yaml files', () => {
    const expectedResult =
`{
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
  host: hexlet.io
  - timeout: 50
  + timeout: 20
}`
    expect(stylish(genDiffJson('./file1.yml', './file2.yml'))).toStrictEqual(expectedResult);
});

test('json recursive test', () => {
    const expectedResult =
`{
  - group2: {
    abc: 12345
    deep: {
      id: 45
    }
  }
  + group3: {
    deep: {
      id: {
        number: 45
      }
    }
    fee: 100500
  }
  common: {
    - setting2: 200
    + follow: false
    + setting4: blah blah
    + setting5: {
      key5: value5
    }
    setting1: Value 1
    - setting3: true
    + setting3: null
    setting6: {
      + ops: vops
      key: value
      doge: {
        - wow: 
        + wow: so much
      }
    }
  }
  group1: {
    - baz: bas
    + baz: bars
    foo: bar
    - nest: {
      key: value
    }
    + nest: str
  }
}`

    expect(stylish(genDiffJson('./file1_nested.json', './file2_nested.json'))).toStrictEqual(expectedResult);
});

test('json recursive test', () => {
    const expectedResult =
`Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'common.setting2' was removed
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting3' was updated. From true to null
Property 'common.setting6.ops' was added with value: 'vops',Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'`;

    expect(plain(genDiffJson('./file1_nested.json', './file2_nested.json'))).toStrictEqual(expectedResult);
});
