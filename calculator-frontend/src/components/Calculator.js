import React, { useState } from 'react';
import Display from './Display';
import Buttons from './Buttons';

const Calculator = () => {
  const [output, setOutput] = useState('')
  const [isPrime, setPrime] = useState('')
  return (
    <div className="calculator-body">
      <div>
        <h1>Calculator</h1>
        <Display isPrime={isPrime} output={output} />
        <Buttons setPrime={setPrime} setOutput={setOutput} />
      </div>
    </div>
  )
}

export default Calculator;