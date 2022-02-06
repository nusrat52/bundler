import React from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier"
import parser from "prettier/parser-babel"
import "../css/style.css"
 // import codeShift from "jscodeshift"
// import HighLighter from "monaco-jsx-highlighter"
 interface editorPrInter {
  initialValue: string;
  onChange: (value: any) => void;
 onFromat:(formatted:string)=>void
}

export const MonacoEditor: React.FC<editorPrInter> = ({
  initialValue,
  onChange,
  onFromat
}) => {
 
  const onEditorDidMount = (v: string | undefined) => {
    onChange(v);
  };


  const onClichFormatter = () => {
  


    const formatted = prettier.format(initialValue, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote:true
    }).replace(/\n$/, '')
 
    onFromat(formatted)
  };

// try{

//   const highlighter = new HighLighter(
//   //@ts-ignore
//     window.monaco,
//     codeShift,
//     Editor
    
// )
//   highlighter.highLightOnDidChangeModelContent()
  

// } catch (err) {
   
// }
  return (
    <div className="editorWrapper" >

      <button className="button button-format is-primary is-small editorWrapper__button" onClick={onClichFormatter}>formatIt</button>
      <Editor
      
      onChange={onEditorDidMount}
      value={initialValue}
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      theme="vs-dark"
      language="javascript"
      height="100%"
      />
      </div>
  );
};
