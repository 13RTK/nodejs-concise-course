import { Todo, TodoDetail } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE;

export async function getTodos(
  currentPage: number = 1,
  searchText: string = ""
): Promise<Todo[]> {
  const searchTextParam = searchText ? `&search=${searchText}` : "";

  const response = await fetch(
    `${BASE_URL}?page=${currentPage}&limit=${PAGE_SIZE}${searchTextParam}`
  );
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
  const response = await fetch(`${BASE_URL}/${id}`);
  const todoData = await response.json();

  return todoData.content;
}

export async function deleteTodoById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  return result;
}

type UpdateTodo = {
  id: number;
  title?: string;
  tag?: string;
  content?: string;
};

export async function updateTodo(todo: UpdateTodo) {
  const response = await fetch(BASE_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const result = await response.json();

  return result;
}

export async function addTodo(todo: TodoDetail) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const result = await response.json();

  return result;
}

export async function getTodoCount(searchText: string) {
  const searchTextParam = searchText ? `?search=${searchText}` : "";

  const response = await fetch(`${BASE_URL}/count${searchTextParam}`);
  const result = await response.json();

  return result;
}
