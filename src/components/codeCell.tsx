import React, { useRef, useEffect, useState } from "react";
import { MonacoEditor } from "./monacoEditor";
import PreView from "./preview";
import Resizabl from "./resizable";
import { useActions } from "../hooks/Action-creators";
import { Cell } from "../store";
import { useTypedSelector } from "../hooks/typedHookSelector";
interface codeCell {
  cel: Cell;
  esbuilt: any;
  setEsbuilt: React.Dispatch<any>;
}

const CodeCell: React.FC<codeCell> = ({ cel }) => {
  const bundled = useTypedSelector((state) => state.bundle[cel.id]);

  const ref = useRef<any>();

  const { UpdateCellAction, BundleStartAction } = useActions();

  useEffect(() => {
    if (!bundled) {
      BundleStartAction(cel.id, cel.content);

      return;
    }
    const timer = setTimeout(async () => {
      BundleStartAction(cel.id, cel.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cel.content, cel.id]);

  return (
    <Resizabl direction="vertical">
      <div className="editorWrapperka">
        <Resizabl direction="horizontal">
          <MonacoEditor
            onChange={(value: string) => UpdateCellAction(cel.id, value)}
            initialValue={cel.content}
            onFromat={(formatted) => UpdateCellAction(cel.id, formatted)}
          />
        </Resizabl>
        {/* <button style={{ display: "block" }} onClick={clickOn}>
        click me!
      </button> */}
        <div className="wh-bgc">
        {!bundled || bundled.loading ? (
          <div className="progress-cover">
            <progress className="is-small is-primary progress" max="100">
              loading
            </progress>
          </div>
        ) : (
          <PreView err={bundled.err} code={bundled.code} />
        )}

        </div>
      </div>
    </Resizabl>
  );
};

export default CodeCell;
