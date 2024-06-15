import { useState } from "react";
import "./App.css";

export const CalculatorApp = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (e) => {
    const val = e.target.textContent;
    setValue((prev) => prev + val);
  };

  const precedence = (operator) => {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  };

  const calculate = (value) => {
    let output = [];
    let store = [];
    let operator = ["+", "-", "*", "/"];
    for (let i = 0; i < value.length; i++) {
      let number = value[i];
      if (!isNaN(number) || number === ".") {
        while (!isNaN(value[i + 1]) || value[i + 1] === ".") {
          number += value[i + 1];
          i++;
        }
        output.push(parseFloat(number));
      } else if (operator.includes(number)) {
        while (
          store.length &&
          precedence(number) <= precedence(store[store.length - 1])
        ) {
          output.push(store.pop());
        }
        store.push(number);
      }
    }
    while (store.length) {
      output.push(store.pop());
    }
    let resultArr = [];
    for (let i = 0; i < output.length; i++) {
      let chars = output[i];
      if (!isNaN(chars)) {
        resultArr.push(chars);
      } else {
        let b = resultArr.pop();
        let a = resultArr.pop();
        switch (chars) {
          case "+":
            resultArr.push(a + b);
            break;
          case "-":
            resultArr.push(a - b);
            break;
          case "*":
            resultArr.push(a * b);
            break;
          case "/":
            resultArr.push(a / b);
            break;
          default:
            break;
        }
      }
    }
    return resultArr.pop();
  };

  const handleClear = () => {
    setValue("");
    setResult("");
  };

  const handleValidate = () => {
    if (value === "") {
      setResult("Error");
    } else if (value.includes("0/0")) {
      setResult("NaN");
    } else if (value.includes("1/0")) {
      setResult("Infinity");
    } else {
      setResult(calculate(value));
    }
  };

  return (
    <div className="min-container">
      <div className="Main-div">
        <h2
          style={{
            marginBottom: "30px",
            fontFamily: "monospace",
            fontSize: "20px",
          }}
        >
          React Calculator
        </h2>
        <input
          type="text"
          value={value}
          readOnly
          style={{
            width: "98%",
            marginBottom: "10px",
            height: "40px",
            fontSize: "25px",
            borderRadius: "20px",
            borderColor: "black",
          }}
        />
        <p style={{ fontSize: "25px", marginTop: "5px", textAlign: "center" }}>
          {result}
        </p>
        <div className="Button-div">
          {[
            "7",
            "8",
            "9",
            "+",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "*",
            "C",
            "0",
            "=",
            "/",
          ].map((val) => (
            <button
              key={val}
              onClick={(e) =>
                val === "C"
                  ? handleClear()
                  : val === "="
                  ? handleValidate()
                  : handleInput(e)
              }
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
