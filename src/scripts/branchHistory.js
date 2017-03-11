{
  const listEl = document.getElementById('history-list');

  // Branch HistoryのDOMを書き出す
  const createList = () => {
    listEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    cc.historyData.data.forEach((v) => {
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

  // 履歴リスト
  listEl.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName.toLowerCase() === 'button') {
      // ボタンの処理
      if (target.classList.contains('restore')) {
        cc.form.restoreValues(target.value);
      } else if (target.classList.contains('remove')) {
        cc.historyData.remove(target.value);
        createList();
      }
    } else if (target.tagName.toLowerCase() === 'span') {
      cc.copyText(target.textContent);
    }
  });

  cc.branchHistory = {
    createList,
  };
}
