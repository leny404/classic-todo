export default class View {
  _data;

  render(data, render = true, clear = false) {
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    if (clear) this._clear();

    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<p class="${this._parentEl.className}--message">${message}</p>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
    console.log('test');
  }

  renderAll(dataArr) {
    this._clear();
    dataArr.forEach(data => this.render(data));
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
