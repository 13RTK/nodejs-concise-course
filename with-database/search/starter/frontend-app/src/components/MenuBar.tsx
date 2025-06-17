import { useAtom } from "jotai";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

import { searchTextAtom } from "../atoms/search.ts";

export default function MenuBar() {
  const [searchText, setSearchText] = useAtom(searchTextAtom);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

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
        onChange={handleSearchChange}
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
