#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from '../src/compare.js';

function generateDiff(file1Path, file2Path) {
  console.log(compareFiles(file1Path, file2Path, program.opts().format));
}

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(generateDiff);

program.parse();
