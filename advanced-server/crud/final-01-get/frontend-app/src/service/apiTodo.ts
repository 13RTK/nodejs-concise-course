import { Todo } from '../types/Todo';
import { faker } from '@faker-js/faker';
import { getTodo } from '../utils/todoHelper';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(BASE_URL);
  const todoData = await response.json();

  // const todoData = new Array(5).fill(0).map((_, idx) => {
  //   const todo = getTodo();

  //   return {
  //     ...todo,
  //     id: `${idx}-${todo.id}`,
  //   };
  // });

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
