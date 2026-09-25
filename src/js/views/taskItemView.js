import View from './View';
class TaskItemView extends View {
  _parentEl = document.querySelector('.todo__list');
  _filterBtn = document.querySelector('.lucide-funnel');
  _message = 'Add your first task!';
  _deleteMode = false;

  _generateMarkup() {
    return `
      <li class="todo__list--item ${this._data.isImportant ? 'todo__list--important' : ''}" data-id="${this._data.id}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-ellipsis-vertical preview-icon todo__menu-btn ${this._deleteMode ? '' : 'todo__menu-btn--active'}"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-trash preview-icon todo__delete-btn ${this._deleteMode ? 'todo__delete-btn--active' : ''}"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <div class="btn-placeholder"></div>
      </li>
    `;
  }

  _toggleAllBtns(btn) {
    const btns = [...document.querySelectorAll(`.${btn}`)];
    btns.forEach(b => b.classList.toggle(`${btn}--active`));
  }

  _getId(btn) {
    return btn.closest('[data-id]').dataset.id;
  }

  toggleCheckmarkTask(id) {
    const taskEl = document.querySelector(`[data-id="${id}"]`);
    const checkmarkEl = taskEl.querySelector('.lucide-check');
    checkmarkEl.classList.toggle('checked');
  }

  toggleDeleteMode(isActive) {
    this._deleteMode = isActive;
    this._toggleAllBtns('todo__delete-btn');
  }

  toggleMenuBtns() {
    this._toggleAllBtns('todo__menu-btn');
  }

  addCheckmarkTaskHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const checkmark = e.target.closest('.lucide-check');
      if (!checkmark) return;

      const todoItem = checkmark.closest('.todo__list--item');
      handler(todoItem.dataset.id);
    });
  }

  addDeleteTaskHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.todo__delete-btn');
      if (!btn) return;

      handler(this._getId(btn));
    });
  }

  addMenuHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.todo__menu-btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const elPos = {
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
      };

      handler(elPos, this._getId(btn));
    });
  }
}
export default new TaskItemView();
