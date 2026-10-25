# todo-cli

TypeScript と Node.js で作った、依存の少ないシンプルな Todo CLI です。

## 必要なもの

- Node.js 20 以上
- npm

## セットアップ

依存関係をインストールしてビルドします。

```sh
npm install
npm run build
```

開発中のプロジェクトを `todo` コマンドとして使えるようにするには、続けて次を実行します。

```sh
npm link
```

## 使い方

Todoを追加します。

```sh
todo add "牛乳を買う"
```

Todo一覧を表示します。

```sh
todo list
```

指定したIDのTodoを完了にします。

```sh
todo done 1
```

指定したIDのTodoを削除します。

```sh
todo delete 1
```

実行例:

```text
$ todo add "牛乳を買う"
追加しました: 牛乳を買う

$ todo list
1. [ ] 牛乳を買う

$ todo done 1
完了しました: 牛乳を買う

$ todo list
1. [x] 牛乳を買う
```

## 開発時の実行

グローバルコマンドを登録せず、npm経由で実行することもできます。

```sh
npm run build
npm start -- add "牛乳を買う"
npm start -- list
```

`--` より後ろの値は、npmではなくTodo CLIに渡される引数です。

## データ

Todoは、コマンドを実行したディレクトリにある `todos.json` へ保存されます。削除するとデータも消えるため、必要ならファイルをバックアップしてください。

## 開発

TypeScriptをJavaScriptに変換します。

```sh
npm run build
```

`npm link` を使っている場合も、ソースを変更したあとは `npm run build` を実行すれば更新が反映されます。

リンクを解除するには、プロジェクト内で次を実行します。

```sh
npm unlink
```
