cc.historyData = {
  data: JSON.parse(localStorage.getItem('branchHistory')) || [],

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
    this.data.some((v, i) => {
      // 内容が同じではなかったら次へ
      if (!cc.isSameObject(v, branchData)) return false;

      this.data.splice(i, 1);
      pubsub.pub('change.historyData', this.data);
      return true;
    });
  },
};

pubsub.sub('change.historyData', (data) => {
  localStorage.setItem('branchHistory', JSON.stringify(data));
});
