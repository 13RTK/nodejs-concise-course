import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Todo, TodoDetail } from '../types/Todo';
import { ToastSeverity } from '../types/ToastSeverity';

function TodoDialog({
  visible,
  setVisible,
  content,
  setContent,
  title,
  setTitle,
  tag,
  setTag,
  buttonLabel,
  addTodo,
  updateTodo,
  showToast,
  currentTodo,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  tag: string;
  setTag: (tag: string) => void;
  buttonLabel: string;
  addTodo: (todo: TodoDetail) => void;
  updateTodo: (
    todoId: number,
    updateTodo: { title?: string; tag?: string; content?: string }
  ) => void;
  showToast: (severity: ToastSeverity, summary: string) => void;
  currentTodo: Todo | null;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Add todo
    if (buttonLabel.toLowerCase() === 'add') {
      addTodo({
        id: Date.now(),
        title: formData.get('title') as string,
        tag: formData.get('tag') as string,
        content: formData.get('content') as string,
      });

      showToast('success', 'Successfully added todo');

      // Update todo
    } else {
      if (currentTodo) {
        updateTodo(currentTodo?.id, {
          title: formData.get('title') as string,
          tag: formData.get('tag') as string,
          content: formData.get('content') as string,
        });

        showToast('success', 'Successfully updated todo');
      }
    }
    setVisible(false);
  }

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      style={{ width: '50vw' }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <form
        className="card flex justify-content-center align-items-center flex-column gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-column gap-2">
          <label htmlFor="title">Title</label>
          <InputText
            placeholder="Input your todo title"
            className="p-inputtext-lg"
            value={title}
            aria-describedby="title-help"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="tag">Tag</label>
          <InputText
            placeholder="Input your todo tag"
            id="tag"
            aria-describedby="tag-help"
            className="p-inputtext-lg"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            name="tag"
          />
        </div>

        <InputTextarea
          autoResize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          cols={30}
          placeholder="content"
          name="content"
        />

        <Button label={buttonLabel} />
      </form>
    </Dialog>
  );
}

export default TodoDialog;
