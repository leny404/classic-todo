import addTaskView from './views/addTaskView';
import taskItemView from './views/taskItemView';
import { deleteBtnView, filterBtnView } from './views/btnView';

import * as model from './model';

let isFilterActive = false;

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
  isFilterActive = isActive;
  taskItemView.renderAll(isActive ? model.filterTasks() : model.state.todo);
};

const controlDeleteModeToggle = function (isActive) {
  taskItemView.toggleDeleteMode(isActive);
};

const controlDeleteTask = function (id) {
  model.deleteTask(id);
  updateButtonsState();
  taskItemView.renderAll(
    isFilterActive ? model.filterTasks() : model.state.todo,
  );
};

const updateButtonsState = function () {
  const isEmpty = model.state.todo.length === 0;
  filterBtnView.setDisabled(isEmpty);
  deleteBtnView.setDisabled(isEmpty);
};

const init = function () {
  taskItemView.renderAll(model.state.todo);

  updateButtonsState();
  deleteBtnView.addClickHandler(controlDeleteModeToggle);
  filterBtnView.addClickHandler(filterController);

  taskItemView.addDeleteTaskHandler(controlDeleteTask);

  addTaskView.addTaskHandler(addTaskController);
  taskItemView.addCheckmarkTaskHandler(checkmarkTaskController);
};
init();
