export default class BtnView {
  _toggleActive() {
    this._btn.classList.toggle(`${this._className}--active`);
  }

  _addClickBtnHandler() {
    this._btn.addEventListener('click', this._toggleActive.bind(this));
  }
}
