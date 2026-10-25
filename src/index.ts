const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    console.log("追加:", args.join(" "));
    break;

  case "list":
    console.log("一覧を表示します");
    break;

  case "done":
    console.log("完了:", args[0]);
    break;

  case "delete":
    console.log("削除:", args[0]);
    break;

  default:
    console.log(`
使い方:
  todo add "やること"
  todo list
  todo done <ID>
  todo delete <ID>
`);
}
