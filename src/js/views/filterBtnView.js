import BtnView from './BtnView';

class FilterBtnView extends BtnView {
  _className = 'filter-btn';
  _btn = document.querySelector(`.${this._className}`);

  constructor() {
    super();
    this._addClickBtnHandler();
  }
}
export default new FilterBtnView();
