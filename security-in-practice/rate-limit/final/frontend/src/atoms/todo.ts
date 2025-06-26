import { atom } from "jotai";
import { Todo } from "../types/Todo.ts";

export const isTodoLoadingAtom = atom<boolean>(true);

export const currentTodoAtom = atom<Todo | null>(null);

export const currentEditTodoInfoAtom = atom({
  title: "",
  tag: "",
  content: "",
});
