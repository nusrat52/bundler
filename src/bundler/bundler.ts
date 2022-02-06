import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

import { fetchPlugin } from "./plugins/fetchPlugin";
import * as esbuild from "esbuild-wasm";
import React from "react";
 
 const Bundler = async (
  rawCode: string,

 ) => {
 try
 {
  const transpilled = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    outfile: "out.css",
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
  });

  return { code: transpilled.outputFiles[0].text, err: "" };
 } catch (err:any) {
   return  { code: "", err:err.message };
}
 };

export default Bundler;
