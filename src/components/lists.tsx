import React, { useState, useEffect, Fragment } from "react";
import { useTypedSelector } from "../hooks/typedHookSelector";
import ListItem from "./list-item";
import * as esbuild from "esbuild-wasm";
import CelAdder from "./celAdder";
const List: React.FC = () => {
  const cells = useTypedSelector((state) => state.cells);
    
  const order = cells.order;
  const cellsArr = order.map((id) => cells.data[id]);

  const [esbuilt, setEsbuilt] = useState<any>(null);

  const esbuiltInitializer = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.5/esbuild.wasm",
    });
    setEsbuilt(true);
  };

  useEffect(() => {
    esbuiltInitializer();
  }, []);

  const cellsComp = cellsArr.map((cel) => (
    <Fragment key={cel.id}>
      <CelAdder nextcellId={cel.id} />
      <ListItem cel={cel} esbuilt={esbuilt} setEsbuilt={setEsbuilt} />
    </Fragment>
  ));

  return (
    <div>
      {esbuilt && cellsComp}
      <CelAdder forced={order.length === 0} nextcellId={null} />
    </div>
  );
};

export default List;
