import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (number) => 
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const App = () => {
  let [calculator, setCalculator] = useState({
    sign: "",
    number: 0,
    result: 0,
  });

  const numberClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (removeSpaces(calculator.number).length < 16) {
      setCalculator({
        ...calculator,
        number:
          calculator.number === 0 && value === "0"
          ? "0"
          : removeSpaces(calculator.number) % 1 === 0
          ? toLocaleString(Number(calculator.number + value))
          : toLocaleString(calculator.number + value),
        result: !calculator.sign ? 0 : calculator.result,
      });
    }
  };

  const decimalClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalculator({
      ...calculator,
      number: !calculator.number.toString().includes(".") ? calculator.number + value : calculator.number,
    });
  };

  const signClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalculator({
      ...calculator,
      sign: value,
      result: !calculator.result && calculator.number ? calculator.number : calculator.result,
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calculator.sign && calculator.number) {
      const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b

        setCalculator({
        ...calculator,
        result: 
          calculator.number === "0" && calculator.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              math(
                Number(removeSpaces(calculator.result)),
                Number(removeSpaces(calculator.number)),
                calculator.sign
              )
            ),
            sign: "",
            number: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalculator({
      ...calculator,
      number: calculator.number ? toLocaleString(removeSpaces(calculator.number) * -1) : 0,
      result: calculator.result ? toLocaleString(removeSpaces(calculator.result) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let number = calculator.number ? parseFloat(removeSpaces(calculator.number)) : 0;
    let result = calculator.result ? parseFloat(removeSpaces(calculator.result)) : 0;

    setCalculator({
      ...calculator,
      number: (number /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculator({
      ...calculator,
      sign: "",
      number: 0,
      result: 0,
    });
  };



  return(
    <Wrapper>
      <Screen value={ calculator.number ? calculator.number : calculator.result } />
      <ButtonBox>
        {
          buttonValues.flat().map((button, i) => {
            return (
              <Button
                key={i}
                className={button === "=" ? "equals" : ""}
                value={button}
                onClick={
                  button === "C"
                    ? resetClickHandler
                    : button === "+-"
                    ? invertClickHandler
                    : button === "%"
                    ? percentClickHandler
                    : button === "="
                    ? equalsClickHandler
                    : button === "/" || button === "X" || button === "-" || button === "+"
                    ? signClickHandler
                    : button === "."
                    ? decimalClickHandler
                    : numberClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
