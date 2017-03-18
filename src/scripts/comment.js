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

    const { tracker, ticket, keyword } = cc.form.currentData;

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
