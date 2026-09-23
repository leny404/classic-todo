import View from './View';

class TaskItemView extends View {
  _parentEl = document.querySelector('.todo__list');
  _filterBtn = document.querySelector('.lucide-funnel');
  _deleteMode = false;

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
      </li>
    `;
  }

  _findTaskElById(id) {
    return document.querySelector(`[data-id="${id}"]`) || null;
  }
  toggleCheckmarkTask(id) {
    const taskEl = this._findTaskElById(id);
    const checkmarkEl = taskEl.querySelector('.lucide-check');
    checkmarkEl.classList.toggle('checked');
  }

  _toggleTrashIcons() {
    const btns = [...document.querySelectorAll('.todo__list--item')].map(item =>
      item.querySelector('.todo__delete-btn'),
    );
    btns.forEach(btn => btn.classList.toggle('todo__delete-btn--active'));
  }

  toggleDeleteMode(isActive) {
    this._deleteMode = isActive;
    this._toggleTrashIcons();
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

      const id = btn.closest('[data-id]').dataset.id;

      handler(id);
    });
  }
}
export default new TaskItemView();
