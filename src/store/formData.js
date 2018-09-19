export default {
  namespaced: true,
  state: {
    tracker: '',
    ticket: '',
    prefix: '',
    issue: '',
    keyword: '',
    emoji: '',
    summary: '',
  },
  mutations: {
    set(state, [key, val]) {
      state[key] = val;
    },
  },
  actions: {
    setAll({ commit, state }, newData) {
      const hasNewData = {}.hasOwnProperty.bind(newData);

      // 全キーでコミット
      Object.keys(state).forEach(key => {
        if (!hasNewData(key)) return;

        commit('set', [key, newData[key]]);
      });
    },
  },
};
