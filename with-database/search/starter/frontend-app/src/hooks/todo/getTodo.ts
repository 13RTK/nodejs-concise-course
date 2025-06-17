import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../../service/apiTodo.ts';
import { useAtomValue } from 'jotai';
import { currentPageAtom } from '../../atoms/pagination.ts';
import { searchTextAtom } from '../../atoms/search.ts';

export function useGetTodo() {
  const currentPage = useAtomValue(currentPageAtom);
  const searchText = useAtomValue(searchTextAtom);

  // TODO: Enable pagination
  const {
    data: todos,
    isLoading: isTodoGetting,
    isError: isTodoLoadError,
  } = useQuery({
    queryKey: ['todos', currentPage, searchText],
    // queryFn: () => getTodos(currentPage, searchText),
    queryFn: () => getTodos(currentPage),
  });

  return {
    todos,
    isTodoGetting,
    isTodoLoadError,
  };
}
