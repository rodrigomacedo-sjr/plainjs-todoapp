import Task from "../entities/Task.js";
import Config from "./Config.js";
import Logger from "./Logger.js";

const Storage = (function() {
  const saveObj = function(obj, id = "") {
    id = id ? id : obj.id;

    if (obj === null || obj === undefined) {
      return {
        error: "Bad argument! This function should only save objects.",
      };
    }

    if (!Object.hasOwn(obj, "id") && !id) {
      return {
        error: "If the object doesn't have an id, the id argument is required.",
      };
    }

    try {
      const stringToStore = JSON.stringify(obj);
      localStorage.setItem(id, stringToStore);

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

  const loadStr = function(strKey) {
    return localStorage.getItem(strKey);
  };

  const saveTasks = function(tasks) {
    return saveObj(tasks, Config.TASK_LIST_KEY);
  };

  const loadTasks = function() {
    const tasksObj = loadObj(Config.TASK_LIST_KEY);
    const tasksInstance = [];

    if (tasksObj.error || !tasksObj.result) {
      Logger.error("loadTasks", "error loading tasks");
      return [];
    }

    for (const task of tasksObj.result) {
      tasksInstance.push(new Task(task));
    }
    return tasksInstance;
  };

  return {
    saveObj,
    loadObj,
    loadStr,
    saveTasks,
    loadTasks,
  };
})();

export default Storage;
