import { QueryClient } from "@tanstack/react-query";
import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { currentTodoStartIndexAtom } from "../../atoms/pagination.ts";
import { useAtomValue, useSetAtom } from "jotai";
import { buttonLabelAtom } from "../../atoms/buttonLable.ts";
import { currentTodoAtom } from "../../atoms/todo.ts";
import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";
import { useAddTodo } from "./addTodo.ts";
import { useUpdateTodo } from "./updateTodo.ts";

export function useSubmitTodo(
  todoQueryClient: QueryClient,
  showToast: (severity: ToastSeverity, summary: string) => void
) {
  const setCurrentTodoStartIndex = useSetAtom(currentTodoStartIndexAtom);
  const buttonLabel = useAtomValue(buttonLabelAtom);
  const currentTodo = useAtomValue(currentTodoAtom);
  const setDialogVisible = useSetAtom(dialogVisibleAtom);

  const { addTodo } = useAddTodo(todoQueryClient);
  const { updateTodo } = useUpdateTodo(todoQueryClient);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Add todo
    if (buttonLabel.toLowerCase() === "add") {
      addTodo(
        {
          id: Date.now(),
          title: formData.get("title") as string,
          tag: formData.get("tag") as string,
          content: formData.get("content") as string,
        },
        {
          onSuccess: () => {
            setCurrentTodoStartIndex(0);
            showToast("success", "Successfully added todo");
          },
        }
      );

      // Update todo
    } else {
      if (currentTodo) {
        updateTodo(
          {
            todoId: currentTodo?.id,
            updateTodo: {
              title: formData.get("title") as string,
              tag: formData.get("tag") as string,
              content: formData.get("content") as string,
            },
          },
          {
            onSuccess: () => {
              showToast("success", "Successfully updated todo");
            },
          }
        );
      }
    }
    setDialogVisible(false);
  }

  return {
    handleSubmit,
  };
}
