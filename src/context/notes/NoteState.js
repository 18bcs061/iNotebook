import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const s1 = {
    name: "abhi",
    class: "5b",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "abhiii",
        class: "10b",
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
