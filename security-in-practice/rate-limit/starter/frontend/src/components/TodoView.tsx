import { useQueryClient } from "@tanstack/react-query";

import TodoList from "./TodoList.tsx";
import TodoDialog from "./TodoDialog.tsx";

import { ToastSeverity } from "../types/ToastSeverity.ts";

function TodoView({
  showToast,
}: {
  showToast: (severity: ToastSeverity, summary?: string) => void;
}) {
  const todoQueryClient = useQueryClient();

  return (
    <>
      <TodoList todoQueryClient={todoQueryClient} showToast={showToast} />
      <TodoDialog showToast={showToast} todoQueryClient={todoQueryClient} />
    </>
  );
}

export default TodoView;
