import Renderer from "./modules/Renderer.js";
import Navbar from "./components/Navbar/Navbar.js";
import TaskList from "./components/TaskList/TaskList.js";
import Storage from "./modules/Storage.js";
import Config from "./modules/Config.js";
import Logger from "./modules/Logger.js";

const stored = Storage.loadObj(Config.TASK_LIST_KEY);
if (stored.error) {
  Logger.error("index.js", stored.error);
}
const tasks = stored.result;

Renderer.replaceContent(Navbar(tasks));
Renderer.replaceInnerPage(TaskList(tasks));
