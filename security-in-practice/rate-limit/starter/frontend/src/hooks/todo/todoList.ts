import { useSetAtom } from "jotai";
import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { dialogVisibleAtom } from "../../atoms/dialogVisible.ts";
import {
  currentEditTodoInfoAtom,
  currentTodoAtom,
  isTodoLoadingAtom,
} from "../../atoms/todo.ts";
import { ToastSeverity } from "../../types/ToastSeverity.ts";
import { useDeleteTodo } from "./deleteTodo.ts";
import { useGetTodo } from "./getTodo.ts";
import { useEditTodo } from "./editTodo.ts";
import { useTodoContent } from "./todoContent.ts";

export function useTodoList(
  todoQueryClient: QueryClient,
  showToast: (severity: ToastSeverity, summary: string) => void
) {
  // get todos
  const { todos, isTodoGetting, isTodoLoadError } = useGetTodo();

  // delete todo
  const { deleteTodo, isDeleting } = useDeleteTodo(todoQueryClient);

  // get todo content
  const { getTodoContentById, isTodoContentGetting } = useTodoContent();

  const setIsTodoLoading = useSetAtom(isTodoLoadingAtom);

  useEffect(() => {
    if (isTodoGetting || isDeleting) {
      setIsTodoLoading(true);
      return;
    }

    setIsTodoLoading(false);
  }, [isTodoGetting, isDeleting]);

  const setDialogVisible = useSetAtom(dialogVisibleAtom);
  const setCurrentTodo = useSetAtom(currentTodoAtom);
  const setEditTodoInfo = useSetAtom(currentEditTodoInfoAtom);

  const { handleClickEditTodo } = useEditTodo(
    setDialogVisible,
    setCurrentTodo,
    setEditTodoInfo,
    showToast,
    getTodoContentById
  );

  return {
    todos,
    deleteTodo,
    isTodoLoadError,
    handleClickEditTodo,
    isTodoContentGetting,
  };
}
