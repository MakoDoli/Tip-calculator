const Tipbuttons = function (props: any) {
  return (
    <button
      className={props.cell}
      onClick={() => props.handler(props.buttonNumber)}
    >
      {props.percentage}
    </button>
  );
};

export default Tipbuttons;
