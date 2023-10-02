import _ from 'lodash';

const stylish = (ast) => {
  const defaultDepth = 4;
  const replacer = ' ';

  const clojure = (obj, depth) => {
    const result = Object.entries(obj).reduce((statuses, [key, data]) => {
      const {
        status, value, newValue, oldValue,
      } = data;
      const indent = `${replacer.repeat(defaultDepth * depth)}`;
      const changedValueIndent = `${replacer.repeat(defaultDepth * depth - 2)}`;
      switch (status) {
        case 'deleted':
          return [...statuses, `${changedValueIndent}- ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
        case 'added':
          return [...statuses, `${changedValueIndent}+ ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
        case 'changed':
          return [...statuses,
            `${changedValueIndent}- ${key}: ${_.isObject(oldValue) ? clojure(oldValue, depth + 1) : oldValue}`,
            `${changedValueIndent}+ ${key}: ${_.isObject(newValue) ? clojure(newValue, depth + 1) : newValue}`,
          ];
        case 'unchanged':
          return [...statuses, `${indent}${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
        default:
          return [...statuses, `${indent}${key}: ${_.isObject(data) ? clojure(data, depth + 1) : data}`];
      }
    }, []);

    const bracketIndent = `${replacer.repeat(defaultDepth * depth - defaultDepth)}}`;
    return ['{', ...result, bracketIndent].join('\n');
  };

  return clojure(ast, 1);
};

export default stylish;
