import Filter from "../../modules/Filter.js";
import NavItem from "../Navitem/Navitem.js";
import Renderer from "../../modules/Renderer.js";
import TaskList from "../TaskList/TaskList.js";
import { endOfToday, startOfToday } from "date-fns";

const Navbar = function() {
  const PREFIX = "navbar";

  const navbar = document.createElement("div");
  navbar.id = PREFIX;

  navbar.appendChild(
    NavItem(
      "Today",
      Renderer.replaceInnerPage(
        TaskList(
          Filter.filterDate(tasks, "dueDate", startOfToday(), endOfToday()),
        ),
      ),
    ),

    NavItem(
      "Week",
      Renderer.replaceInnerPage(
        TaskList(
          Filter.filterDate(tasks, "dueDate", startOfToday(), endOfToday()),
        ),
      ),
    ),

    NavItem("All", Renderer.replaceInnerPage(TaskList(tasks))),
  );
};

export default Navbar;
