import { useMutation } from "@tanstack/react-query";
import { getTodoContentById as getTodoContentByIdApi } from "../../service/apiTodo.ts";

export function useTodoContent() {
  const { mutate: getTodoContentById, isPending: isTodoContentGetting } =
    useMutation({
      mutationFn: getTodoContentByIdApi,
    });

  return { getTodoContentById, isTodoContentGetting };
}
