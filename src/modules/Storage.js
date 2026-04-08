const Storage = (function() {
  const saveObj = function(obj) {
    if (obj === null || obj === undefined || !Object.hasOwn(obj, "id")) {
      return {
        error: "Bad argument! This function should only save objects.",
      };
    }

    try {
      const stringToStore = JSON.stringify(obj);
      localStorage.setItem(obj.id, stringToStore);

      return {
        error: null,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  const loadObj = function(objKey) {
    const storedString = localStorage.getItem(objKey);

    if (storedString === null) {
      return {
        result: null,
        error: "Item not found.",
      };
    }

    try {
      return {
        result: JSON.parse(storedString),
        error: null,
      };
    } catch (error) {
      return {
        result: null,
        error: error,
      };
    }
  };

  return {
    saveObj,
    loadObj,
  };
})();

export default Storage;
