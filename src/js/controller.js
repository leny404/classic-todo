import addTaskView from './views/addTaskView';
import taskItemView from './views/taskItemView';
import * as model from './model';

const addTaskController = function () {
  const value = addTaskView.getInputValue();
  if (!value) return;

  const todoObj = model.addTask(value);
  addTaskView.render(todoObj);
};

const checkmarkTaskController = function (id) {
  // 1) CHECKMARK IN DOM
  taskItemView.toggleCheckmarkTask(id);
  // 2) UPDATE STATE IN MODEL
  model.toggleIsFinishedState(id);
};

const init = function () {
  model.state.todo.forEach(todo => addTaskView.render(todo));
  addTaskView.addTaskHandler(addTaskController);
  taskItemView.addCheckmarkTaskHandler(checkmarkTaskController);
};
init();
