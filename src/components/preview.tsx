import React, { useEffect, useRef } from "react";

interface previewInter {
  code: string;
  err:string
}

const PreView: React.FC<previewInter> = ({ code, err }) => {
  const html = `
  <html style="background:white">
<head>
</head>
<body>
<div id="root">

</div>
<script>

const errorHandling=(err)=>{
  document.querySelector("#root").innerHTML='<div style="color:red"><h4>Error message</h4>'+err+'</div>'
  console.error(err)
}
window.addEventListener("error",(event)=>{
  errorHandling(event.error)
})

window.addEventListener("message", (event)=>{
  try{
  eval(event.data)
 }catch(err){
  errorHandling(err)
}

}
  
  
  , false);


</script>
</body>
  </html>
  `;
  const ifra = useRef<any>();

  useEffect(() => {
 
    ifra.current.srcdoc = html;
    setTimeout(() => {
      ifra.current.contentWindow.postMessage(code, "*");
      
    },50)
  }, [code]);
 
  return (
    <div className="iframeWrapper1">
          <iframe
        style={{ zIndex: "20"}}
        title="preview"
        ref={ifra}
        sandbox="allow-scripts"
        srcDoc={html}
        className="iframe"
      ></iframe>


      
    {err && <div className="previewError"><h1>Error message</h1>{err}</div>}

    </div>
  );
};

export default PreView;
