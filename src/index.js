import Renderer from "./modules/Renderer.js";
import Storage from "./modules/Storage.js";
import Config from "./modules/Config.js";
import Logger from "./modules/Logger.js";

const tasks = Storage.loadObj(Config.TASK_LIST_KEY);
if (tasks.error) {
  Logger.error("index.js", tasks.error);
}

const screen = Storage.loadObj(Config.LAST_SCREEN_KEY);
if (screen.error) {
  Logger.error("index.js", screen.error);
}

Renderer.fullRender(tasks.result, screen.result);
