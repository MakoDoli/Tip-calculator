import React, { memo } from "react";
interface Props {
  cell: string;
  buttonNumber: number;
  handler: (num: number) => void;
  percentage: string;
}
const Tipbuttons = function (props: Props) {
  return (
    <button
      className={props.cell}
      onClick={() => props.handler(props.buttonNumber)}
    >
      {props.percentage}
    </button>
  );
};
//using react.memo to avoid extra rerenders
export default memo(Tipbuttons, (prevProps, nextProps) => {
  if (prevProps.buttonNumber === nextProps.buttonNumber) return true;
  else return false;
});
