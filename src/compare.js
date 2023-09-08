import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';

const compare = (filepath1, filepath2) => {
    const documentReaders = {
        'json': JSON.parse,
        'yaml': yaml.load,
        'yml': yaml.load
    }
    try {
        const data1 = fs.readFileSync(filepath1, 'utf8');
        const data2 = fs.readFileSync(filepath2, 'utf8');
        const fileExtension = filepath1.split('.').pop();
        console.log(fileExtension);
        const documentReader = documentReaders?.[fileExtension] ?? documentReaders.json;
        console.log(documentReader);
        return compareObjects(documentReader(data1), documentReader(data2));
    } catch (err) {
        console.error(err);
    }
}

const compareObjects = (object1, object2) => {

    const result = {};

    const deletedKeys = _.difference(_.keys(object1), _.keys(object2));
    for (const key of deletedKeys) {
        result[`- ${key}`] = object1[key];
    }

    const newKeys = _.difference(_.keys(object2), _.keys(object1));
    for (const key of newKeys) {
        result[`+ ${key}`] = object2[key];
    }

    const theSameKeys = _.intersection(_.keys(object1), _.keys(object2));
    for (const key of theSameKeys) {
        if(object1[key] === object2[key]) {
            result[key] = object1[key];
            continue;
        }

        result[`- ${key}`] = object1[key];
        result[`+ ${key}`] = object2[key];
    }

    return result;
};

export default compare;