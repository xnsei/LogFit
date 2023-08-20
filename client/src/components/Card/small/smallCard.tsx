import React from "react";
import { SmallCardProps } from "./SmallCardProps";

const SmallCard = (props: SmallCardProps) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <button onClick={props.onDelete}>Delete</button>
      <h4>{props.subTitile}</h4>
    </div>
  );
};

export default SmallCard;
