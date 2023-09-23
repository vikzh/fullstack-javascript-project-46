import _ from 'lodash';

// eslint-disable-next-line
const plain = (ast) => {
  const plainValueFormater = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }

    if (_.isString(value)) {
      return `'${value}'`;
    }

    return value;
  };

  const clojure = (obj, keys) => {
    const result = Object.entries(obj).map(([key, data]) => {
      const {
        status, value, newValue, oldValue,
      } = data;
      switch (status) {
        case 'deleted':
          return `Property '${[...keys, key].join('.')}' was removed`;
        case 'added':
          return `Property '${[...keys, key].join('.')}' was added with value: ${plainValueFormater(value)}`;
        case 'changed':
          return `Property '${[...keys, key].join('.')}' was updated. From ${plainValueFormater(oldValue)} to ${plainValueFormater(newValue)}`;
        case 'unchanged':
          if (_.isObject(value)) {
            return clojure(value, [...keys, key]);
          }
          return [];
        default:
          return [];
      }
    });
    return result.flat();
  };

  return clojure(ast, []).flat().join('\n');
};

export default plain;
