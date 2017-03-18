{
  const listEl = document.getElementById('history-list');

  // Branch HistoryのDOMを書き出す
  const createList = (historyData) => {
    listEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    historyData.forEach(({ tracker, ticket, version, issue, keyword }, i) => {
      const li = document.createElement('li');

      const restore = document.createElement('button');
      restore.className = 'btn restore-btn';
      restore.textContent = 'restore';
      restore.value = i;
      li.appendChild(restore);

      const remove = document.createElement('button');
      remove.className = 'btn remove-btn';
      remove.textContent = 'remove';
      remove.value = i;
      li.appendChild(remove);

      const link = document.createElement('a');
      link.className = 'text-link history-list__redmine-link';
      link.textContent = 'Redmine';
      link.href = `https://kbn.glamour-sales.com/issues/${ticket}`;
      link.target = '_blank';
      li.appendChild(link);

      const text = document.createElement('span');
      text.className = 'history-list__branch-name';
      text.textContent = `${tracker}-${ticket}`;
      if (version) text.textContent += `-${version}`;
      if (issue) text.textContent += `-${issue}`;
      if (keyword) text.textContent += `-${keyword}`;
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
      const branchData = cc.historyData.data[target.value];

      // ボタンの処理
      if (target.classList.contains('restore-btn')) {
        cc.form.restoreValues(branchData);
      } else if (target.classList.contains('remove-btn')) {
        cc.historyData.remove(branchData);
      }
    } else if (target.tagName.toLowerCase() === 'span') {
      cc.copyText(target.textContent);
    }
  });
}
