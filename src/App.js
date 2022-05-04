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

const App = () => {
  let [calculator, setCalculator] = useState({
    sign: "",
    number: 0,
    result: 0,
  });

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
                onClick={() => {
                  console.log(`${button} clicked!`);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
