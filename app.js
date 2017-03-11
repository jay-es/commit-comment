// クリップボードにコピー
cc.copyText = (textVal) => {
  const body = document.getElementsByTagName('body')[0];
  const tmpForm = document.createElement('textarea');
  tmpForm.textContent = textVal;

  body.appendChild(tmpForm);

  tmpForm.select();
  document.execCommand('copy');

  body.removeChild(tmpForm);
  // console.log(textVal); // TODO
};

// データがあったら前回の状態を復元
if (cc.historyData.data.length) {
  cc.form.restoreValues(cc.historyData.data[0]);
  cc.branchHistory.createList();
}
