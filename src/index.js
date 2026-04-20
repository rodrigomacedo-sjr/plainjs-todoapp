import Renderer from "./modules/Renderer.js";
import Storage from "./modules/Storage.js";
import Config from "./modules/Config.js";
import Logger from "./modules/Logger.js";

const tasks = Storage.loadTasks();
if (!tasks) {
  Logger.error("index.js", "error loading tasks");
}

const screen = Storage.loadStr(Config.LAST_SCREEN_KEY);
if (screen.error) {
  Logger.error("index.js", screen.error);
}

Renderer.fullRender(tasks, screen.result);
