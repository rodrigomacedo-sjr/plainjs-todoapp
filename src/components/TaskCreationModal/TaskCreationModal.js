import Config from "../../modules/Config.js";
import Logger from "../../modules/Logger.js";
import Renderer from "../../modules/Renderer.js";
import Storage from "../../modules/Storage.js";
import Task from "../../entities/Task.js";

const TaskCreationModal = (function() {
  const PREFIX = "task-creation";

  const raw = `
<dialog id="${PREFIX}-modal">
  <form id="${PREFIX}-form" method="dialog">
    <label for="title">Title:</label>
    <input type=text id="task-title" name="title" required minlength="4">

    <label for="description">Description:</label>
    <input type=text id="task-description" name="description" minlength="4">

    <label for="dueDate">Due date:</label>
    <input type=date id="task-date" name="dueDate">

    <label for="priority">Priority:</label>
      <select id="task-priority" name="priority" required>
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

  const open = () => dialog.showModal();

  const close = () => {
    dialog.close();
  };

  const closeBtn = parsed.querySelector('button[value="cancel"]');
  closeBtn.addEventListener("click", close);

  const handleSubmission = function(event) {
    event.preventDefault();

    const form = event.target;

    const data = new FormData(form);
    const obj = Object.fromEntries(data.entries());

    dialog.close();

    const newTask = new Task(obj);

    const tasks = Storage.loadTasks();
    if (!tasks) {
      Logger.error("handleSubmission", "error loading tasks");
    }
    tasks.push(newTask);

    Storage.saveTasks(tasks);

    const screen = Storage.loadObj(Config.LAST_SCREEN_KEY);
    if (screen.error) {
      Logger.error("index.js", screen.error);
    }

    form.reset();

    Renderer.fullRender(tasks, screen.result);
  };

  form.addEventListener("submit", handleSubmission);

  dialog.addEventListener("cancel", close);

  return {
    init,
    open,
    close,
  };
})();

export default TaskCreationModal;
