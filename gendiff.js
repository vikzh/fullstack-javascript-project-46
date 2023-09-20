#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from './src/compare.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>');

program.parse();

const options = program.opts();
const [file1Path, file2Path] = program.args;

console.log(compareFiles(file1Path, file2Path, options.format));
