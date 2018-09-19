import Vue from 'vue';
import { doesSupportEmoji } from './helper';

const emojis = [
  {
    value: ':bug:',
    icon: '1F41B',
    desc: 'バグ修正',
  },
  {
    value: ':+1:',
    icon: '1F44D',
    desc: '機能追加・修正（クラス、メソッド、関数などの追加・修正）',
  },
  {
    value: ':art:',
    icon: '1F3A8',
    desc: 'デザイン修正（レイアウト変更、余白の調整など）',
  },
  {
    value: ':pencil:',
    icon: '1F4DD',
    desc: '文言の修正',
  },
  {
    value: ':gem:',
    icon: '1F48E',
    desc: 'リファクタリング',
  },
  {
    value: ':x:',
    icon: '274C',
    desc: '不要な機能・ソースの削除',
  },
  {
    value: ':dress:',
    icon: '1F457',
    desc: 'コードスタイルの修正（空白削除、インデント変更など）',
  },
  {
    value: ':dash:',
    icon: '1F4A8',
    desc: 'パフォーマンス改善',
  },
  {
    value: ':up:',
    icon: '1F199',
    desc: '依存パッケージなどのアップデート',
  },
  {
    value: ':cop:',
    icon: '1F46E',
    desc: 'セキュリティ関連の改善',
  },
];

// Emoji非対応環境だったらGitHubから画像を取得
if (!doesSupportEmoji()) {
  emojis.forEach(v => {
    const img = new Image();
    const fileName = v.icon.toLowerCase();
    img.src = `https://assets-cdn.github.com/images/icons/emoji/unicode/${fileName}.png`;

    img.onload = () => {
      Vue.set(v, 'bgImage', img.src);
    };
  });
}

export default emojis;
