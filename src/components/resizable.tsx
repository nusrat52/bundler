import { ResizableBox, ResizableProps } from "react-resizable";
import React, { useEffect, useState } from "react";

interface ResizableInter {
  direction: "horizontal" | "vertical";
}

let resizibleProps: ResizableProps;

const Resizabl: React.FC<ResizableInter> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
 
  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (width > window.innerWidth * 0.75) {
          setWidth(window.innerWidth * 0.75)
        }


       }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  if (direction === "horizontal") {
    resizibleProps = {
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      className: "resizibl_hor ",
      width,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
     
      },
    };
  } else {
    resizibleProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      className: "resizibl",
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizibleProps}>{children}</ResizableBox>;
};

export default Resizabl;
