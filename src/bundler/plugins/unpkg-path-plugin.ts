import axios from "axios";
import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        const pati = new URL(
          args.path,
          "https://unpkg.com" + args.resolveDir + "/"
        ).href;

        return {
          path: pati,
          namespace: "a",
        };
      });
      
      build.onResolve({ filter: /.*/ }, async (args: any) => {
 
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
