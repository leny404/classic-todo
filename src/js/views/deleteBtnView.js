import BtnView from './BtnView';

class DeleteBtnView extends BtnView {
  _className = 'delete-btn';
  _btn = document.querySelector(`.${this._className}`);

  constructor() {
    super();
    this._addClickBtnHandler();
  }
}
export default new DeleteBtnView();
