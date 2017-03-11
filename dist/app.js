((global) => {
  const store = {};

  const devideEventName = (eventName = '') => {
    const arr = eventName.split('.');
    return {
      et: arr.shift(),
      ns: arr,
    };
  };

  const notIncludesAllNames = (ns, storeNs) => (
    ns.some(nameSpace => !storeNs.includes(nameSpace))
  );

  global.pubsub = {
    sub(eventName, fn) {
      const { et, ns } = devideEventName(eventName);
      if (!et) return;
      ns.fn = fn;
      store[et] = store[et] || [];
      store[et].push(ns);
    },

    unsub(eventName) {
      const { et, ns } = devideEventName(eventName);
      Object.keys(store).forEach((key) => {
        if (et && key !== et) return;
        store[key] = store[key].filter(storeNs => notIncludesAllNames(ns, storeNs));
      });
    },

    pub(eventName, ...args) {
      const { et, ns } = devideEventName(eventName);
      if (!et || !store[et]) return;
      store[et].forEach((storeNs) => {
        if (notIncludesAllNames(ns, storeNs)) return;
        storeNs.fn.apply(global, args); // faster than spread operator
      });
    },
  };
})(this);

cc.historyData = {
  data: JSON.parse(localStorage.getItem('ticketHistory')) || [],

  // historyの先頭に追加する
  add(v) {
    // すでに同じものが入っていたら消す
    this.remove(v);

    // 先頭に追加
    this.data.unshift(v);

    pubsub.pub('change.historyData', this.data);
  },

  // historyの値を消す
  remove(v) {
    const index = this.data.indexOf(v);
    if (index !== -1) {
      this.data.splice(index, 1);
      pubsub.pub('change.historyData', this.data);
    }
  },
};

pubsub.sub('change.historyData', (data) => {
  localStorage.setItem('ticketHistory', JSON.stringify(data));
});

{
  const formEl = document.getElementById('form');

  const data = {
    tracker: '',
    ticket: '',
    keyword: '',
    emoji: '',
    summary: '',
  };

  // historyの値を復元する
  const restoreValues = (v) => {
    const [tracker, ticket, ...keywords] = v.split('-');
    const keyword = keywords.join('-');

    document.querySelector(`input[name="tracker"][value="${tracker}"]`).checked = true;
    document.querySelector('input[name="ticket"]').value = ticket;
    document.querySelector('input[name="keyword"]').value = keyword || '';

    Object.assign(data, {
      tracker,
      ticket,
      keyword,
    });
    pubsub.pub('change.formData', data);
  };

  // form changeイベント
  const formEventHandler = (e) => {
    const target = e.target;
    if (!target.hasAttribute('name')) return;

    data[target.name] = target.value;
    pubsub.pub('change.formData', data);
  };

  formEl.addEventListener('change', formEventHandler);
  formEl.addEventListener('input', formEventHandler);

  cc.form = {
    data,
    restoreValues,
  };
}

{
  const commentEl = document.getElementById('comment');
  const outputEl = document.getElementById('output');
  let outputText = '';

  // コミットコメントを作る
  const generateComment = (formData) => {
    const { tracker, ticket, emoji, summary } = formData;

    if (!tracker || !ticket || !emoji) return;

    outputText = `${tracker} #${ticket} ${emoji} ${summary}`;
    outputEl.value = outputText;
  };

  pubsub.sub('change.formData', generateComment);


  // コピーボタン
  commentEl.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const { tracker, ticket, keyword } = cc.form.data;

    if (!outputText || !tracker || !ticket) return;

    // クリップボードにコピー
    if (e.target.value === 'command') {
      cc.copyText(`git commit -m "${outputText}"`);
    } else {
      cc.copyText(outputText);
    }

    // 履歴に追加する値
    let currentValue = `${tracker}-${ticket}`;
    if (keyword) {
      currentValue = `${currentValue}-${keyword}`;
    }

    // 前回と同じなら終了
    if (currentValue === cc.historyData.data[0]) return;

    cc.historyData.add(currentValue);
  });
}

{
  const listEl = document.getElementById('history-list');

  // Branch HistoryのDOMを書き出す
  const createList = (historyData) => {
    listEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    historyData.forEach((v) => {
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

  pubsub.sub('change.historyData', createList);

  // 履歴リスト
  listEl.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName.toLowerCase() === 'button') {
      // ボタンの処理
      if (target.classList.contains('restore')) {
        cc.form.restoreValues(target.value);
      } else if (target.classList.contains('remove')) {
        cc.historyData.remove(target.value);
      }
    } else if (target.tagName.toLowerCase() === 'span') {
      cc.copyText(target.textContent);
    }
  });
}

{
  const historyData = cc.historyData.data;

  // データがあったら前回の状態を復元
  if (historyData.length) {
    cc.form.restoreValues(historyData[0]);
    pubsub.pub('change.historyData', historyData);
  }
}
