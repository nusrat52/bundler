import * as esbuild from "esbuild-wasm";
import localForge from "localforage";
import axios from "axios";

const fileChage = localForge.createInstance({
  name: "fileChage",
});
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetchPlugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const soteredData = await fileChage.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (soteredData) {
          return soteredData;
        }
      });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
      const style=document.createElement('style');
      style.innerText='${escaped}';
      document.head.appendChild(style);
      `;
        const dataWillStore: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        fileChage.setItem(args.path, dataWillStore);
        return dataWillStore;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios(args.path);
        const dataWillStore: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        fileChage.setItem(args.path, dataWillStore);
        return dataWillStore;
      });
    },
  };
};
