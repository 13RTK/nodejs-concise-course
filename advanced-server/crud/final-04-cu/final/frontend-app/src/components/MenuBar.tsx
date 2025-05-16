import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export default function MenuBar({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
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
      <InputText
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
