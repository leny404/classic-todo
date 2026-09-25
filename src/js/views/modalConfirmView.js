class modalConfirmView {
  _overlay = document.querySelector('.modal-confirm__overlay');
  _btnConfirm = document.querySelector('.modal-confirm__accept-btn');
  _btnCancel = document.querySelector('.modal-confirm__reject-btn');
  _pendingId = null;

  open(id) {
    this._pendingId = id;
    this._overlay.classList.add('modal-confirm__overlay--shown');
  }

  close() {
    this._pendingId = null;
    this._overlay.classList.remove('modal-confirm__overlay--shown');
  }

  addConfirmHandler(handler) {
    this._btnConfirm.addEventListener('click', () => {
      handler(this._pendingId);
      this.close();
    });
  }
  addCancelHandler() {
    this._btnCancel.addEventListener('click', this.close.bind(this));
    this._overlay.addEventListener('click', e => {
      if (e.target.closest('.modal-confirm')) return;
      this.close();
    });
  }
}
export default new modalConfirmView();
