class modalMenuView {
  _overlay = document.querySelector('.modal-menu__overlay');
  _modal = document.querySelector('.modal-menu');
  _highlightBtn = document.querySelector('.modal-menu__highlight-btn');
  _highlightBtnText = document.querySelector('.modal-menu__highlight-btn__text'); // prettier-ignore
  _editBtn = document.querySelector('.modal-menu__edit-btn');
  _pendingId = null;
  _highlightBtnActive = false;

  open(id) {
    this._overlay.classList.add('modal-menu__overlay--shown');
    this._pendingId = id;
  }

  close() {
    this._overlay.classList.remove('modal-menu__overlay--shown');
    this._pendingId = null;
    this.setHighlightBtnActive(false);
  }

  teleportToPos(elPos) {
    const { x, y, width, height } = elPos;
    const { width: mW } = this._modal.getBoundingClientRect();
    this._modal.style.top = `${y + window.pageYOffset - height}px`;
    this._modal.style.left = `${x + window.pageXOffset - mW + width}px`;
  }

  _toggleHighlightBtnClass(isActive) {
    if (isActive) {
      this._highlightBtn.classList.add('modal-menu__highlight-btn--active');
      this._highlightBtnText.textContent = 'Unmark Important';
    } else {
      this._highlightBtn.classList.remove('modal-menu__highlight-btn--active');
      this._highlightBtnText.textContent = 'Mark Important';
    }
  }

  setHighlightBtnActive(isActive) {
    this._highlightBtnActive = isActive;
    this._toggleHighlightBtnClass(isActive);
  }

  addCancelHandler() {
    this._overlay.addEventListener('click', e => {
      if (!e.target.closest('.modal-menu')) this.close();
    });
  }

  addMarkAsImportantHandler(handler) {
    this._highlightBtn.addEventListener('click', () => {
      handler(this._pendingId, this._highlightBtnActive);
      this.close();
    });
  }

  addEditHandler(handler) {
    this._editBtn.addEventListener('click', () => {
      handler();
      this.close();
    });
  }
}
export default new modalMenuView();
