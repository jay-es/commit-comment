import { isSameObject } from '../scripts/helper';

export default {
  namespaced: true,
  state: JSON.parse(localStorage.getItem('branchHistory')) || [],
  mutations: {
    remove(state, index) {
      state.splice(index, 1);
    },
    add(state, {
      tracker, ticket, prefix, issue, keyword,
    }) {
      const newHistory = {
        tracker,
        ticket,
        prefix,
        issue,
        keyword,
      };

      // 前回と同じなら終了
      if (isSameObject(newHistory, state[0])) return;

      // すでに同じものが入っていたら消す
      state.forEach((v, i) => {
        if (isSameObject(v, newHistory)) {
          state.splice(i, 1);
        }
      });

      // 先頭に追加
      state.unshift(newHistory);
    },
  },
};
