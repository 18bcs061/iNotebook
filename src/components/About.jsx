import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, []);
  return <div>this is about{a.state.name}</div>;
}

export default About;
