const filterNames = (data, names) => {
  const dataKeys = Object.keys(data);
  const keys = names
    ? names
      .split(',')
      .reduce((arr, name) => {
        if (name.substr(-2) === '.*') {
          const key = name.slice(0, -2);
          const filteredKeys = dataKeys.filter(item => item.indexOf(key) === 0);
          arr.push(...filteredKeys);
        } else {
          arr.push(name);
        }

        return arr;
      }, [])
    : dataKeys;

  return keys
    .reduce((obj, name) => ({
      ...obj,
      [name]: data[name],
    }), {});
};

module.exports = (names, culture, data) => {
  const keys = culture ? culture.split(',') : Object.keys(data);

  return keys
    .reduce((obj, cultureCode) => ({
      ...obj,
      [cultureCode]: filterNames(data[cultureCode], names),
    }), {});
};
