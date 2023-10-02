import fs from 'fs';
import genDiffJson from '../src/compare.js';

test('json recursive test', () => {
  expect(genDiffJson('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json'))
    .toBe((fs.readFileSync('./__fixtures__/file1_file2_nested_stylish_result')).toString());
});

test('json recursive plain formating test', () => {
  expect(genDiffJson('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'plain'))
    .toBe((fs.readFileSync('./__fixtures__/file1_file2_nested_plain_result')).toString());
});
