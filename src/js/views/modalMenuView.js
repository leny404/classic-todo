class modalMenuView {
  _overlay = document.querySelector('.modal-menu__overlay');
  _modal = document.querySelector('.modal-menu');
  _highlightBtn = document.querySelector('.modal-menu__highlight-btn');
  _pendingId = null;

  open(id) {
    this._overlay.classList.add('modal-menu__overlay--shown');
    this._pendingId = id;
  }

  close() {
    this._overlay.classList.remove('modal-menu__overlay--shown');
    this._pendingId = null;
  }

  teleportToPos(elPos) {
    const { x, y, width, height } = elPos;
    const { height: mH, width: mW } = this._modal.getBoundingClientRect();
    this._modal.style.top = `${y + window.pageYOffset - height}px`;
    this._modal.style.left = `${x + window.pageXOffset - mW + width}px`;
  }

  addCancelHandler() {
    this._overlay.addEventListener('click', e => {
      if (!e.target.closest('.modal-menu')) this.close();
    });
  }

  addMarkAsImportant(handler) {
    this._highlightBtn.addEventListener('click', () => {
      handler(this._pendingId);
    });
  }
}
export default new modalMenuView();
