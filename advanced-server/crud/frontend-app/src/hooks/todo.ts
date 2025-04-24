import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../service/apiTodo';

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
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
  };
}
