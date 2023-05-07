import React, { memo } from "react";

const Tipbuttons = function (props: any) {
  console.log("buttons rerendered");
  return (
    <button
      className={props.cell}
      onClick={() => props.handler(props.buttonNumber)}
    >
      {props.percentage}
    </button>
  );
};

export default memo(Tipbuttons, (prevProps, nextProps) => {
  if (prevProps.buttonNumber === nextProps.buttonNumber) return true;
  else return false;
});
