import { funnel, trash } from '../icons/icons';

class BtnView {
  constructor(className, secondaryIcon) {
    this._className = className;
    this._btn = document.querySelector(`.${className}`);
    this._disabled = false;
    this._active = false;
    this._primaryIcon = this._btn.innerHTML;
    this._secondaryIcon = secondaryIcon;
  }

  _setIcon(icon) {
    this._btn.innerHTML = icon;
  }

  _switchIcon() {
    if (!this._active) this._setIcon(this._primaryIcon);
    else this._setIcon(this._secondaryIcon);
  }

  _toggleActive() {
    if (this._disabled) return;
    this._btn.classList.toggle(`${this._className}--active`);
    this._active = !this._active;
  }

  setDisabled(isDisabled) {
    this._disabled = isDisabled;
    this._btn.classList.toggle(`${this._className}--disabled`, isDisabled);
  }

  addClickHandler(handler) {
    this._btn.addEventListener('click', () => {
      if (this._disabled) return;
      this._toggleActive();
      this._switchIcon();
      handler(this._active);
    });
  }
}
export const deleteBtnView = new BtnView('delete-btn', trash[1]);
export const filterBtnView = new BtnView('filter-btn', funnel[1]);
