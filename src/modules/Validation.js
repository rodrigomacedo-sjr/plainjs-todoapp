const Validation = (function() {
  const matchPropAndType = function(object, prop, type, fallback) {
    if (!Object.hasOwn(object, prop)) {
      return [fallback, false];
    }

    if (typeof object[prop] === type) {
      return [object[prop], false];
    } else {
      return [fallback, true];
    }
  };

  const matchPropAndInstance = function(object, prop, type, fallback) {
    if (!Object.hasOwn(object, prop)) {
      return [fallback, false];
    }

    if (object[prop] == "" || object[prop] == null) {
      return [fallback, false];
    }

    if (object[prop] instanceof type) {
      return [object[prop], false];
    } else {
      return [fallback, true];
    }
  };

  const isValidEnum = function(test, enumObj) {
    const allowedValues = Object.values(enumObj);
    return allowedValues.includes(test);
  };

  const matchPropAndEnum = function(object, prop, enumObj, fallback) {
    if (!Object.hasOwn(object, prop)) {
      return [fallback, false];
    }

    if (isValidEnum(object[prop], enumObj)) {
      return [object[prop], false];
    } else {
      return [fallback, true];
    }
  };

  return {
    matchPropAndType,
    matchPropAndInstance,
    matchPropAndEnum,
  };
})();

export default Validation;
