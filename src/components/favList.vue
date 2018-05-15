<template>
  <section class="history">
    <h2 class="section-title">Favorite Phrases</h2>
    <ul class="history-list">
      <li v-for="(item, index) of favPhrases">
        <button class="btn" @click="restore(index)">restore</button>
        <button class="btn" @click="remove(index)">remove</button>
        <span class="history-list__branch-name" @click="copy">{{ item }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { copyText } from '../scripts/helper';

export default {
  props: ['favPhrases', 'formData'],
  methods: {
    restore(index) {
      this.formData.summary = this.favPhrases[index];
      document.getElementsByClassName('commit-summery')[0].focus();
    },
    remove(index) {
      this.favPhrases.splice(index, 1);
    },
    copy($event) {
      copyText($event.target.textContent);
    },
  },
};
</script>
