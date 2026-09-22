import View from './View';

class TaskItemView extends View {
  _parentEl = document.querySelector('.todo__list');
  _filterBtn = document.querySelector('.lucide-funnel');

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

  _findTaskElById(id) {
    return document.querySelector(`[data-id="${id}"]`) || null;
  }
  toggleCheckmarkTask(id) {
    const taskEl = this._findTaskElById(id);
    const checkmarkEl = taskEl.querySelector('.lucide-check');
    checkmarkEl.classList.toggle('checked');
  }

  addCheckmarkTaskHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const checkmark = e.target.closest('.lucide-check');
      if (!checkmark) return;

      const todoItem = checkmark.closest('.todo__list--item');
      handler(todoItem.dataset.id);
    });
  }

  addFilterHandler(handler) {
    this._filterBtn.addEventListener('click', handler);
  }
}
export default new TaskItemView();
