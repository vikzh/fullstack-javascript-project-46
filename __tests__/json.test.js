import genDiffJson from '../src/compare.js';

test('compare of 2 plain json files', () => {
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