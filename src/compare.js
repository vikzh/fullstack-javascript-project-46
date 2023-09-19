import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';


const compareFiles = (filepath1, filepath2) => {
    const documentReaders = {
        'json': JSON.parse,
        'yaml': yaml.load,
        'yml': yaml.load
    }
    try {
        const data1 = fs.readFileSync(filepath1, 'utf8');
        const data2 = fs.readFileSync(filepath2, 'utf8');
        const fileExtension = filepath1.split('.').pop();
        const documentReader = documentReaders?.[fileExtension] ?? documentReaders.json;

        return compareObjects(documentReader(data1), documentReader(data2));
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