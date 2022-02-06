import "./App.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import React from "react";
import CodeCell from "./components/codeCell";
import MDEditor from "./components/textEditor/text-editor";
import List from "./components/lists";

import "@fortawesome/fontawesome-free/css/all.min.css"

const App: React.FC = () => {
  return (
    <>
      <List />
    </>
  );
};

export default App;
