import TaskListTags from "../components/TaskListTags/TaskListTags.js";
import TaskList from "../components/TaskList/TaskList.js";
import Navbar from "../components/Navbar/Navbar.js";
import TaskCreationModal from "../components/TaskCreationModal/TaskCreationModal.js";

const Renderer = (function() {
  let content = document.getElementById("content");
  if (content === null) {
    content = document.createElement("div");
    content.id = "content";
    document.body.appendChild(content);
  }

  let innerPage = document.getElementById("inner-page");
  if (innerPage === null) {
    innerPage = document.createElement("div");
    innerPage.id = "inner-page";
    content.appendChild(innerPage);
  }

  const replaceContent = function(div) {
    content.innerHTML = "";
    content.appendChild(div);
    content.appendChild(innerPage);
    content.appendChild(TaskCreationModal.init())
  };

  const replaceInnerPage = function(div) {
    innerPage.innerHTML = "";
    innerPage.appendChild(div);
  };

  const replaceInnerPageCallback = function(div) {
    return function() {
      Renderer.replaceInnerPage(div);
    };
  };

  const fullRender = function(data, state) {
    Renderer.replaceContent(Navbar(data));
    switch (state) {
      case "today":
        Renderer.replaceInnerPage(TaskList(data));
        break;
      case "week":
        Renderer.replaceInnerPage(TaskList(data));
        break;
      case "tags":
        Renderer.replaceInnerPage(TaskListTags(data));
        break;
      case "all":
      default:
        Renderer.replaceInnerPage(TaskList(data));
        break;
    }
  };

  return {
    replaceContent,
    replaceInnerPage,
    replaceInnerPageCallback,
    fullRender,
  };
})();

export default Renderer;
