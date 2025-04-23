import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export default function MenuBar() {
  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      {/* TODO: Fetch data from API to handle onChange event, load spinner when loading */}
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} end={end} />
    </div>
  );
}
