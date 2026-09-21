class AddTaskView {
  _parentEl = document.querySelector('.todo__list');
  _inputField = document.querySelector('.todo__input-add');
  _addBtn = document.querySelector('.todo__button-add');

  _data;

  getInputValue() {
    return this._inputField.value.trim();
  }

  _generateMarkup() {
    return `
      <li class="todo__list--item" data-id="${this._data.id}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-check preview-icon ${this._data?.isFinished ? 'checked' : ''}"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <p class="todo__description">${this._data.description}</p>
      </li>
    `;
  }

  render(data) {
    this._data = data;
    if (!data) return;

    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  addTaskHandler(handler) {
    this._addBtn.addEventListener('click', e => {
      handler();
      this._inputField.value = '';
    });
  }
}
export default new AddTaskView();
