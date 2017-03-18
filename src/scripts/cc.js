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

  // 2つのオブジェクトの内容が同じか
  isSameObject(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    // キーの数が違ったらfalse
    if (aKeys.length !== bKeys.length) return false;

    // 全キーの値が同じかどうか
    return aKeys.every((v) => a[v] === b[v]);
  },
};


// 旧データを新形式に変換する
if (!localStorage.getItem('branchHistory')) {
  const oldData = JSON.parse(localStorage.getItem('ticketHistory')) || [];
  const newData = [];

  oldData.forEach((v) => {
    const [tracker, ticket, ...keywords] = v.split('-');
    const keyword = keywords.join('-');

    newData.push({
      tracker,
      ticket,
      keyword,
      version: '',
      issue: '',
    });
  });

  localStorage.setItem('branchHistory', JSON.stringify(newData));
  localStorage.removeItem('ticketHistory');
}
