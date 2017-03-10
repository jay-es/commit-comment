const formData = {
  tracker: '',
  ticket: '',
  keyword: '',
  emoji: '',
  summary: '',
};
const history = JSON.parse(localStorage.getItem('ticketHistory')) || [];
const formEl = document.getElementsByTagName('form')[0];
const outputEl = document.getElementById('output');
const commentEl = document.getElementsByClassName('comment')[0];
const listEl = document.getElementById('history-list');

// コミットコメントを作る
const generateComment = () => {
  if (!formData.tracker || !formData.ticket || !formData.emoji) return;

  outputEl.value = `${formData.tracker} #${formData.ticket} ${formData.emoji} ${formData.summary}`;
};

// historyの値を復元する
const restoreValues = (v) => {
  const [trackerName, ticketNo, ...keywords] = v.split('-');
  const keyword = keywords.join('-');

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
  // すでに同じものが入っていたら消す
  removeHistory(v);

  // 先頭に追加
  history.unshift(v);

  localStorage.setItem('ticketHistory', JSON.stringify(history));
};

// Branch HistoryのDOMを書き出す
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

    const link = document.createElement('a');
    const [, ticketNo] = v.split('-');
    link.textContent = 'Redmine';
    link.href = `https://kbn.glamour-sales.com/issues/${ticketNo}`;
    link.target = '_blank';
    li.appendChild(link);

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

  commentEl.appendChild(tmpForm);

  tmpForm.select();
  document.execCommand('copy');

  commentEl.removeChild(tmpForm);
};

// データがあったら前回の状態を復元
if (history.length) {
  restoreValues(history[0]);
  createList();
}

// form changeイベント
const formEventHandler = (e) => {
  const target = e.target;
  if (!target.hasAttribute('name')) return;

  formData[target.name] = target.value;
  generateComment();
};

formEl.addEventListener('change', formEventHandler);
formEl.addEventListener('input', formEventHandler);

// コピーボタン
commentEl.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() !== 'button') return;

  const textVal = outputEl.value;

  if (!textVal || !formData.tracker || !formData.ticket) return;

  // クリップボードにコピー
  if (e.target.value === 'command') {
    copyText(`git commit -m "${textVal}"`);
  } else {
    copyText(textVal);
  }

  // 履歴に追加する値
  let currentValue = `${formData.tracker}-${formData.ticket}`;
  if (formData.keyword) {
    currentValue = `${currentValue}-${formData.keyword}`;
  }

  // 前回と同じなら終了
  if (currentValue === history[0]) return;

  addHistory(currentValue);
  createList();
});

// 履歴リスト
listEl.addEventListener('click', (e) => {
  const target = e.target;

  if (target.tagName.toLowerCase() === 'button') {
    // ボタンの処理
    if (target.classList.contains('restore')) {
      restoreValues(target.value);
      generateComment();
    } else if (target.classList.contains('remove')) {
      removeHistory(target.value);
      createList();
    }
  } else if (target.tagName.toLowerCase() === 'span') {
    copyText(target.textContent);
  }
});
