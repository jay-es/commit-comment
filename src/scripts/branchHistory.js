{
  const listEl = document.getElementById('history-list');

  // Branch HistoryのDOMを書き出す
  const createList = (historyData) => {
    listEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    historyData.forEach((v) => {
      const li = document.createElement('li');

      const restore = document.createElement('button');
      restore.className = 'btn restore-btn';
      restore.textContent = 'restore';
      restore.value = v;
      li.appendChild(restore);

      const remove = document.createElement('button');
      remove.className = 'btn remove-btn';
      remove.textContent = 'remove';
      remove.value = v;
      li.appendChild(remove);

      const link = document.createElement('a');
      const [, ticketNo] = v.split('-');
      link.className = 'history-list__redmine-link';
      link.textContent = 'Redmine';
      link.href = `https://kbn.glamour-sales.com/issues/${ticketNo}`;
      link.target = '_blank';
      li.appendChild(link);

      const text = document.createElement('span');
      text.className = 'history-list__branch-name';
      text.textContent = v;
      li.appendChild(text);

      fragment.appendChild(li);
    });

    listEl.appendChild(fragment);
  };

  pubsub.sub('change.historyData', createList);

  // 履歴リスト
  listEl.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName.toLowerCase() === 'button') {
      // ボタンの処理
      if (target.classList.contains('restore-btn')) {
        cc.form.restoreValues(target.value);
      } else if (target.classList.contains('remove-btn')) {
        cc.historyData.remove(target.value);
      }
    } else if (target.tagName.toLowerCase() === 'span') {
      cc.copyText(target.textContent);
    }
  });
}
