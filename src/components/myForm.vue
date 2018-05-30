<template>
  <form class="row">
    <section class="cols">
      <h2 class="section-title">Ticket Tracker</h2>
      <ul class="radio-list">
        <li v-for="item of trackers" :key="item.value">
          <label class="radio-list__label">
            <input
              :value="item.value"
              v-model="formData.tracker"
              type="radio"
              name="tracker"
              class="radio-list__radio"
            >
            <i class="radio-list__icon radio-list__icon--tracker">{{ item.value }}</i>
            <p class="radio-list__desc">{{ item.desc }}</p>
          </label>
        </li>
      </ul>

      <h2 class="section-title">Ticket Number</h2>
      <input
        v-model="formData.ticket"
        type="number"
        name="ticket"
        class="input-block"
        min="1"
      >

      <h2 class="section-title">Branch Prefix / Issue Number <small>(both optional)</small></h2>
      <input
        v-model="formData.prefix"
        type="text"
        name="prefix"
        class="input-prefix"
      >
      <input
        v-model="formData.issue"
        type="number"
        name="issue"
        class="input-issue"
        min="1"
      >

      <h2 class="section-title">Branch Keyword <small>(optional)</small></h2>
      <input
        v-model="formData.keyword"
        type="text"
        name="keyword"
        class="input-block"
      >
    </section>

    <section class="cols">
      <h2 class="section-title">Emoji</h2>
      <ul class="radio-list">
        <li v-for="item of emojis" :key="item.value">
          <label class="radio-list__label">
            <input
              :value="item.value"
              v-model="formData.emoji"
              type="radio"
              name="emoji"
              class="radio-list__radio"
            >
            <template v-if="item.bgImage">
              <i
                :style="{ backgroundImage: `url(${item.bgImage})`}"
                class="radio-list__icon radio-list__icon--emoji"
              >
                &nbsp;
              </i>
            </template>
            <template v-else>
              <i class="radio-list__icon radio-list__icon--emoji" v-html="`&#x${item.icon};`"/>
            </template>
            <p class="radio-list__desc">{{ item.desc }}</p>
          </label>
        </li>
      </ul>

      <h2 class="section-title">Commit Summary</h2>
      <input
        v-model="formData.summary"
        type="text"
        name="summary"
        class="input-block commit-summery"
      >
      <button
        :disabled="!formData.summary"
        type="button"
        class="btn"
        @click="addFav"
      >
        fav
      </button>
    </section>
  </form>
</template>

<script>
import trackers from '../scripts/trackers';
import emojis from '../scripts/emojis';
import { doesSupportEmoji } from '../scripts/helper';

export default {
  props: {
    favPhrases: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      trackers,
      emojis,
    };
  },
  created() {
    // Emoji非対応環境だったら、GitHubから画像を取得
    if (doesSupportEmoji()) return;

    this.emojis.forEach((v, i) => {
      const img = new Image();
      const fileName = v.icon.toLowerCase();
      img.src = `https://assets-cdn.github.com/images/icons/emoji/unicode/${fileName}.png`;

      img.onload = () => {
        this.$set(emojis[i], 'bgImage', img.src);
      };
    });
  },
  methods: {
    addFav() {
      const { summary } = this.formData;
      const index = this.favPhrases.indexOf(summary);
      if (index !== -1) {
        this.favPhrases.splice(index, 1);
      }

      this.favPhrases.unshift(summary);
    },
  },
};
</script>

<style lang="scss">
$gladd-red: #d8263c;

// radio
.radio-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 12px;

  & > li {
    margin-bottom: .5em;
  }
}

.radio-list__label {
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

.radio-list__radio {
  display: none;
}

.radio-list__icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: .25em;
  border: 1px solid #666;
  width: 24px;
  line-height: 24px;
  text-align: center;
  font-style: normal;
  color: #666;

  &--tracker {
    font-size: 13px;
  }
  &--emoji {
    font-size: 16px;
    background: no-repeat center center;
    background-size: 1em;
  }

  .radio-list__radio:checked + & {
    border-color: $gladd-red;
    background-color: lighten($gladd-red, 46);
    color: $gladd-red;
  }
}

.radio-list__desc {
  display: inline-block;
  margin: 0;
  line-height: 1.3;
  vertical-align: middle;
  white-space: pre;

  .radio-list__radio:checked ~ & {
    color: $gladd-red;
  }
}

.input-prefix,
.input-issue {
  display: inline-block;
  padding: .25em;
  width: 8em;
}

.commit-summery {
  width: 30em;
}
</style>
