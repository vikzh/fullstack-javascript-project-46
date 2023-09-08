import genDiffJson from '../src/compare.js';

test('adds 1 + 2 to equal 3', () => {
    const expectedJson = {
        "- proxy": "123.234.53.22",
        "- follow": false,
        "+ verbose": true,
        "host": "hexlet.io",
        "- timeout": 50,
        "+ timeout": 20
    }
    expect(genDiffJson('./file1', './file2')).toStrictEqual(expectedJson);
});