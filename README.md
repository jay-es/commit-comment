# コミットコメントジェネレータ
https://jshindo-gladd.github.io/commit-comment/

## コミットコメント作成
1. Ticket Tracker: トラッカーを選択
2. Ticket Number: チケット番号を入力
3. Branch Prefix: バージョン番号や親チケット番号など<sup>※</sup>
4. Issue Number: GitHub Issueの番号を入力
5. Branch Keyword: チケットの要約を入力<sup>※</sup>
6. Emoji: 絵文字を選択
7. Commit Summary: コミットの内容を入力
8. コピーボタンをクリックするとコミットコメントがクリップボードにコピーされ、ブランチ名が履歴に追加される

※Branch PrefixとBranch Keywordは履歴のブランチ名に表示するための項目なので、コミットコメントには使用されない

## 出力形式
- コミットコメント
`{Ticket Tracker} #{Ticket Number} {Emoji} {Issue Number} {Commit Summary}`
例）`FT #3000 :pencil: 20 タイトル変更`

- ブランチ名
`{Ticket Tracker}-{Ticket Number}-{Branch Prefix}-{Issue Number}-{Branch Keyword}`
例）`FT-3000-v1.0-20-TopPage`

## 履歴 (Branch History)
- 履歴のデータはブラウザのストレージに保存されている
- ページ読み込み時、履歴のデータがあれば前回の状態が復元される
- 絵文字とコミット内容は毎回変わるので保存しない
- restoreボタンを押すと、トラッカー、チケット番号、キーワードが復元される
- removeボタンを押すと、その履歴が削除される
- Redmineリンクを押すとチケットのページが新しいタブで開く
- ブランチ名をクリックするとクリップボードにコピーされる
