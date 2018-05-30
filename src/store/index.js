import Vue from 'vue';
import Vuex from 'vuex';
import branchHistory from './branchHistory';
import favPhrases from './favPhrases';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    branchHistory,
    favPhrases,
  },
  strict: debug,
});
