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
  const [people, setPeople] = useState<number | string>("");
  const [bill, setBill] = useState<number | string>("");
  const [tipPercent, setTipPercent] = useState(0);
  const [nextRender, setNextRender] = useState(false);

  const tipAmount = (Number(bill) / 100) * tipPercent;
  const tipPerPerson = tipAmount / Number(people);
  const totalPerPerson = (Number(bill) + Number(tipAmount)) / Number(people);
  console.log("render");

  useEffect(() => {
    if (nextRender) {
      if (bill === 0 || bill === "" || isNaN(Number(bill)))
        setVisibleBill(true);

      if (people === 0 || people === "") setVisiblePeople(true);
    }
  }, [people, bill, nextRender]);

  function handler(num: number) {
    if (bill === 0 || bill === "" || isNaN(Number(bill))) {
      setVisibleBill(true);
    }

    setTipPercent(num);

    console.log(visiblePeople);
  }

  return (
    <div style={{ width: "100vw" }}>
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
              value={bill}
              min={0}
              className="user-input"
              id="bill"
              placeholder="0"
              onChange={(e) => {
                setBill(e.target.valueAsNumber);
                setNextRender(true);
              }}
            ></input>
            <p className={`${visibleBill ? "wrong  visible" : "wrong"}`}>
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
              value={people}
              name="tip"
              min={0}
              className="user-input"
              id="people"
              placeholder="0"
              onChange={(e) => {
                setPeople(e.target.valueAsNumber);
                setNextRender(true);
              }}
            ></input>
            <p className={`${visiblePeople ? "wrong visible" : "wrong"}`}>
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
                setBill("");
                setPeople("");
                setNextRender(false);
                setVisibleBill(false);
                setVisiblePeople(false);
              }}
            >
              Reset
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
