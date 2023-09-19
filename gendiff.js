#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from './src/compare.js';
import plain from './src/formaters/plain.js';
import stylish from './src/formaters/stylish.js';
import toJson from './src/formaters/json.js';
import path from 'path';


program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')

program.parse();

const formattersMapper = {
  plain,
  stylish,
  json: toJson
};

const options = program.opts();
const formatter = formattersMapper?.[options.format] ?? stylish;
const [file1Path, file2Path] = program.args;
const file1DirectPath = path.isAbsolute(file1Path) ? file1Path : `${process.cwd()}/${file1Path}`;
const file2DirectPath = path.isAbsolute(file2Path) ? file2Path : `${process.cwd()}/${file2Path}`;

console.log(formatter(compareFiles(file1DirectPath, file2DirectPath)));
