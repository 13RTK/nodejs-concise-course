import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function TodoDialog({
  visible,
  setVisible,
  content,
  setContent,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  content: string;
  setContent: (content: string) => void;
}) {
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
      <form className="card flex justify-content-center align-items-center flex-column gap-3">
        <InputText
          keyfilter="int"
          placeholder="title"
          className="p-inputtext-lg"
        />
        <InputText
          keyfilter="int"
          placeholder="tag"
          className="p-inputtext-lg"
        />

        <InputTextarea
          autoResize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          cols={30}
          placeholder="content"
        />
      </form>
    </Dialog>
  );
}

export default TodoDialog;
