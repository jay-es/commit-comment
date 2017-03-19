{
  const commentEl = document.getElementById('comment');
  const outputEl = document.getElementById('output');
  let outputText = '';

  // コミットコメントを作る
  const generateComment = ({ tracker, ticket, issue, emoji, summary }) => {
    if (!tracker || !ticket || !emoji) return;

    outputText = `${tracker} #${ticket} ${emoji}`;
    if (issue) outputText += ` #${issue}`;
    outputText += ` ${summary}`;

    outputEl.value = outputText;
  };

  pubsub.sub('change.formData', generateComment);


  // コピーボタン
  commentEl.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const { tracker, ticket, prefix, issue, keyword } = cc.form.currentData;

    if (!outputText || !tracker || !ticket) return;

    // クリップボードにコピー
    if (e.target.value === 'command') {
      cc.copyText(`git commit -m "${outputText}"`);
    } else {
      cc.copyText(outputText);
    }

    // 履歴に追加する値
    const currentBranch = {
      tracker,
      ticket,
      prefix,
      issue,
      keyword,
    };

    // 前回と同じなら終了
    if (cc.isSameObject(currentBranch, cc.historyData.data[0])) return;

    cc.historyData.add(currentBranch);
  });
}
