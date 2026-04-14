import TaskCard from "../TaskCard/TaskCard.js";
import Logger from "../../modules/Logger.js";

const KanbanList = function(name, tasks) {
  if (!Array.isArray(tasks)) {
    Logger.error("KanbanList.js", "tasks should be an array");

    return document.createElement("div");
  }

  const PREFIX = "kanban-list";
  const content = document.createElement("div");
  content.className = PREFIX;

  const title = document.createElement("h2");
  title.innerText = name;
  content.appendChild(title);

  const innerContent = document.createElement("div");
  innerContent.className = `${PREFIX}-inner`;
  content.appendChild(innerContent);

  for (const task of tasks) {
    innerContent.appendChild(TaskCard(task));
  }

  return content;
};

export default KanbanList;
