import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import stylish from './formaters/stylish.js';
import plain from './formaters/plain.js';
import toJson from './formaters/json.js';


const compareFiles = (file1Path, file2Path, format = 'stylish') => {
    const documentReaders = {
        'json': JSON.parse,
        'yaml': yaml.load,
        'yml': yaml.load
    }

    const formattersMapper = {
        plain,
        stylish,
        json: toJson
    };

    try {
        const formatter = formattersMapper?.[format] ?? stylish;
        const file1DirectPath = path.isAbsolute(file1Path) ? file1Path : `${process.cwd()}/${file1Path}`;
        const file2DirectPath = path.isAbsolute(file2Path) ? file2Path : `${process.cwd()}/${file2Path}`;

        const data1 = fs.readFileSync(file1DirectPath, 'utf8');
        const data2 = fs.readFileSync(file2DirectPath, 'utf8');
        const fileExtension = file1DirectPath.split('.').pop();
        const documentReader = documentReaders?.[fileExtension] ?? documentReaders.json;

        return formatter(compareObjects(documentReader(data1), documentReader(data2)));
    } catch (err) {
        console.error(err);
    }
}

const compareObjects = (object1, object2) => {

    const ast = {};

    const deletedKeys = _.difference(_.keys(object1), _.keys(object2));
    for (const key of deletedKeys) {
        _.set(ast,`${key}.status`, 'deleted');
        _.set(ast,`${key}.value`, object1[key]);
    }

    const newKeys = _.difference(_.keys(object2), _.keys(object1));
    for (const key of newKeys) {
        _.set(ast, `${key}.status`, 'added');
        _.set(ast, `${key}.value`, object2[key]);
    }

    const theSameKeys = _.intersection(_.keys(object1), _.keys(object2));
    for (const key of theSameKeys) {
        if ((_.isObject(object1[key]) && !_.isObject(object2[key])) || (!_.isObject(object1[key]) && _.isObject(object2[key]))){
            _.set(ast,`${key}.status`, 'changed');
            _.set(ast,`${key}.oldValue`, object1[key]);
            _.set(ast,`${key}.newValue`, object2[key]);
            return ast;
        }

        if (_.isObject(object1[key])) {
            _.set(ast,`${key}.status`, 'unchanged');
            _.set(ast,`${key}.value`, compareObjects(object1[key], object2[key]));
            continue;
        }

        if(object1[key] === object2[key]) {
            _.set(ast,`${key}.status`, 'unchanged');
            _.set(ast,`${key}.value`, object1[key]);
            continue;
        }

        _.set(ast,`${key}.status`, 'changed');
        _.set(ast,`${key}.oldValue`, object1[key]);
        _.set(ast,`${key}.newValue`, object2[key]);
    }

    return ast;
};

export default compareFiles;