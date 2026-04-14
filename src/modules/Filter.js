import { isWithinInterval } from "date-fns";
import Logger from "./Logger.js";

const Filter = (function() {
  const filterDate = function(data, dateProp, start, end) {
    if (!Array.isArray(data)) {
      Logger.error("filterDate", "data should be an array");
      return [];
    }

    return data.filter((element) => {
      if (!(dateProp in element)) {
        Logger.error(
          "filterStatus",
          `data does not contain specified property: "${dateProp}"`,
        );
        return false;
      }

      const date = Date.parse(element[dateProp]);

      return isWithinInterval(date, {
        start: start,
        end: end,
      });
    });
  };

  const filterStatus = function(data, status) {
    if (!Array.isArray(data)) {
      Logger.error("filterStatus", "data should be an array");
      return [];
    }

    return data.filter((element) => {
      if (!("status" in element)) {
        Logger.error(
          "filterStatus",
          `data does not contain specified property: "status"`,
        );
        return false;
      }

      return element.status == status;
    });
  };

  const filterTags = function(data, target) {
    if (!Array.isArray(data)) {
      Logger.error("filterTags", "data should be an array");
      return [];
    }

    return data.filter((element) => {
      if (!("tags" in element)) {
        Logger.error(
          "filterTags",
          `data does not contain specified property: "tags"`,
        );
        return false;
      }

      if (!Array.isArray(element.tags)) {
        Logger.error(
          "filterTags",
          `elements in data are bad, "tags" property should be an array`,
        );
        return false;
      }

      return element.tags.includes(target.toString());
    });
  };

  return {
    filterDate,
    filterStatus,
    filterTags,
  };
})();

export default Filter;
