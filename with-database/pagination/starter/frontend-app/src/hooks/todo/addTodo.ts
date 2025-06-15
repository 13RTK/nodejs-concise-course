import { QueryClient, useMutation } from "@tanstack/react-query";

import { TodoDetail } from "../../types/Todo.ts";

import { addTodo as addTodoApi } from "../../service/apiTodo.ts";
import { isTodoLoadingAtom } from "../../atoms/todo.ts";
import { useSetAtom } from "jotai";

export function useAddTodo(todoQueryClient: QueryClient) {
  const setIsTodoLoading = useSetAtom(isTodoLoadingAtom);
  const { mutate: addTodo } = useMutation({
    mutationFn: async (value: TodoDetail) => {
      setIsTodoLoading(true);
      const result = await addTodoApi(value);

      return result;
    },
    onSuccess: () => {
      setIsTodoLoading(false);
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { addTodo };
}
