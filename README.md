### Hexlet tests and linter status:
[![Actions Status](https://github.com/vikzh/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/vikzh/fullstack-javascript-project-46/actions)
<a href="https://codeclimate.com/github/vikzh/fullstack-javascript-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/f499d88443763ed1c956/maintainability" /></a>
# Difference generator
The utility compares the contents of file1 and file2 and writes to the standard output the list of changes necessary to convert one file into the other.  File content is produced if the files are
identical.
## Usage
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```
```shell
gendiff file1 file2
gendiff -f plain file1 file2
gendiff -f json file1 file2
```

[![asciicast](https://asciinema.org/a/JeUJk4txxmJfNa0IPm0eTrumD.svg)](https://asciinema.org/a/JeUJk4txxmJfNa0IPm0eTrumD)

## Install
```shell
make install
```

## Tests
```shell
make test
```