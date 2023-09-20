import _ from 'lodash';

const stylish = (ast) => {
    const defaultDepth = 4;
    const clojure = (obj, depth) => {
        const result = [];
        for (const [key, data] of Object.entries(obj)) {
            const {status, value, newValue, oldValue} = data;
            const indent = `${(' ').repeat(defaultDepth * depth)}`;
            const changedValueIndent = `${(' ').repeat(defaultDepth * depth - 2)}`;
            switch (status) {
                case 'deleted':
                    result.push(`${changedValueIndent}- ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`);
                    break;
                case 'added':
                    result.push(`${changedValueIndent}+ ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`);
                    break;
                case 'changed':
                    result.push(`${changedValueIndent}- ${key}: ${_.isObject(oldValue) ? clojure(oldValue, depth + 1) : oldValue}`);
                    result.push(`${changedValueIndent}+ ${key}: ${_.isObject(newValue) ? clojure(newValue, depth + 1) : newValue}`);
                    break;
                case 'unchanged':
                    result.push(`${indent}${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`);
                    break;
                default:
                    result.push(`${indent}${key}: ${_.isObject(data) ? clojure(data, depth + 1) : data}`);
            }
        }

        const bracketIndent = `${(' ').repeat(defaultDepth * depth - defaultDepth)}}`
        return ['{', ...result, bracketIndent].join('\n');
    };

    return clojure(ast, 1);
};

export default stylish;
