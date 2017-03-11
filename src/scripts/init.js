{
  const historyData = cc.historyData.data;

  // データがあったら前回の状態を復元
  if (historyData.length) {
    cc.form.restoreValues(historyData[0]);
    pubsub.pub('change.historyData', historyData);
  }
}
