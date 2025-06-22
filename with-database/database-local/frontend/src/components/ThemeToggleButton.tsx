import { useContext, useState } from "react";
import { PrimeReactContext } from "primereact/api";
import { ToggleButton } from "primereact/togglebutton";

function ThemeToggleButton() {
  const { changeTheme } = useContext(PrimeReactContext);
  const [isDark, setIsDark] = useState<boolean>(false);

  const lightTheme = "lara-light-cyan";
  const darkTheme = "lara-dark-cyan";
  function toggleTheme() {
    if (isDark) {
      changeTheme?.(darkTheme, lightTheme, "theme-link");
      setIsDark(false);
      return;
    }
    changeTheme?.(lightTheme, darkTheme, "theme-link");
    setIsDark(true);
  }

  return (
    <ToggleButton
      checked={isDark}
      onChange={toggleTheme}
      onIcon="pi pi-sun"
      onLabel="Light"
      offIcon="pi pi-moon"
      offLabel="Dark"
      className="w-8rem"
    />
  );
}

export default ThemeToggleButton;
