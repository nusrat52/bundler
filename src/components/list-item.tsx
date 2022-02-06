import React from "react";

import { Cell } from "../store";
import TextEditor from "./textEditor/text-editor";
import CodeCell from "./codeCell";
import ActionBar from "./actionBar";
interface ListInter {
  cel: Cell;
  esbuilt: any;
  setEsbuilt: React.Dispatch<any>;
}

const List: React.FC<ListInter> = ({ cel, esbuilt, setEsbuilt }) => {
  let CellItem: React.FC<{ cel: Cell }>;

  return (
    <>
      {cel.type === "code" && (
        <div className="celWrapper">
          <div className="relative actionWrapper ">
            <ActionBar id={cel.id} />
          </div>
          <CodeCell cel={cel} esbuilt={esbuilt} setEsbuilt={setEsbuilt} />
        </div>
      )}
      {cel.type !== "code" && (
        <div className="celWrapper">
      <div className="relative">
            <ActionBar id={cel.id} />
          <TextEditor cel={cel} />
          </div>
        </div>
      )}
    </>
  );
};
export default List;
