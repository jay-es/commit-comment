<template>
  <section class="history">
    <h2 class="section-title">Branch History</h2>
    <ul class="history-list">
      <li v-for="(item, index) of historyData">
        <button class="btn" @click="restore(index)">restore</button>
        <button class="btn" @click="remove(index)">remove</button>
        <a class="text-link history-list__redmine-link" :href="`https://kbn.glamour-sales.com/issues/${item.ticket}`" target="_blank">Redmine</a>
        <span class="history-list__branch-name" @click="copy">{{ branchName(item) }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { copyText } from '../scripts/helper';

export default {
  props: ['formData', 'historyData'],
  methods: {
    restore(index) {
      Object.assign(this.formData, this.historyData[index]);
    },
    remove(index) {
      this.historyData.splice(index, 1);
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
  margin-bottom: .5em;
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
