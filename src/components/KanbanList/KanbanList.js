import TaskCard from "../TaskCard/TaskCard";

const KanbanList = function(name, tasks) {
  const PREFIX = "kanban-list";

  const content = document.createElement();
  content.className = PREFIX;

  const title = document.createElement("h2");
  title.innerText = name;
  content.appendChild(title);

  const innerContent = document.createElement("div");
  content.className = `${PREFIX}-inner`;
  content.appendChild(innerContent);

  for (const task of tasks) {
    innerContent.appendChild(TaskCard(task));
  }
};

export default KanbanList;
