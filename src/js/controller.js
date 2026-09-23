import addTaskView from './views/addTaskView';
import taskItemView from './views/taskItemView';
import { deleteBtnView, filterBtnView } from './views/btnView';

import * as model from './model';

const addTaskController = function () {
  const value = addTaskView.getInputValue();
  if (!value) return;

  const todoObj = model.addTask(value);
  taskItemView.render(todoObj);
  updateButtonsState();
};

const checkmarkTaskController = function (id) {
  // 1) UPDATE STATE IN MODEL
  model.toggleIsFinishedState(id);
  // 12 CHECKMARK IN DOM
  taskItemView.toggleCheckmarkTask(id);
};

const filterController = function (isActive) {
  console.log(isActive);

  taskItemView.renderAll(isActive ? model.filterTasks() : model.state.todo);
};

const controlDelete = function (isActive) {
  console.log(isActive);
};

const updateButtonsState = function () {
  const isEmpty = model.state.todo.length === 0;
  filterBtnView.setDisabled(isEmpty);
  deleteBtnView.setDisabled(isEmpty);
};

const init = function () {
  updateButtonsState();
  deleteBtnView.addClickHandler(controlDelete);
  filterBtnView.addClickHandler(filterController);

  taskItemView.renderAll(model.state.todo);

  addTaskView.addTaskHandler(addTaskController);
  taskItemView.addCheckmarkTaskHandler(checkmarkTaskController);
};
init();
