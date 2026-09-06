import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemeDisplay() {
  const theme = useContext(ThemeContext);

  return <p>Current theme: {theme}</p>;
}

export default ThemeDisplay;