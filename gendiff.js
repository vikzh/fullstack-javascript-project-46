import { program } from "commander";
import compare from "./compare.js";

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .option('-f', '--format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')

program.parse();
console.log(JSON.stringify(compare(...program.args), null, 2));
