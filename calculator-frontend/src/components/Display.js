import React from 'react';

const Display = ({ output, isPrime }) => {
  return (
    <div className="result">
      <div><p>{output}</p></div>
      <div>{isPrime === null && ''}</div>
      <div>{isPrime === true && (<p>Sum is prime number</p>)}</div>
    </div>
  )
}

export default Display;