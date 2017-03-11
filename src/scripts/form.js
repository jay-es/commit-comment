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
