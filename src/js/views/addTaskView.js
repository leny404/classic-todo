import View from './View';

class AddTaskView extends View {
  _parentEl = document.querySelector('.todo__list');
  _inputField = document.querySelector('.todo__input-add');
  _addBtn = document.querySelector('.todo__button-add');

  getInputValue() {
    return this._inputField.value.trim();
  }

  _setInputFocus() {
    this._inputField.focus();
  }

  addTaskHandler(handler) {
    this._addBtn.addEventListener('click', () => {
      handler();
      this._inputField.value = '';
      this._setInputFocus();
    });
  }
}
export default new AddTaskView();
