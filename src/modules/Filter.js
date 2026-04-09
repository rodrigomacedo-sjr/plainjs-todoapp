import { isWithinInterval } from "date-fns";

const Filter = (function() {
  const filterDate = function(data, dateProp, start, end) {
    if (!Array.isArray(data)) {
      return {
        error: "[error | filterDate]: data should be an array.",
      };
    }

    return data.filter((element) => {
      if ((!dateProp) in element) return false;

      return isWithinInterval(element[dateProp], {
        start: start,
        end: end,
      });
    });
  };

  return {
    filterDate,
  };
})();

export default Filter;
