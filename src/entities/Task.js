import Priority from "../types/Priority.js";
import Status from "../types/Status.js";
import Validation from "../utils/Validation.js";

class Task {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #status;
  #tags = new Set();

  constructor(title, description, dueDate, priority, status) {
    this.#id = crypto.randomUUID();
    this.#title = "New Task";
    this.#priority = Priority.NORMAL;
    this.#status = Status.TODO;

    this.update({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      status: status,
    });
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get details() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      status: this.#status,
    };
  }

  get tags() {
    return [...this.#tags];
  }

  addTag(tag) {
    this.#tags.add(tag);
  }

  removeTag(tag) {
    this.#tags.delete(tag);
  }

  update(updated) {
    let returnError = false;
    let err;

    [this.#title, err] = Validation.matchPropAndType(
      updated,
      "title",
      "string",
      this.#title,
    );
    returnError ||= err;

    [this.#description, err] = Validation.matchPropAndType(
      updated,
      "description",
      "string",
      this.#description,
    );
    returnError ||= err;

    [this.#dueDate, err] = Validation.matchPropAndInstance(
      updated,
      "dueDate",
      Date,
      this.#dueDate,
    );
    returnError ||= err;

    [this.#priority, err] = Validation.matchPropAndEnum(
      updated,
      "priority",
      Priority,
      this.#priority,
    );
    returnError ||= err;

    [this.#status, err] = Validation.matchPropAndEnum(
      updated,
      "status",
      Status,
      this.#status,
    );
    returnError ||= err;

    return returnError;
  }
}

export default Task;
