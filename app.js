const formData = {};
const history = JSON.parse(localStorage.getItem('ticketHistory')) || [];
const outputEl = document.getElementById('output');
const listEl = document.getElementById('history-list');

// コミットコメントを作る
const generateComment = () => {
  if (!formData.tracker || !formData.ticket || !formData.emoji) return;

  outputEl.value = `${formData.tracker} #${formData.ticket} ${formData.emoji} `;
};

// trackerとticketを復元する
const restoreValues = (v) => {
  const [trackerName, ticketNo, keyword] = v.split('-');

  document.querySelector(`input[name="tracker"][value="${trackerName}"]`).checked = true;
  document.querySelector('input[name="ticket"]').value = ticketNo;
  document.querySelector('input[name="keyword"]').value = keyword || '';

  formData.tracker = trackerName;
  formData.ticket = ticketNo;
  formData.keyword = keyword;
};

// historyの値を消す
const removeHistory = (v) => {
  const index = history.indexOf(v);
  if (index !== -1) {
    history.splice(index, 1);
    localStorage.setItem('ticketHistory', JSON.stringify(history));
  }
};

// historyの先頭に追加する
const addHistory = (v) => {
  // すでに入っていたら消す
  removeHistory(v);

  // 先頭に追加
  history.unshift(v);

  localStorage.setItem('ticketHistory', JSON.stringify(history));
};

// Ticket HistoryのDOMを書き出す
const createList = () => {
  listEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  history.forEach((v) => {
    const li = document.createElement('li');

    const restore = document.createElement('button');
    restore.textContent = restore.className = 'restore';
    restore.value = v;
    li.appendChild(restore);

    const remove = document.createElement('button');
    remove.textContent = remove.className = 'remove';
    remove.value = v;
    li.appendChild(remove);

    const text = document.createElement('span');
    text.textContent = v;
    li.appendChild(text);

    fragment.appendChild(li);
  });

  listEl.appendChild(fragment);
};

// クリップボードにコピー
const copyText = (textVal) => {
  const tmpForm = document.createElement('textarea');
  tmpForm.textContent = textVal;

  const body = document.getElementsByTagName('body')[0];
  body.appendChild(tmpForm);

  tmpForm.select();
  document.execCommand('copy');

  body.removeChild(tmpForm);

  const copied = document.getElementById('copied');
  copied.classList.add('fade');
  setTimeout(() => {
    copied.classList.remove('fade');
  }, 600);
};

// データがあったら前回の状態を復元
if (history.length) {
  restoreValues(history[0]);
  createList();
}

// form changeイベント
document.addEventListener('change', (e) => {
  const target = e.target;
  if (!target.hasAttribute('name')) return;

  formData[target.name] = target.value;
  generateComment();
});

// コミットコメントをクリックした時
outputEl.addEventListener('click', (e) => {
  if (!e.target.value || !formData.tracker || !formData.ticket) return;

  copyText(e.target.value);
  const currentValue = `${formData.tracker}-${formData.ticket}-${formData.keyword}`;

  // 前回と同じなら終了
  if (currentValue === history[0]) return;

  addHistory(currentValue);
  createList();
});

// 履歴のボタン
listEl.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName.toLowerCase() !== 'button') return;

  if (target.classList.contains('restore')) {
    restoreValues(target.value);
    generateComment();
  } else if (target.classList.contains('remove')) {
    removeHistory(target.value);
    createList();
  }
});
