import Filter from "../../modules/Filter.js";
import Status from "../../types/Status.js";

const TaskList = function(tasks) {
  const PREFIX = "task-list";

  const content = document.createElement("div");
  content.className = PREFIX;

  content.appendChild(
    KanbanList("TODO", Filter.filterStatus(tasks, Status.TODO)),
  );
  content.appendChild(
    KanbanList("DOING", Filter.filterStatus(tasks, Status.DOING)),
  );
  content.appendChild(
    KanbanList("DONE", Filter.filterStatus(tasks, Status.DONE)),
  );

  return content;
};

export default TaskList;
