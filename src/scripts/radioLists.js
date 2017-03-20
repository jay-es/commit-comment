{
  const trackers = [
    {
      value: 'FT',
      desc: '機能追加、仕様変更に伴う機能修正',
    },
    {
      value: 'BG',
      desc: 'テスト中、リリース後に発生した不具合',
    },
    {
      value: 'SU',
      desc: 'プログラム変更をともなわない作業依頼',
    },
    {
      value: 'DS',
      desc: '画像の差し替え、文言変更、ページ作成など<br>フロントUIに関わる作業',
    },
    {
      value: 'RF',
      desc: '機能追加、仕様変更をともなわない<br>プログラム構造の変更、整理、速度改善',
    },
    {
      value: 'IN',
      desc: 'サーバーの新設、メモリ増設などの<br>インフラ作業全般',
    },
  ];

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

  // iOS6のEmojiが使える環境かどうか
  // https://gist.github.com/mwunsch/4710561
  const doesSupportEmoji = (() => {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) return false;
    const context = canvas.getContext('2d');
    if (typeof context.fillText !== 'function') return false;
    const target = String.fromCodePoint(0x1F604);

    context.textBaseline = 'top';
    context.font = '32px Arial';
    context.fillText(target, 0, 0);
    return context.getImageData(16, 16, 1, 1).data[0] !== 0;
  })();

  const generateList = (name, listData) => {
    const listEl = document.getElementById(name);
    const fragment = document.createDocumentFragment();

    listData.forEach((v) => {
      const li = document.createElement('li');

      const label = document.createElement('label');
      label.className = 'radio-list__label';
      li.appendChild(label);

      const input = document.createElement('input');
      input.type = 'radio';
      input.className = 'radio-list__radio';
      input.name = name;
      input.value = v.value;
      label.appendChild(input);

      const i = document.createElement('i');
      i.className = `radio-list__icon radio-list__icon--${name}`;
      i.innerHTML = v.icon ? `&#x${v.icon};` : v.value;
      label.appendChild(i);

      // Emoji非対応環境だったら、GitHubから画像を取得
      if (v.icon && !doesSupportEmoji) {
        const img = new Image();
        const fileName = v.icon.toLowerCase();
        img.src = `https://assets-cdn.github.com/images/icons/emoji/unicode/${fileName}.png`;

        img.onload = () => {
          i.style.backgroundImage = `url(${img.src})`;
          i.innerHTML = '&nbsp;';
        };
      }

      const p = document.createElement('p');
      p.className = 'radio-list__desc';
      p.innerHTML = v.desc;
      label.appendChild(p);

      fragment.appendChild(li);
    });

    listEl.appendChild(fragment);
  };

  generateList('tracker', trackers);
  generateList('emoji', emojis);
}
