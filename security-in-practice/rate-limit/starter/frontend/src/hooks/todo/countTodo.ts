import { useQuery } from "@tanstack/react-query";
import { getTodoCount } from "../../service/apiTodo.ts";
import { searchTextAtom } from "../../atoms/search.ts";
import { useAtomValue } from "jotai";

export function useCountTodo() {
  const searchText = useAtomValue(searchTextAtom);

  const { data: todoCount, isLoading: isTodoCountLoading } = useQuery({
    queryKey: ["todoCount", searchText],
    queryFn: () => getTodoCount(searchText),
  });

  return {
    todoCount,
    isTodoCountLoading,
  };
}
