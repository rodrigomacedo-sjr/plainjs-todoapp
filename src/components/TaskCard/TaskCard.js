const TaskCard = function(task) {
  const PREFIX = "task-card";

  const cardTemplate = `
<div class="${PREFIX}">
  <div class="${PREFIX}-content">
    <h1>${task.title}</h1>
    <p>${task.description}</p>
  </div>
  <div class="${PREFIX}-status">
    <p>${task.priority}</p>
    <p>${task.dueDate}</p>
    <p>${task.status}</p>
  </div>
<div>
`;

  const template = document.createElement("template");
  template.innerHTML = cardTemplate;
  return template.content.firstElementChild;
};

export default TaskCard;
