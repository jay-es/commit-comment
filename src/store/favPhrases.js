import { setStorage } from '../scripts/helper';

export default {
  namespaced: true,
  state: JSON.parse(localStorage.getItem('favPhrases')) || [],
  mutations: {
    add(state, phrase) {
      const index = state.indexOf(phrase);

      // すでに同じものが入っていたら消す
      if (index !== -1) {
        state.splice(index, 1);
      }

      // 先頭に追加
      state.unshift(phrase);
    },
    remove(state, index) {
      state.splice(index, 1);
    },
  },
  actions: {
    add({ commit, state }, phrase) {
      commit('add', phrase);
      setStorage('favPhrases', state);
    },
    remove({ commit, state }, index) {
      commit('remove', index);
      setStorage('favPhrases', state);
    },
  },
};
