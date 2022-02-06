import React from "react";
import { useActions } from "../hooks/Action-creators";

interface celadder {
    nextcellId: string | null;
    forced?: boolean;
}

const CelAdder: React.FC<celadder> = ({ nextcellId, forced }) => {
  const { InsertCellAfterAction } = useActions();
  return (
    <div className={`celAdder ${forced && "celAdder_forced"}`}>
      <button
        className="button is-primary is-small is-rounded celAdder__button"
        onClick={() => InsertCellAfterAction(nextcellId, "code")}
      >
        
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span> 
        <span> code</span>
      </button>
      <button
        className="button is-primary is-small is-rounded celAdder__button"
        onClick={() => InsertCellAfterAction(nextcellId, "text")}
      >
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span> 
        <span>cell</span>
      </button>
      <div className="cellAdder__divider"></div>
    </div>
  );
};

export default CelAdder;
