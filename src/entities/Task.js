import Priority from "../types/Priority.js";
import Status from "../types/Status.js";
import Validation from "../modules/Validation.js";

class Task {
  id;
  title;
  description;
  dueDate;
  priority;
  status;
  tags = [];

  constructor(newTask) {
    this.id = newTask.id ? newTask.id : crypto.randomUUID();
    this.title = "New Task";
    this.priority = Priority.NORMAL;
    this.status = Status.TODO;

    this.update({
      title: newTask.title,
      description: newTask.description,
      dueDate: new Date(newTask.dueDate),
      priority: newTask.priority,
      status: newTask.status,
      tags: newTask.tags,
    });
  }

  get details() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
      tags: this.tags,
    };
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  update(updated) {
    let returnError = false;
    let err;

    [this.title, err] = Validation.matchPropAndType(
      updated,
      "title",
      "string",
      this.title,
    );
    returnError ||= err;

    [this.description, err] = Validation.matchPropAndType(
      updated,
      "description",
      "string",
      this.description,
    );
    returnError ||= err;

    [this.dueDate, err] = Validation.matchPropAndInstance(
      updated,
      "dueDate",
      Date,
      this.dueDate,
    );
    returnError ||= err;

    [this.priority, err] = Validation.matchPropAndEnum(
      updated,
      "priority",
      Priority,
      this.priority,
    );
    returnError ||= err;

    [this.status, err] = Validation.matchPropAndEnum(
      updated,
      "status",
      Status,
      this.status,
    );
    returnError ||= err;

    if (Object.hasOwn(updated, "tags") && Array.isArray(updated.tags)) {
      this.tags = updated.tags;
    }

    return returnError;
  }
}

export default Task;
