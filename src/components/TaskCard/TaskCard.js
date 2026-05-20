import Config from "../../modules/Config.js";
import List from "../../entities/List.js";
import Logger from "../../modules/Logger.js";
import Renderer from "../../modules/Renderer.js";
import Storage from "../../modules/Storage.js";
import TaskEditModal from "../TaskEditModal/TaskEditModal.js";

const TaskCard = function(task) {
  const PREFIX = "task-card";

  const raw = `
<div class="${PREFIX}">
  <div class="${PREFIX}-content">
    <h1>${task.title}</h1>
    <p>${task.description}</p>
  </div>
  <div class="${PREFIX}-status">
    <p>${task.priority}</p>
    <p>${task.getPrettyDate(true, "/")}</p>
    <p>${task.status}</p>
  </div>
  <button type="edit" value="edit" class="edit-task">edit</button>
  <button type="delete" value="delete" class="delete-task">delete</button>
<div>
`;

  const parsed = document.createRange().createContextualFragment(raw);

  const editBtn = parsed.querySelector(".edit-task");
  editBtn.addEventListener("click", () => {
    TaskEditModal.open(task);
  });

  const delBtn = parsed.querySelector(".delete-task");
  delBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const storedTasks = Storage.loadTasks();

    const tasks = new List("temp", "temp", storedTasks);

    tasks.removeTask(task.id);

    Storage.saveTasks(tasks.tasks);

    const screen = Storage.loadObj(Config.LAST_SCREEN_KEY);
    if (screen.error) {
      Logger.error("index.js", screen.error);
    }

    Renderer.fullRender(tasks.tasks, screen.result);
  });

  return parsed.querySelector(`.${PREFIX}`);
};

export default TaskCard;
