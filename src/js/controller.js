import addTaskView from './views/addTaskView';
import taskItemView from './views/taskItemView';
import { deleteBtnView, filterBtnView, themeBtnView } from './views/btnView';
import modalConfirmView from './views/modalConfirmView';

import * as model from './model';

let isFilterActive = false;

const updateButtonsState = function () {
  const isEmpty = model.state.todo.length === 0;
  filterBtnView.setDisabled(isEmpty);
  deleteBtnView.setDisabled(isEmpty);
};

const addTaskController = function () {
  const value = addTaskView.getInputValue();
  if (!value) return;

  model.addTask(value);

  taskItemView.renderAll(model.state.todo);
  updateButtonsState();
};

const checkmarkTaskController = function (id) {
  // 1) UPDATE STATE IN MODEL
  model.toggleIsFinishedState(id);
  // 2 CHECKMARK IN DOM
  taskItemView.toggleCheckmarkTask(id);
  // 3 RERENDER THAT BIH IF FILTER IS ACTIVE
  if (isFilterActive) taskItemView.renderAll(model.filterTasks());
};

const filterController = function (isActive) {
  isFilterActive = isActive;
  taskItemView.renderAll(isActive ? model.filterTasks() : model.state.todo);
};

const controlDeleteModeToggle = function (isActive) {
  // WHEN TRASH ICONS ARE VISIBLE, MENU ICONS ARE NOT VISIBLE
  taskItemView.toggleDeleteMode(isActive);
  taskItemView.toggleMenuBtns();
};

const themeController = function (isDark) {
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light',
  );
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const removeTask = function (id) {
  model.deleteTask(id);

  updateButtonsState();
  taskItemView.renderAll(
    isFilterActive ? model.filterTasks() : model.state.todo,
  );
  if (model.state.todo.length === 0) taskItemView.renderMessage();
};

const controlDeleteTask = function (id) {
  const task = model.findTodoById(id);

  if (task && !task.isFinished) {
    modalConfirmView.open(id);
    return;
  }

  removeTask(id);
};

const menuController = function () {
  console.log('YEAH');
};

const init = function () {
  if (model.state.todo.length === 0) taskItemView.renderMessage();
  else taskItemView.renderAll(model.state.todo);

  updateButtonsState();
  deleteBtnView.addClickHandler(controlDeleteModeToggle);
  filterBtnView.addClickHandler(filterController);
  themeBtnView.addClickHandler(themeController);

  themeBtnView.setActive(savedTheme === 'dark');

  taskItemView.addCheckmarkTaskHandler(checkmarkTaskController);
  addTaskView.addTaskHandler(addTaskController);
  taskItemView.addDeleteTaskHandler(controlDeleteTask);

  modalConfirmView.addConfirmHandler(removeTask);
  modalConfirmView.addCancelHandler();

  taskItemView.addMenuHandler(menuController);
};
init();

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transition');
  });
});
