import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import "../../css/style.css";
import { Cell } from "../../store/cell";
import { useActions } from "../../hooks/Action-creators";
interface textEditorInter {
  cel: Cell;
}
const TextEditor: React.FC<textEditorInter> = ({ cel }) => {
  const [editing, setEditing] = useState(false);
  const refka = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (refka.current && refka.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });
 
    return () => {
      document.removeEventListener("click", listener, { capture: true });
     };
  }, []);

  const { UpdateCellAction } = useActions();
  const setValue = (value:string|undefined) => {
    UpdateCellAction(cel.id, value as string)
  };
  return (
    <div>
      <div className="textEditor" ref={refka}>
        {editing && <MDEditor value={cel.content} onChange={setValue} />}
      </div>

      {!editing && (
        <div className="card" onClick={() => setEditing(true)}>
          <div className="card-content">
            <MDEditor.Markdown source={cel.content||"please add something"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
