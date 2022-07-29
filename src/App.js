import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Router, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Route>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </Route>
      </NoteState>
    </div>
  );
}

export default App;
