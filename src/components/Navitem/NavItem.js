import Storage from "../../modules/Storage.js";
import Config from "../../modules/Config.js";
import TaskList from "../TaskList/TaskList.js";

const NavItem = function(title, filterFunc) {
  const PREFIX = "nav-item";
  const item = `
<div class="${PREFIX}">
  ${title}
<div>
`;
  item.className = "nav-item";
  item.textContent = title;

  const callBack = function() {
    const tasks = Storage.loadObj(Config.TASK_LIST_KEY);

    const filteredTasks = filterFunc(tasks);

    const newTaskView = TaskList(filteredTasks);

    Renderer.replaceInnerPage(newTaskView);
  };

  item.addEventListener("click", callBack);

  return item;
};

export default NavItem;
