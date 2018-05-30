import { isSameObject, setStorage } from '../scripts/helper';

export default {
  namespaced: true,
  state: JSON.parse(localStorage.getItem('branchHistory')) || [],
  mutations: {
    add(state, newVal) {
      // 前回と同じなら終了
      if (isSameObject(newVal, state[0])) return;

      // すでに同じものが入っていたら消す
      state.forEach((v, i) => {
        if (isSameObject(v, newVal)) {
          state.splice(i, 1);
        }
      });

      // 先頭に追加
      state.unshift(newVal);
    },
    remove(state, index) {
      state.splice(index, 1);
    },
  },
  actions: {
    add({ commit, state }, {
      tracker, ticket, prefix, issue, keyword,
    }) {
      const newHistory = {
        tracker,
        ticket,
        prefix,
        issue,
        keyword,
      };

      commit('add', newHistory);
      setStorage('branchHistory', state);
    },
    remove({ commit, state }, index) {
      commit('remove', index);
      setStorage('branchHistory', state);
    },
  },
};
