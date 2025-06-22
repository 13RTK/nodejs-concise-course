import { QueryClient } from "@tanstack/react-query";

import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { useSubmitTodo } from "./submitTodo.ts";

export function useTodoDialog(
  todoQueryClient: QueryClient,
  showToast: (severity: ToastSeverity, summary: string) => void
) {
  const { handleSubmit } = useSubmitTodo(todoQueryClient, showToast);

  return {
    handleSubmit,
  };
}
