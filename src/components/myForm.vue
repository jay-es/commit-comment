<template>
  <form class="row">
    <section class="cols">
      <h2 class="section-title">Ticket Tracker</h2>
      <ul class="radio-list">
        <li v-for="item of trackers">
          <label class="radio-list__label">
            <input type="radio" class="radio-list__radio" name="tracker" :value="item.value" v-model="formData.tracker" />
            <i class="radio-list__icon radio-list__icon--tracker">{{ item.value }}</i>
            <p class="radio-list__desc">{{ item.desc }}</p>
          </label>
        </li>
      </ul>

      <h2 class="section-title">Ticket Number</h2>
      <input type="number" class="input-block" name="ticket" min="1" v-model="formData.ticket" />

      <h2 class="section-title">Branch Prefix / Issue Number <small>(both optional)</small></h2>
      <input type="text" class="input-prefix" name="prefix" v-model="formData.prefix" />
      <input type="number" class="input-issue" name="issue" min="1" v-model="formData.issue" />

      <h2 class="section-title">Branch Keyword <small>(optional)</small></h2>
      <input type="text" class="input-block" name="keyword" v-model="formData.keyword" />
    </section>

    <section class="cols">
      <h2 class="section-title">Emoji</h2>
      <ul class="radio-list">
        <li v-for="item of emojis">
          <label class="radio-list__label">
            <input type="radio" class="radio-list__radio" name="emoji" :value="item.value" v-model="formData.emoji" />
            <template v-if="item.bgImage">
              <i class="radio-list__icon radio-list__icon--emoji" :style="{ backgroundImage: `url(${item.bgImage})`}">&nbsp;</i>
            </template>
            <template v-else>
              <i class="radio-list__icon radio-list__icon--emoji" v-html="`&#x${item.icon};`"></i>
            </template>
            <p class="radio-list__desc">{{ item.desc }}</p>
          </label>
        </li>
      </ul>

      <h2 class="section-title">Commit Summary</h2>
      <input type="text" class="input-block commit-summery" name="summary" v-model="formData.summary" />
    </section>
  </form>
</template>

<script>
import trackers from '../scripts/trackers';
import emojis from '../scripts/emojis';
import { doesSupportEmoji } from '../scripts/helper';

export default {
  props: ['formData'],
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

  &__label {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }

  &__radio {
    display: none;
  }

  &__icon {
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
  }

  &__radio:checked + &__icon {
    border-color: $gladd-red;
    background-color: lighten($gladd-red, 46);
    color: $gladd-red;
  }

  &__desc {
    display: inline-block;
    margin: 0;
    line-height: 1.3;
    vertical-align: middle;
    white-space: pre;
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
