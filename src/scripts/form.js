{
  const formEl = document.getElementById('form');

  const currentData = {
    tracker: '',
    ticket: '',
    prefix: '',
    issue: '',
    keyword: '',
    emoji: '',
    summary: '',
  };

  // historyの値を復元する
  const restoreValues = ({ tracker, ticket, prefix, issue, keyword }) => {
    document.querySelector(`input[name="tracker"][value="${tracker}"]`).checked = true;
    document.querySelector('input[name="ticket"]').value = ticket;
    document.querySelector('input[name="prefix"]').value = prefix || '';
    document.querySelector('input[name="issue"]').value = issue || '';
    document.querySelector('input[name="keyword"]').value = keyword || '';

    Object.assign(currentData, {
      tracker,
      ticket,
      prefix,
      issue,
      keyword,
    });
    pubsub.pub('change.formData', currentData);
  };

  // form changeイベント
  const formEventHandler = (e) => {
    const target = e.target;
    if (!target.hasAttribute('name')) return;

    currentData[target.name] = target.value;
    pubsub.pub('change.formData', currentData);
  };

  formEl.addEventListener('change', formEventHandler);
  formEl.addEventListener('input', formEventHandler);

  cc.form = {
    currentData,
    restoreValues,
  };
}
