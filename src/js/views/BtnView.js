import { funnel, trash, theme } from '../icons/icons';

class BtnView {
  constructor(className, activeIcon) {
    this._handler = null;
    this._className = className;
    this._btn = document.querySelector(`.${className}`);
    this._disabled = false;
    this._active = false;
    this._primaryIcon = this._btn.innerHTML;
    this._activeIcon = activeIcon;
    if (!activeIcon) this._activeIcon = this._primaryIcon;
  }

  _setIcon(icon) {
    this._btn.innerHTML = icon;
  }

  _switchIcon() {
    this._setIcon(this._active ? this._activeIcon : this._primaryIcon);
  }

  _setActiveState(isActive) {
    this._active = isActive;
    this._btn.classList.toggle(`${this._className}--active`, isActive);
    this._switchIcon();
  }

  toggleActive() {
    if (this._disabled) return;
    this._setActiveState(!this._active);
  }

  setActive(isActive) {
    if (this._disabled) return;
    this._setActiveState(isActive);
  }

  setDisabled(isDisabled) {
    this._disabled = isDisabled;
    this._btn.classList.toggle(`${this._className}--disabled`, isDisabled);

    if (isDisabled && this._active) {
      this._setActiveState(false);
      this._handler?.(false);
    }
  }

  addClickHandler(handler) {
    this._handler = handler;

    this._btn.addEventListener('click', () => {
      if (this._disabled) return;
      this.toggleActive();
      handler(this._active);
    });
  }
}
export const deleteBtnView = new BtnView('delete-btn', trash[1]);
export const filterBtnView = new BtnView('filter-btn', funnel[1]);
export const themeBtnView = new BtnView('theme-btn', theme[1]);
