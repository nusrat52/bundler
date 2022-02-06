import React from "react";
import { useActions } from "../hooks/Action-creators";

interface actionbarInter {
    id:string
}
const ActionBar: React.FC<actionbarInter> = ({ id }) => {
    

     
  const { DeleteCellAction, MoveCellAction } = useActions();

  return (
    <div className="actionBar">
      <button className="button is-primary is-small" onClick={() => MoveCellAction(id, "up")}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
          </button>
      <button className="button is-primary is-small"   onClick={() => MoveCellAction(id, "down")}>
      <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
          </button>
      <button className="button is-primary is-small"  onClick={() => DeleteCellAction(id)}>
      <span className="icon">
          <i className="fas fa-times"></i>
        </span>
          </button>
          
    </div>
  );
}

export default ActionBar;
