export default {
  namespaced: true,
  state: JSON.parse(localStorage.getItem('favPhrases')) || [],
  mutations: {
    remove(state, index) {
      state.splice(index, 1);
    },
    add(state, phrase) {
      const index = state.indexOf(phrase);

      // すでに同じものが入っていたら消す
      if (index !== -1) {
        state.splice(index, 1);
      }

      // 先頭に追加
      state.unshift(phrase);
    },
  },
};
