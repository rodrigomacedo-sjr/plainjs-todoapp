import Validation from "../utils/Validation";

class List {
  #id;
  #title;
  #description;
  #tasks = [];

  constructor(title, description) {
    this.#id = crypto.randomUUID();
    this.#title = "New List";
    this.#description = "";

    this.update({
      title: title,
      description: description,
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
    };
  }

  get tasks() {
    return [...this.#tasks];
  }

  addTask(task) {
    if (this.#tasks.find((e) => e.id === task.id)) {
      return false;
    }

    this.#tasks.push(task);
    return true;
  }

  removeTask(id) {
    const idx = this.#tasks.findIndex((e) => e.id === id);
    if (idx === -1) return false;

    this.#tasks.splice(idx, 1);
    return true;
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

    return returnError;
  }
}

export default List;
