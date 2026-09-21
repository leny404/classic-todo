export const state = {
  todo: [],
};

const createTaskObj = function (desc) {
  return {
    id: crypto.randomUUID(),
    description: desc,
    isFinished: false,
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

const findTodoById = function (id) {
  return state.todo.find(todo => todo.id === id);
};

export const addTask = function (desc) {
  const taskObj = createTaskObj(desc);
  state.todo.push(taskObj);
  persistTodo();

  return taskObj;
};
console.log(state.todo);

export const toggleIsFinishedState = function (id) {
  const todo = findTodoById(id);
  todo.isFinished = !todo.isFinished;
  persistTodo();
  console.log(state.todo);
};
