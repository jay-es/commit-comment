<template>
  <div>
    <my-form />
    <comment />
    <div class="row">
      <history-list class="cols" />
      <fav-list class="cols" />
    </div>
    <read-me />
  </div>
</template>

<script>
import myForm from './components/myForm.vue';
import comment from './components/comment.vue';
import historyList from './components/historyList.vue';
import favList from './components/favList.vue';
import readMe from './components/readMe.vue';

export default {
  components: {
    myForm,
    comment,
    historyList,
    favList,
    readMe,
  },
  created() {
    // 前回を復元
    const { branchHistory } = this.$store.state;
    if (branchHistory.length) {
      this.$store.dispatch('formData/setAll', branchHistory[0]);
    }
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
