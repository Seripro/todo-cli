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
      const maxId = Math.max(0, ...todos.map((todo) => todo.id));
      const newTodo = {
        id: maxId + 1,
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

    case "done": {
      const id = Number(args[0]);

      if (!Number.isInteger(id)) {
        console.log("完了するTodoのIDを指定してください。");
        break;
      }

      const todos = await loadTodos();
      const todo = todos.find((todo) => todo.id === id);

      if (!todo) {
        console.log(`ID ${id} のTodoは見つかりません。`);
        break;
      }

      todo.done = true;
      await saveTodos(todos);

      console.log(`完了しました: ${todo.title}`);
      break;
    }

    case "delete": {
      const id = Number(args[0]);

      if (!Number.isInteger(id)) {
        console.log("削除するTodoのIDを指定してください。");
        break;
      }

      const todos = await loadTodos();
      const filteredTodos = todos.filter((todo) => todo.id !== id);

      if (filteredTodos.length === todos.length) {
        console.log(`ID ${id} のTodoは見つかりません。`);
        break;
      }

      await saveTodos(filteredTodos);

      console.log(`ID ${id} のTodoを削除しました。`);
      break;
    }

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
