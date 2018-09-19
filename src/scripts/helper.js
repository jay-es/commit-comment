// クリップボードにコピー
const copyText = textVal => {
  const body = document.getElementsByTagName('body')[0];
  const tmpForm = document.createElement('textarea');
  tmpForm.textContent = textVal;

  body.appendChild(tmpForm);

  tmpForm.select();
  document.execCommand('copy');

  body.removeChild(tmpForm);
};

// iOS6のEmojiが使える環境かどうか
// https://gist.github.com/mwunsch/4710561
const doesSupportEmoji = () => {
  const canvas = document.createElement('canvas');
  if (!canvas.getContext) return false;
  const context = canvas.getContext('2d');
  if (typeof context.fillText !== 'function') return false;
  const target = String.fromCodePoint(0x1f604);

  context.textBaseline = 'top';
  context.font = '32px Arial';
  context.fillText(target, 0, 0);
  return context.getImageData(16, 16, 1, 1).data[0] !== 0;
};

// 2つのオブジェクトの内容が同じか
const isSameObject = (a, b) => {
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // キーの数が違ったらfalse
  if (aKeys.length !== bKeys.length) return false;

  // 全キーの値が同じかどうか
  return aKeys.every(v => a[v] === b[v]);
};

// localStorageに保存
const setStorage = (keyName, keyValue) => {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
};

export { copyText, doesSupportEmoji, isSameObject, setStorage };
