import { loadTodos, saveTodos } from "./store.js";

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "add": {
      const title = args.join(" ");

      if (!title) {
        console.log("追加するTodoを入力してください。");
        break;
      }

      const todos = await loadTodos();

      const newTodo = {
        id: todos.length + 1,
        title,
        done: false,
      };

      todos.push(newTodo);
      await saveTodos(todos);

      console.log(`追加しました: ${newTodo.title}`);
      break;
    }

    case "list": {
      const todos = await loadTodos();

      if (todos.length === 0) {
        console.log("Todoはありません。");
        break;
      }

      for (const todo of todos) {
        const mark = todo.done ? "x" : " ";
        console.log(`${todo.id}. [${mark}] ${todo.title}`);
      }

      break;
    }

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
}

main().catch((error) => {
  console.error("エラー:", error);
  process.exit(1);
});
