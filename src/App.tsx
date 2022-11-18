import React from 'react';
import './App.css';
import { useState, useEffect, useLayoutEffect} from "react";


export const createRandomHex = () => {
  let ranHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  return `#${ranHex.toUpperCase()}`
};

// console.log(createRandomHex());

export const createHexArr = () => {
  var arr = [];
  for ( let i = 0; i<3; i++) {
      let tmp = createRandomHex();
      arr.push(tmp);
  }
  // debugger;
  return arr;
};

export const randomHex = (arr: any) => {
  return arr[Math.floor(Math.random() * arr.length)]
};

var hexArr = createHexArr();
// console.log(hexArr)

enum Result {
  Correct,
  Incorrect
};

function App() {
  const [color, setColor] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const createColors = () => {
    const realColor = createRandomHex();
    setColor(realColor);
    setAnswer([realColor, createRandomHex(), createRandomHex()].sort((
    ) => 0.5 - Math.random()));
  }

  useEffect(() => {
    createColors();
  }, []);

  const answerHandlingClicked = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      createColors();
    } else {
      setResult(Result.Incorrect);
    }
  }
  
    return (
    <div className="App">
      <div>
        <div className='guess-color' style={{ background: color }}></div>        
        {answer.map((answer) => (
          <button onClick={() => answerHandlingClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}
        
        {result === Result.Incorrect && <div className='incorrect'>Incorrect Answer!</div>}
        {result === Result.Correct && <div className='correct'>Correct Answer!</div>}  
      </div>
    </div>
  );
}

export default App;
