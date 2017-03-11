this.cc = {
  // クリップボードにコピー
  copyText(textVal) {
    const body = document.getElementsByTagName('body')[0];
    const tmpForm = document.createElement('textarea');
    tmpForm.textContent = textVal;

    body.appendChild(tmpForm);

    tmpForm.select();
    document.execCommand('copy');

    body.removeChild(tmpForm);
  },
};
