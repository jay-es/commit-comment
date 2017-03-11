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
      icon: '&#x1F41B;',
      desc: 'バグ修正',
    },
    {
      value: ':+1:',
      icon: '&#x1F44D;',
      desc: '機能追加、仕様変更にともなう機能修正',
    },
    {
      value: ':art:',
      icon: '&#x1F3A8;',
      desc: 'デザイン修正（レイアウト変更、余白の調整など）',
    },
    {
      value: ':pencil:',
      icon: '&#x1F4DD;',
      desc: '文言の修正',
    },
    {
      value: ':gem:',
      icon: '&#x1F48E;',
      desc: 'リファクタリング',
    },
    {
      value: ':x:',
      icon: '&#x274C;',
      desc: '不要な機能・ソースの削除',
    },
    {
      value: ':dress:',
      icon: '&#x1F457;',
      desc: 'コードスタイルの修正<br>（空白削除、インデント変更など）',
    },
    {
      value: ':dash:',
      icon: '&#x1F4A8;',
      desc: 'パフォーマンス改善',
    },
    {
      value: ':up:',
      icon: '&#x1F199;',
      desc: '依存パッケージなどのアップデート',
    },
    {
      value: ':cop:',
      icon: '&#x1F46E;',
      desc: 'セキュリティ関連の改善',
    },
  ];

  const generateList = (name, listData) => {
    const listEl = document.getElementById(name);
    const fragment = document.createDocumentFragment();

    listData.forEach((v) => {
      const li = document.createElement('li');

      const label = document.createElement('label');
      li.appendChild(label);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.value = v.value;
      label.appendChild(input);

      const i = document.createElement('i');
      i.innerHTML = v.icon || v.value;
      label.appendChild(i);

      const p = document.createElement('p');
      p.innerHTML = v.desc;
      label.appendChild(p);

      fragment.appendChild(li);
    });

    listEl.appendChild(fragment);
  };

  generateList('tracker', trackers);
  generateList('emoji', emojis);
}
