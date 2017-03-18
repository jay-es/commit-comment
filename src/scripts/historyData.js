cc.historyData = {
  data: JSON.parse(localStorage.getItem('ticketHistory')) || [],

  // historyの先頭に追加する
  add(branchData) {
    // すでに同じものが入っていたら消す
    this.remove(branchData);

    // 先頭に追加
    this.data.unshift(branchData);

    pubsub.pub('change.historyData', this.data);
  },

  // historyの値を消す
  remove(branchData) {
    const index = this.data.indexOf(branchData);
    if (index !== -1) {
      this.data.splice(index, 1);
      pubsub.pub('change.historyData', this.data);
    }
  },
};

pubsub.sub('change.historyData', (data) => {
  localStorage.setItem('ticketHistory', JSON.stringify(data));
});
