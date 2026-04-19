import Filter from "../../modules/Filter.js";
import Logger from "../../modules/Logger.js";
import KanbanList from "../KanbanList/KanbanList.js";

const TaskListTags = function(tasks) {
  const PREFIX = "task-list-tags";

  const content = document.createElement("div");
  content.className = PREFIX;

  const allTags = new Set();
  for (const task of tasks) {
    if (!("tags" in task) || !Array.isArray(task.tags)) {
      Logger.error(
        "TaskListTags",
        `bad formmatted task, should contain "tags" field`,
      );
      continue;
    }

    for (const tag of task.tags) {
      allTags.add(tag);
    }
  }

  for (const tag of allTags) {
    content.appendChild(
      KanbanList(tag.toString(), Filter.filterTags(tasks, tag)),
    );
  }

  return content;
};

export default TaskListTags;
