export const state = {
  todo: [],
};

const createTaskObj = function (desc) {
  return {
    id: crypto.randomUUID(),
    description: desc,
    isFinished: false,
    isImportant: false,
  };
};

const persistTodo = function () {
  localStorage.setItem('todo', JSON.stringify(state.todo));
};

const loadStorage = function () {
  const todo = localStorage.getItem('todo');
  if (todo) state.todo = JSON.parse(todo);
};
loadStorage();

const resetStorage = function () {
  localStorage.clear();
};
// resetStorage();

export const findTodoById = function (id) {
  return state.todo.find(todo => todo.id === id);
};

export const addTask = function (desc) {
  const taskObj = createTaskObj(desc);
  state.todo.push(taskObj);
  persistTodo();

  return taskObj;
};

export const toggleIsFinishedState = function (id) {
  const todo = findTodoById(id);
  todo.isFinished = !todo.isFinished;
  persistTodo();
};

export const filterTasks = function () {
  const filtered = state.todo
    .reduce(
      (acc, curr) => {
        acc[curr.isFinished ? 0 : 1].push(curr);
        return acc;
      },
      [[], []],
    )
    .flat();
  return filtered;
};

export const deleteTask = function (id) {
  const taskId = state.todo.findIndex(task => task.id === id);
  if (taskId === -1) return;

  state.todo.splice(taskId, 1);
  persistTodo();
};
// DELETING AND ADDING TO LIST IS BAD
console.log(state);
