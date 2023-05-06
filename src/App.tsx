import logo from "./images/logo.svg";
import "./App.css";
import "./Mobile.css";
import "./Tablet.css";
import { Buttons } from "./Buttons";

import { useState, useEffect } from "react";
import Tipbuttons from "./Tipbuttons";

function App() {
  const [visibleBill, setVisibleBill] = useState(false);
  const [visiblePeople, setVisiblePeople] = useState(false);
  const [bill, setBill] = useState<number | undefined>(undefined);
  const [people, setPeople] = useState<number | undefined>(undefined);
  const [tipPercent, setTipPercent] = useState(0);

  const tipAmount = (Number(bill) / 100) * tipPercent;
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = (Number(bill) + tipAmount) / people;
  useEffect(() => {
    if (Number(bill) === 0) setVisibleBill(true);

    if (people === 0) setVisiblePeople(true);
  }, [people, bill]);

  function handler(num: number) {
    setTipPercent(num);
  }

  return (
    <main
      onClick={() => {
        setVisibleBill(false);
        setVisiblePeople(false);
      }}
    >
      <img className="logo" src={logo} alt="logo"></img>
      <div className="container">
        <div className="box left-box">
          <h1>Bill</h1>

          <input
            type="number"
            name="bill"
            className="user-input"
            id="bill"
            placeholder="0"
            onChange={(e) => setBill(e.target.valueAsNumber)}
          ></input>
          <p
            className={`${
              visibleBill ? "wrong wrong-1 visible" : "wrong wrong-1"
            }`}
          >
            Can't be zero
          </p>
          <h1>Select Tip %</h1>
          <div className="tips">
            {Buttons.map((elem, index) => (
              <Tipbuttons
                key={index}
                buttonNumber={elem.number}
                cell="cell cell-1"
                handler={handler}
                percentage={`${elem.number}%`}
              />
            ))}

            <div className=" cell-6">
              <input
                onChange={(e) => setTipPercent(e.target.valueAsNumber)}
                type="number"
                name="custom"
                id="custom"
                placeholder="Custom"
              ></input>
            </div>
          </div>
          <h1>Number of People</h1>
          <input
            type="number"
            name="tip"
            className="user-input"
            id="people"
            placeholder="0"
            onChange={(e) => setPeople(e.target.valueAsNumber)}
          ></input>
          <p
            className={`${
              visiblePeople ? "wrong wrong-1 visible" : "wrong wrong-1"
            }`}
          >
            Can't be zero
          </p>
        </div>
        <div className="box right-box">
          <div className="tip-box">
            <div className="text">
              <h2>Tip amount</h2>
              <p>/ person</p>
            </div>
            <div className="tip-amount">
              $
              {isNaN(tipPerPerson) || tipPerPerson === Infinity
                ? 0
                : tipPerPerson.toFixed(2)}
            </div>
          </div>
          <div className="tip-box">
            <div className="text">
              <h2>Total</h2>
              <p>/ person</p>
            </div>
            <div className="total-amount">
              $
              {isNaN(totalPerPerson) || totalPerPerson === Infinity
                ? 0
                : totalPerPerson.toFixed(2)}
            </div>
          </div>
          <div
            className="reset"
            onClick={() => {
              setBill(0);
              setPeople(0);
            }}
          >
            Reset
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
