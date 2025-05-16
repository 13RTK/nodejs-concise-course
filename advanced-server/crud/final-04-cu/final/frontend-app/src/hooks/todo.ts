import { useEffect, useState } from 'react';
import { Todo, TodoDetail } from '../types/Todo';
import {
  addTodo as addTodoApi,
  deleteTodoById,
  getTodos,
  updateTodo as updateTodoApi,
} from '../service/apiTodo';

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function deleteTodo(id: number) {
    await deleteTodoById(id);

    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }

  async function addTodo(todo: TodoDetail) {
    // TODO: Unlock addTodo api invoke
    // await addTodoApi(todo);

    setTodos([...todos, { id: todo.id, title: todo.title, tag: todo.tag }]);
  }

  async function updateTodo(
    todoId: number,
    updateTodo: {
      title?: string;
      tag?: string;
      content?: string;
    }
  ) {
    // TODO: Unlock updateTodo api invoke
    // const responseMessage = await updateTodoApi({
    //   id: todoId,
    //   ...(updateTodo.title && { title: updateTodo.title }),
    //   ...(updateTodo.tag && { tag: updateTodo.tag }),
    //   ...(updateTodo.content && { content: updateTodo.content }),
    // });

    setTodos(
      todos.map((todo: Todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tag: updateTodo.tag ? updateTodo.tag : todo.tag,
              title: updateTodo.title ? updateTodo.title : todo.title,
            }
          : todo
      )
    );
  }

  useEffect(() => {
    async function loadData() {
      const todosData = await getTodos();

      setTodos(todosData);
    }

    loadData();
  }, []);

  return {
    todos,
    deleteTodo,
    addTodo,
    updateTodo,
  };
}
