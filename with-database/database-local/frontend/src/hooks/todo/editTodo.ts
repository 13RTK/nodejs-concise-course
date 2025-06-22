import { UseMutateFunction } from "@tanstack/react-query";
import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { Todo } from "../../types/Todo.ts";
import { buttonLabelAtom } from "../../atoms/buttonLable.ts";
import { useSetAtom } from "jotai";

export function useEditTodo(
  setDialogVisible: (loading: boolean) => void,
  setCurrentTodo: (todo: Todo | null) => void,
  setEditTodoInfo: (todo: {
    title: string;
    tag: string;
    content: string;
  }) => void,
  showToast: (severity: ToastSeverity, summary: string) => void,
  getTodoContentById: UseMutateFunction<string, Error, number, unknown>
) {
  const setButtonLabel = useSetAtom(buttonLabelAtom);

  async function handleClickEditTodo(todo?: Todo) {
    if (!todo) {
      setButtonLabel("Add");
      setDialogVisible(true);
      setCurrentTodo(null);

      setEditTodoInfo({
        title: "",
        tag: "",
        content: "",
      });
      return;
    }

    getTodoContentById(todo.id, {
      onSuccess(todoContent) {
        setEditTodoInfo({
          title: todo.title,
          tag: todo.tag,
          content: todoContent,
        });
        setButtonLabel("Update");
        setCurrentTodo(todo);

        showToast("success", "Successfully loaded todo");

        setDialogVisible(true);
      },
    });
  }

  return {
    handleClickEditTodo,
  };
}
