import _ from 'lodash';

const stylish = (ast) => {
  const defaultDepth = 4;
  const clojure = (obj, depth) => {
    const result = Object.entries(obj).reduce((statuses, [key, data]) => {
      const {
        status, value, newValue, oldValue,
      } = data;
      const indent = `${(' ').repeat(defaultDepth * depth)}`;
      const changedValueIndent = `${(' ').repeat(defaultDepth * depth - 2)}`;
      switch (status) {
        case 'deleted':
          statuses = [...statuses, `${changedValueIndent}- ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
          break;
        case 'added':
          statuses = [...statuses, `${changedValueIndent}+ ${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
          break;
        case 'changed':
          statuses = [...statuses, `${changedValueIndent}- ${key}: ${_.isObject(oldValue) ? clojure(oldValue, depth + 1) : oldValue}`];
          statuses = [...statuses, `${changedValueIndent}+ ${key}: ${_.isObject(newValue) ? clojure(newValue, depth + 1) : newValue}`];
          break;
        case 'unchanged':
          statuses = [...statuses, `${indent}${key}: ${_.isObject(value) ? clojure(value, depth + 1) : value}`];
          break;
        default:
          statuses = [...statuses, `${indent}${key}: ${_.isObject(data) ? clojure(data, depth + 1) : data}`];
      }
      return statuses;
    }, []);

    const bracketIndent = `${(' ').repeat(defaultDepth * depth - defaultDepth)}}`;
    return ['{', ...result, bracketIndent].join('\n');
  };

  return clojure(ast, 1);
};

export default stylish;
