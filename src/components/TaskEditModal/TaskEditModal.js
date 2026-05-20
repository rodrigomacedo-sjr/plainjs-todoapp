import Config from "../../modules/Config.js";
import Logger from "../../modules/Logger.js";
import List from "../../entities/List.js";
import Renderer from "../../modules/Renderer.js";
import Storage from "../../modules/Storage.js";
import Task from "../../entities/Task.js";

const TaskEditModal = (function() {
  const PREFIX = "task-edit";

  const raw = `
<dialog id="${PREFIX}-modal">
  <form id="${PREFIX}-form" method="dialog">
    <label for="title">Title:</label>
    <input type=text id="${PREFIX}-title" name="title" required minlength="4">

    <label for="description">Description:</label>
    <input type=text id="${PREFIX}-description" name="description" minlength="4">

    <label for="dueDate">Due date:</label>
    <input type=date id="${PREFIX}-date" name="dueDate">

    <label for="priority">Priority:</label>
      <select id="${PREFIX}-priority" name="priority" required>
        <option value="">Please choose an option</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

    <button type="reset" value="cancel">Cancel</button>
    <button type="submit" value="default">Submit</button>
  </form>
</dialog>
`;

  const parsed = document.createRange().createContextualFragment(raw);

  const form = parsed.querySelector("form");

  const dialog = parsed.querySelector("dialog");

  const init = () => dialog;

  let targetId = 0;

  const open = (task) => {
    targetId = task.id;
    document.querySelector(`#${PREFIX}-title`).value = task.title ?? "";
    document.querySelector(`#${PREFIX}-description`).value =
      task.description ?? "";
    const d = new Date(task.dueDate);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    document.querySelector(`#${PREFIX}-date`).value = d
      .toISOString()
      .slice(0, 10);
    document.querySelector(`#${PREFIX}-priority`).value = task.priority ?? "";
    dialog.showModal();
  };

  const close = () => {
    form.reset();
    dialog.close();
  };

  const closeBtn = parsed.querySelector('button[value="cancel"]');
  closeBtn.addEventListener("click", close);

  const handleSubmission = function(event) {
    event.preventDefault();

    const form = event.target;

    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());
    obj.id = targetId;

    const storedTasks = Storage.loadTasks();

    const tasks = new List("temp", "temp", storedTasks);

    tasks.removeTask(targetId);

    const newTask = new Task(obj);

    tasks.addTask(newTask);

    Storage.saveTasks(tasks.tasks);

    form.reset();

    dialog.close();

    const screen = Storage.loadObj(Config.LAST_SCREEN_KEY);
    if (screen.error) {
      Logger.error("index.js", screen.error);
    }

    Renderer.fullRender(tasks.tasks, screen.result);
  };

  form.addEventListener("submit", handleSubmission);

  dialog.addEventListener("cancel", close);

  return {
    init,
    open,
    close,
  };
})();

export default TaskEditModal;
