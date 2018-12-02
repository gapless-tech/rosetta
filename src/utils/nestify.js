import isObject from './is-plain-object';

const nestify = (obj, context = {}) => Object.keys(obj)
  .reduce((baseObj, key) => {
    const [thisKey, ...otherKeys] = key.split('.');
    const keysToBeNested = otherKeys.join('.');
    const originalValue = obj[key];
    const shouldReturnSame = !keysToBeNested && !isObject(originalValue);

    const objToNest = keysToBeNested
      ? { [keysToBeNested]: originalValue }
      : originalValue;

    const nestifiedObj = shouldReturnSame
      ? { [key]: originalValue }
      : { [thisKey]: nestify(objToNest, baseObj[thisKey]) };

    return {
      ...baseObj,
      ...nestifiedObj,
    };
  }, context);

export default nestify;
