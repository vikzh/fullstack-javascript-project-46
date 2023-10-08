import fs from 'fs';
import genDiffJson from '../src/compare.js';

const buildFixturePath = (fileName) => {
  const fixtureDirectory = './__fixtures__/';

  return `${fixtureDirectory}${fileName}`;
};

const extensions = ['json', 'yml'];
const stylishResult = fs.readFileSync(buildFixturePath('file1_file2_nested_stylish_result')).toString();
const plainResult = fs.readFileSync(buildFixturePath('file1_file2_nested_plain_result')).toString();
const file1NestedName = 'file1_nested';
const file2NestedName = 'file2_nested';

test.each([
  [stylishResult, 'stylish'],
  [plainResult, 'plain']])('nestedFileTest', (expectedResult, format) => {
  const [jsonExtension, ymlExtension] = extensions;
  console.log('result !!!!!', genDiffJson(buildFixturePath(`${file1NestedName}.${jsonExtension}`), buildFixturePath(`${file2NestedName}.${jsonExtension}`), format));
  expect(genDiffJson(buildFixturePath(`${file1NestedName}.${jsonExtension}`), buildFixturePath(`${file2NestedName}.${jsonExtension}`), format))
    .toBe(expectedResult);
  expect(genDiffJson(buildFixturePath(`${file1NestedName}.${ymlExtension}`), buildFixturePath(`${file2NestedName}.${ymlExtension}`), format))
    .toBe(expectedResult);
});

test('test default format', () => {
  const [jsonExtension] = extensions;
  expect(genDiffJson(buildFixturePath(`${file1NestedName}.${jsonExtension}`), buildFixturePath(`${file2NestedName}.${jsonExtension}`)))
    .toBe(stylishResult);
});
