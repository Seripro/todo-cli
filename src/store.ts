import { readFile, writeFile } from "node:fs/promises";
import { Todo } from "./todo";

const filePath = "todos.json";

export async function loadTodos(): Promise<Todo[]> {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content) as Todo[];
  } catch (error) {
    const isMissingFile =
      error instanceof Error && "code" in error && error.code === "ENOENT";

    if (isMissingFile) {
      return [];
    }

    throw error;
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await writeFile(filePath, JSON.stringify(todos, null, 2) + "\n");
}
