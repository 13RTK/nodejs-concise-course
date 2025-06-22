import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteTodoById } from "../../service/apiTodo.ts";

export function useDeleteTodo(todoQueryClient: QueryClient) {
  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      todoQueryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { deleteTodo, isDeleting };
}
