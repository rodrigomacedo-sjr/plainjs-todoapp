import Filter from "../../modules/Filter.js";
import NavItem from "../NavItem/NavItem.js";
import Renderer from "../../modules/Renderer.js";
import TaskList from "../TaskList/TaskList.js";
import TaskListTags from "../TaskListTags/TaskListTags.js";
import { endOfToday, startOfToday } from "date-fns";
import Storage from "../../modules/Storage.js";
import Config from "../../modules/Config.js";
import Logger from "../../modules/Logger.js";

const Navbar = function(tasks) {
  const PREFIX = "navbar";

  const navbar = document.createElement("div");
  navbar.id = PREFIX;

  navbar.appendChild(
    NavItem(
      "Today",
      Renderer.replaceInnerPageCallback(
        TaskList(
          Filter.filterDate(tasks, "dueDate", startOfToday(), endOfToday()),
        ),
      ),
    ),
  );

  navbar.appendChild(
    NavItem(
      "Week",
      Renderer.replaceInnerPageCallback(
        TaskList(
          Filter.filterDate(tasks, "dueDate", startOfToday(), endOfToday()),
        ),
      ),
    ),
  );

  navbar.appendChild(
    NavItem("All", Renderer.replaceInnerPageCallback(TaskList(tasks))),
  );

  navbar.appendChild(
    NavItem("Tags", Renderer.replaceInnerPageCallback(TaskListTags(tasks))),
  );

  return navbar;
};

export default Navbar;
