import { useState } from 'react';
import { Toast } from 'primereact/toast';

import MenuBar from './components/MenuBar';
import TodoList from './components/TodoList';
import TodoDialog from './components/TodoDialog';

import { useToast } from './hooks/toast';
import { useTodo } from './hooks/todo';

import { Todo } from './types/Todo';

import { getTodoContentById } from './service/apiTodo';

function App() {
  const { toast, showToast } = useToast();
  const { todos, deleteTodo, addTodo, updateTodo } = useTodo();

  const [visible, setVisible] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const [buttonLabel, setButtonLabel] = useState<string>('Update');

  async function handleClickEditTodo(todo?: Todo) {
    if (!todo) {
      setButtonLabel('Add');
      setVisible(true);
      setCurrentTodo(null);
      setTitle('');
      setTag('');
      setContent('');
      return;
    }

    const todoContent = await getTodoContentById(todo.id);

    setContent(todoContent);
    setTitle(todo.title);
    setTag(todo.tag);
    setButtonLabel('Update');
    setCurrentTodo(todo);
    setVisible(true);
  }

  const [searchText, setSearchText] = useState<string>('');

  return (
    <>
      <MenuBar searchText={searchText} setSearchText={setSearchText} />
      <TodoList
        showToast={showToast}
        todos={todos}
        deleteTodo={deleteTodo}
        handleClickEditTodo={handleClickEditTodo}
        searchText={searchText}
      />

      <Toast ref={toast} />

      <TodoDialog
        visible={visible}
        setVisible={setVisible}
        content={content}
        setContent={setContent}
        title={title}
        setTitle={setTitle}
        tag={tag}
        setTag={setTag}
        buttonLabel={buttonLabel}
        addTodo={addTodo}
        updateTodo={updateTodo}
        showToast={showToast}
        currentTodo={currentTodo}
      />
    </>
  );
}

export default App;
