import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { deleteTodoById, getTodos } from '../service/apiTodo';

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function deleteTodo(id: number) {
    // await deleteTodoById(id);

    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  }

  function addTodo(todo: Todo) {
    setTodos([...todos, todo]);
  }

  function updateTodo(
    todoId: number,
    updateTodo: {
      title?: string;
      tag?: string;
    }
  ) {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, ...updateTodo } : todo
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
