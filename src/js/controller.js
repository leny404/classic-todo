import addTaskView from './views/addTaskView';
import taskItemView from './views/taskItemView';
import * as model from './model';

const addTaskController = function () {
  const value = addTaskView.getInputValue();
  if (!value) return;

  const todoObj = model.addTask(value);
  taskItemView.render(todoObj);
};

const checkmarkTaskController = function (id) {
  // 1) CHECKMARK IN DOM
  taskItemView.toggleCheckmarkTask(id);
  // 2) UPDATE STATE IN MODEL
  model.toggleIsFinishedState(id);
};

const filterController = function () {
  taskItemView.renderAll(model.filterTasks());
};

const init = function () {
  taskItemView.renderAll(model.state.todo);
  addTaskView.addTaskHandler(addTaskController);
  taskItemView.addCheckmarkTaskHandler(checkmarkTaskController);
  taskItemView.addFilterHandler(filterController);
};
init();
