class TaskItemView {
  _parentEl = document.querySelector('.todo__list');
  _data;

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
}
export default new TaskItemView();
