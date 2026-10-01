import View from './View';
class TaskItemView extends View {
  _parentEl = document.querySelector('.todo__list');
  _filterBtn = document.querySelector('.lucide-funnel');
  _message = 'Add your first task!';
  _deleteMode = false;
  _currentId = null;
  _grabbingTask = null;
  _startingPos = null;
  _attachedEl = null;

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
        <p class="todo__description todo__description--shown">${this._data.description}</p>
        <form class="form-edit">
        <input type="text"  name="description-edit" id="description-edit" class="description-edit description-edit--shown" />
        </form>
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
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-grip-horizontal preview-icon task__grab-icon"
      >
        <circle cx="12" cy="9" r="1" />
        <circle cx="19" cy="9" r="1" />
        <circle cx="5" cy="9" r="1" />
        <circle cx="12" cy="15" r="1" />
        <circle cx="19" cy="15" r="1" />
        <circle cx="5" cy="15" r="1" />
      </svg>
        <div class="btn-placeholder"></div>
      </li>
    `;
  }

  _generateAttachmentPlaceholderMarkup() {
    return `
      <li class="todo__list--item todo__list--item--placeholder">
          <p class="todo__description todo__description--placeholder">asdasdasd</p>
      </li>
    `;
  }

  _toggleAllBtns(btnClassName) {
    const btns = [...document.querySelectorAll(`.${btnClassName}`)];
    btns.forEach(b => b.classList.toggle(`${btnClassName}--active`));
  }

  _getId(btn) {
    return btn.closest('[data-id]').dataset.id;
  }

  _getTaskElById(id) {
    return document.querySelector(`[data-id="${id}"]`);
  }

  _calculateElementPosition(el) {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
    };
  }

  _createAttachmentEl(side, id) {
    const attachmentEl = document.createElement('div');
    attachmentEl.classList.add(`task-item__attachment`);
    attachmentEl.setAttribute('data-attachment', side);
    attachmentEl.setAttribute('data-task-id', id);
    return attachmentEl;
  }

  showEditAction() {
    const taskEl = this._getTaskElById(this._currentId);
    if (!taskEl) return;

    const descEl = taskEl.querySelector('.todo__description');
    const inputEl = taskEl.querySelector('.description-edit');
    const formEl = taskEl.querySelector('.form-edit');

    descEl.classList.remove('todo__description--shown');
    formEl.classList.add('form-edit--shown');
    inputEl.value = descEl.textContent;
    inputEl.focus();
  }
  hideEditAction() {
    const taskEl = this._getTaskElById(this._currentId);
    if (!taskEl) return;

    const descEl = taskEl.querySelector('.todo__description');
    const formEl = taskEl.querySelector('.form-edit');
    descEl.classList.add('todo__description--shown');
    formEl.classList.remove('form-edit--shown');
  }

  getInputValue() {
    const taskEl = this._getTaskElById(this._currentId);
    return taskEl?.querySelector('.description-edit').value;
  }

  toggleCheckmarkTask(id) {
    const taskEl = this._getTaskElById(id);
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

  moveTask(x, y) {
    this._grabbingTask.style.transform = `translate(${x}px, ${y}px)`;
  }

  // taskEl default is '' because if isGrabbing is false, then it doesn't need a taskEl
  setGrab(isGrabbing, taskEl = '') {
    if (isGrabbing) {
      this._grabbingTask = taskEl;
      this._grabbingTask.classList.add('grabbed');
    }
    if (!isGrabbing) {
      this._grabbingTask.classList.remove('grabbed');
      this._grabbingTask = null;
    }
  }

  resetGrabbing() {
    this.moveTask(0, 0);
    this.setGrab(false);
    this._startingPos = null;
  }

  createAttachments() {
    const allTaskElements = [
      ...this._parentEl.querySelectorAll('.todo__list--item'),
    ];

    allTaskElements.forEach((taskEl, index, arr) => {
      const taskElId = taskEl.dataset.id;
      const grabbedElId = this._grabbingTask.dataset.id;
      const lastIndex = arr.length - 1;

      const createdEl = positionAfter =>
        this._createAttachmentEl(positionAfter ? 'after' : 'before', taskElId);

      if (taskEl.classList.contains('todo__description--placeholder')) return;

      if (taskElId === grabbedElId) return;
      if (index === 0 && taskElId === grabbedElId) return;
      if (index === lastIndex && taskElId === grabbedElId) return;

      taskEl.before(createdEl(false));
      taskEl.after(createdEl(true));
    });
  }

  removeAttachments() {
    const allAttachmentsEl = this._parentEl.querySelectorAll(
      '.task-item__attachment',
    );
    allAttachmentsEl.forEach(attEl => attEl.remove());
  }

  _clearPlaceholders() {
    const allPlaceHolders = document.querySelectorAll(
      '.todo__list--item--placeholder',
    );
    allPlaceHolders.forEach(el => el.remove());
  }

  placeAttachmentPlaceholder(el, position) {
    const placeholderMarkup = this._generateAttachmentPlaceholderMarkup();
    const where = position === 'before' ? 'beforebegin' : 'afterend';

    this._clearPlaceholders();
    el.insertAdjacentHTML(where, placeholderMarkup);
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

  addOpenMenuHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.todo__menu-btn');
      if (!btn) return;

      this._currentId = this._getId(btn);
      const btnRect = this._calculateElementPosition(btn);
      handler(btnRect, this._currentId);
    });
  }

  addSubmitEditHandler(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();

      handler(this._currentId);
    });
  }

  addCancelEditHandler(handler) {
    this._parentEl.addEventListener('focusout', e => {
      const inputEl = e.target.closest('.description-edit');
      if (!inputEl) return;
      handler(this._currentId);
    });
  }

  addGrabTaskHandler(handler) {
    this._parentEl.addEventListener('mousedown', e => {
      const grabIcon = e.target.closest('.task__grab-icon');
      if (!grabIcon) return;

      const grabbedEl = grabIcon.closest('.todo__list--item');
      const { x, y } = this._calculateElementPosition(grabIcon);
      this._startingPos = { x, y };

      handler(grabbedEl);
    });
  }

  addReleaseTaskHandler(handler) {
    window.addEventListener('mouseup', () => {
      if (!this._grabbingTask) return;
      if (!this._attachedEl) return;

      handler(
        this._attachedEl.dataset.taskId,
        this._grabbingTask.dataset.id,
        this._attachedEl.dataset.attachment,
      );

      this.resetGrabbing();
      this._clearPlaceholders();
      this._attachedEl = null;
    });
  }

  addMovingTaskHandler(handler) {
    window.addEventListener('mousemove', e => {
      if (!this._grabbingTask) return;
      const moveX = -(this._startingPos.x - e.x);
      const moveY = -(this._startingPos.y - e.y);
      handler(moveX, moveY);
    });
  }

  addAttachmentHandler(handler) {
    this._parentEl.addEventListener('mouseover', e => {
      const attachmentEl = e.target.closest('.task-item__attachment');
      if (!attachmentEl) return;

      const taskEl = this._getTaskElById(attachmentEl.dataset.taskId);
      this._attachedEl = attachmentEl;
      console.log(
        this._attachedEl.dataset.taskId,
        this._attachedEl.dataset.attachment,
      );
      handler(taskEl, attachmentEl);
    });
  }
}
export default new TaskItemView();
