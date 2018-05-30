<template>
  <section class="comment">
    <h2 class="section-title">Commit Comment</h2>
    <input
      :value="commentText"
      type="text"
      class="input-block comment-output"
      tabindex="-1"
      readonly
    >
    <button class="btn" @click="copy()">コメントのみコピー</button>
    <button class="btn" @click="copy(true)">Gitコマンド付きコピー</button>
  </section>
</template>

<script>
import { copyText } from '../scripts/helper';

export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    commentText() {
      const {
        tracker, ticket, issue, emoji, summary,
      } = this.formData;

      if (!tracker || !ticket || !emoji) return '';

      let outputText = `${tracker} #${ticket} ${emoji}`;
      if (issue) outputText += ` ${issue}`;
      outputText += ` ${summary}`;

      return outputText;
    },
  },
  methods: {
    copy(includesCommand) {
      if (!this.commentText) return;

      // クリップボードにコピー
      if (includesCommand) {
        copyText(`git commit -m "${this.commentText}"`);
      } else {
        copyText(this.commentText);
      }

      this.$emit('addHistory', this.formData);
    },
  },
};
</script>

<style lang="scss">
.comment {
  margin-top: 2.5em;
}

.comment-output {
  margin-bottom: .5em;
  padding: .75em;
  border: none;
  background-color: #000;
  width: 50em;
  font-size: 14px;
  font-family: monospace;
  color: #fff;
}
</style>
