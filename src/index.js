import "./css/style.css";
import Renderer from "./modules/Renderer.js";
import Storage from "./modules/Storage.js";
import Config from "./modules/Config.js";
import Logger from "./modules/Logger.js";
import Task from "./entities/Task.js";

const tasks = Storage.loadTasks();
tasks.length || (tasks.push(new Task({ title: "First task", description: "Edit me", dueDate: new Date(), priority: "normal" })), Storage.saveTasks(tasks));
if (!tasks) {
  Logger.error("index.js", "error loading tasks");
}

const screen = Storage.loadStr(Config.LAST_SCREEN_KEY) || "all";

Renderer.fullRender(tasks, screen);
