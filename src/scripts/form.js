{
  const formEl = document.getElementsByTagName('form')[0];

  // historyの値を復元する
  const restoreValues = (v) => {
    const [trackerName, ticketNo, ...keywords] = v.split('-');
    const keyword = keywords.join('-');

    document.querySelector(`input[name="tracker"][value="${trackerName}"]`).checked = true;
    document.querySelector('input[name="ticket"]').value = ticketNo;
    document.querySelector('input[name="keyword"]').value = keyword || '';

    cc.formData.tracker = trackerName;
    cc.formData.ticket = ticketNo;
    cc.formData.keyword = keyword;
  };


  // form changeイベント
  const formEventHandler = (e) => {
    const target = e.target;
    if (!target.hasAttribute('name')) return;

    cc.formData[target.name] = target.value;
    cc.comment.generateComment();
  };

  formEl.addEventListener('change', formEventHandler);
  formEl.addEventListener('input', formEventHandler);

  cc.form = {
    restoreValues,
  };
}
