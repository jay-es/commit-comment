<template>
  <section class="history">
    <h2 class="section-title">Branch History</h2>
    <ul class="history-list">
      <li v-for="(item, index) of branchHistory" :key="index + item">
        <button class="btn" @click="restore(index)">restore</button>
        <button class="btn" @click="remove(index)">remove</button>
        <a
          :href="`https://kbn.gladd.jp/issues/${item.ticket}`"
          class="text-link history-list__redmine-link"
          target="_blank"
        >
          Redmine</a>
        <span class="history-list__branch-name" @click="copy">{{ branchName(item) }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { copyText } from '../scripts/helper';

export default {
  computed: mapState(['branchHistory']),
  methods: {
    restore(index) {
      this.$store.dispatch('formData/setAll', this.branchHistory[index]);
    },
    remove(index) {
      this.$store.dispatch('branchHistory/remove', index);
    },
    copy($event) {
      copyText($event.target.textContent);
    },
    branchName({ tracker, ticket, prefix, issue, keyword }) {
      let text = `${tracker}-${ticket}`;
      if (prefix) text += `-${prefix}`;
      if (issue) text += `-${issue}`;
      if (keyword) text += `-${keyword}`;
      return text;
    },
  },
};
</script>

<style lang="scss">
$gladd-red: #d8263c;

.history {
  margin-top: 3em;
  font-size: 13px;
}

.history-list {
  margin: 0;
  padding-left: 2em;

  & > li {
    margin-bottom: 0.5em;
  }
}

.history-list__branch-name {
  cursor: pointer;

  &:hover {
    color: $gladd-red;
  }
  &:active {
    color: inherit;
  }
}
</style>

<style scoped>
.history-list__branch-name {
  margin-left: 2px;
  font-family: monospace;
}
</style>
