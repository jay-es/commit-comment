{
  const formData = cc.formData;

  const commentEl = document.getElementById('comment');
  const outputEl = document.getElementById('output');
  let outputText = '';

  // コミットコメントを作る
  const generateComment = () => {
    if (!formData.tracker || !formData.ticket || !formData.emoji) return;

    outputText = `${formData.tracker} #${formData.ticket} ${formData.emoji} ${formData.summary}`;
    outputEl.value = outputText;
  };


  // コピーボタン
  commentEl.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const textVal = outputText;

    if (!textVal || !formData.tracker || !formData.ticket) return;

    // クリップボードにコピー
    if (e.target.value === 'command') {
      cc.copyText(`git commit -m "${textVal}"`);
    } else {
      cc.copyText(textVal);
    }

    // 履歴に追加する値
    let currentValue = `${formData.tracker}-${formData.ticket}`;
    if (formData.keyword) {
      currentValue = `${currentValue}-${formData.keyword}`;
    }

    // 前回と同じなら終了
    if (currentValue === cc.historyData.data[0]) return;

    cc.historyData.add(currentValue);
    cc.branchHistory.createList();
  });

  cc.comment = {
    generateComment,
  };
}
