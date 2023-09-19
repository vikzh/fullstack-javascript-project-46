import _ from 'lodash';

const plain = (ast) => {
    const plainValueFormater = (value) => {
        if (_.isObject(value)) {
            return '[complex value]';
        }

        if(_.isString(value)) {
            return `'${value}'`;
        }

        return  value;
    };

    const clojure = (ast, keys) => {
        let result = [];
        for (const [key, data] of Object.entries(ast)) {
            const {status, value, newValue, oldValue} = data;
            switch (status) {
                case 'deleted':
                    result.push(`Property '${[...keys, key].join('.')}' was removed`);
                    break;
                case 'added':
                    result.push(`Property '${[...keys, key].join('.')}' was added with value: ${plainValueFormater(value)}`);
                    break;
                case 'changed':
                    result.push(`Property '${[...keys, key].join('.')}' was updated. From ${plainValueFormater(oldValue)} to ${plainValueFormater(newValue)}`);
                    break;
                case 'unchanged':
                    if (_.isObject(value)) {
                        result.push(clojure(value, [...keys, key]));
                    }
                    break;
            }
        }
        return result;
    }

    return clojure(ast, []).flat().join('\n');
};

export default plain;