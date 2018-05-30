<template>
  <div>
    <my-form v-bind="$data" />
    <comment v-bind="$data" />
    <div class="row">
      <history-list v-bind="$data" class="cols" />
      <fav-list v-bind="$data" class="cols" />
    </div>
    <read-me/>
  </div>
</template>

<script>
import myForm from './components/myForm.vue';
import comment from './components/comment.vue';
import historyList from './components/historyList.vue';
import favList from './components/favList.vue';
import readMe from './components/readMe.vue';
import { isSameObject } from './scripts/helper';

export default {
  components: {
    myForm,
    comment,
    historyList,
    favList,
    readMe,
  },
  data() {
    return {
      formData: {
        tracker: '',
        ticket: '',
        prefix: '',
        issue: '',
        keyword: '',
        emoji: '',
        summary: '',
      },
      favPhrases: JSON.parse(localStorage.getItem('favPhrases')) || [],
      historyData: JSON.parse(localStorage.getItem('branchHistory')) || [],
    };
  },
  watch: {
    favPhrases() {
      localStorage.setItem('favPhrases', JSON.stringify(this.favPhrases));
    },
    historyData() {
      localStorage.setItem('branchHistory', JSON.stringify(this.historyData));
    },
  },
  created() {
    // 前回を復元
    if (this.historyData.length) {
      Object.assign(this.formData, this.historyData[0]);
    }
  },
  methods: {
    addHistory({
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
      if (this.historyData[0] && isSameObject(newHistory, this.historyData[0])) return;

      // すでに同じものが入っていたら消す
      this.historyData.forEach((v, i) => {
        if (isSameObject(v, newHistory)) {
          this.historyData.splice(i, 1);
        }
      });

      // 先頭に追加
      this.historyData.unshift(newHistory);
    },
  },
};
</script>

<style lang="scss">
$gladd-red: #d8263c;

body {
  color: #333;
  overflow-x: hidden;
}

.row {
  margin-right: -2em;
}
.cols {
  display: inline-block;
  margin-right: 2em;
  vertical-align: top;
}

// 見出し
.section-title {
  margin: 0 0 2px;
  font-size: 12px;

  & ~ & {
  margin-top: 1.25em;
  }
}

.btn {
  cursor: pointer;
}

.input-block {
  display: block;
  padding: .25em;
}

.text-link {
  color: initial;

  &:hover {
  color: $gladd-red;
  }
}

.read-me {
  margin-top: 3em;
  font-size: 14px;

  .section-title {
    margin-bottom: 0;
  }
}
</style>
