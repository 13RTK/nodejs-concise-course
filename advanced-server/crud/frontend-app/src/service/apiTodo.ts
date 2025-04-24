import { Todo } from '../types/Todo';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getTodos(): Promise<Todo[]> {
  // const response = await fetch(`BASE_URL$/get`);
  const response = await fetch(BASE_URL);
  const todoData = await response.json();

  return todoData.map((todo: any) => {
    return {
      id: todo.id,
      title: todo.title,
      tag: todo.tag,
    };
  });
}
