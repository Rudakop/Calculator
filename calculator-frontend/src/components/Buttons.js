import React, { useState, useEffect } from 'react';

const Buttons = ({ setOutput, setPrime }) => {
  const [formula, setFormula] = useState('')
  const [numList, setNumList] = useState([])
  const [ disablePrimeBtn, setDisablePrimeBtn ] = useState(false)

  const onClick = (btnName) => {
    console.log(btnName)
  }

  const onClickNumberBtn = (event) => {
    const value = event.target.name

    setFormula(currentFormula => {
      return `${currentFormula}${value}`
    })
  }

  const onClickAdd = () => {
    setFormula(currentFormula => {
      return `${currentFormula} + `
    })
    // Disable Prime button, as it requires only one number at the time
    setDisablePrimeBtn(true)
  }

  const onClickEqual = () => {
    if (!Array.isArray(numList)) {
      return null
    }

    fetch(`http://localhost:3000/api/sum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          action: 'sumandcheck',
          numbers: numList
        }
      )
    })
      .then(async response => await response.json())
      .then(({
        result,
        isPrime
      }) => {
        setFormula(result.toString())
        setDisablePrimeBtn(false)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onClear = () => {
    setFormula('')
    setNumList([])
    setPrime('')
  }

  const onPrime = () => {
    if (!Array.isArray(numList)) {
      return null
    }

    fetch(`http://localhost:3000/api/isPrime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          action: 'numandcheck',
          num: numList[0] 
        }
      )
    })
      .then(async response => await response.json())
      .then(({
        result,
        isPrime
      }) => {
        setOutput(isPrime ? `The number ${result} is prime` :  `The number ${result} is not prime`)
      })
      .catch(error => {
        console.error(error)
      })
  }

  // Update output (display)
  useEffect(() => {
    // get numbers from string
    const numbers = formula.match(/(\d+?\.\d+)|(\d+)/g)

    setNumList(numbers || [])
    setOutput(formula)
  }, [formula, setOutput, setPrime])


  return (
    <div className="button">
      <button name="1" className="num-button" onClick={onClickNumberBtn}>1</button>
      <button name="2" className="num-button" onClick={onClickNumberBtn}>2</button>
      <button name="3" className="num-button" onClick={onClickNumberBtn}>3</button>
      <button name="add" className="oper-button" onClick={onClickAdd}>+</button>

      <br />

      <button name="4" className="num-button" onClick={onClickNumberBtn}>4</button>
      <button name="5" className="num-button" onClick={onClickNumberBtn}>5</button>
      <button name="6" className="num-button" onClick={onClickNumberBtn}>6</button>
      <button name="sub" className="oper-button" onClick={e => onClick(e.target.name)} disabled>-</button>

      <br />

      <button name="7" className="num-button" onClick={onClickNumberBtn}>7</button>
      <button name="8" className="num-button" onClick={onClickNumberBtn}>8</button>
      <button name="9" className="num-button" onClick={onClickNumberBtn}>9</button>
      <button name="multiply" className="oper-button" onClick={e => onClick(e.target.name)} disabled>*</button>

      <br />

      <button name="point" className="num-button" onClick={e => onClick(e.target.name)} disabled>.</button>
      <button name="0" className="num-button" onClick={onClickNumberBtn}>0</button>
      <button name="equal" className="equal-button" onClick={onClickEqual} disabled={formula.length === 0}>=</button>
      <button name="divide" className="oper-button" onClick={e => onClick(e.target.name)} disabled>÷</button>

      <br />

      <button name="clear" className="clear-button" onClick={onClear} disabled={numList.length === 0}>Clear</button>

      <br />

      <button name="prime" className="prime-button" onClick={onPrime} disabled={numList.length === 0 || disablePrimeBtn}>Prime</button> <br />
    </div>
  )
}

export default Buttons;
