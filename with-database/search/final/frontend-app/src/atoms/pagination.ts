import { atom } from "jotai";

export const currentTodoStartIndexAtom = atom(0);

export const currentPageAtom = atom((get) => {
  const currentTodoStartIndex = get(currentTodoStartIndexAtom);

  return Math.trunc(currentTodoStartIndex / import.meta.env.VITE_PAGE_SIZE) + 1;
});
