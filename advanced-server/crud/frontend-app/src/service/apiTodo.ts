import { Todo } from '../types/Todo';
import { faker } from '@faker-js/faker';

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

export async function getTodoContentById(id: number): Promise<string> {
  // const response = await fetch(`${BASE_URL}/${id}`);
  // const todoData = await response.json();

  // return todoData.content;

  return faker.lorem.lines({ min: 1, max: 3 });
}
