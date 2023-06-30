import React, { useState, useEffect } from 'react';
import './App.css';

export const Pair = (props) => {

  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("United States Dollar");
  const [toCurrency, setToCurrency] = useState("Mexican Peso");
  const [fromQuantity, setFromQuantity] = useState(10);
  const [toQuantity, setToQuantity] = useState(1);

  const handleFrQuantityChange = (event) => {
    setFromQuantity(event.target.value);
  }

  const handleFromChange = (event) => {
    const selectedCurrency = event.target.value;
    setFromCurrency(selectedCurrency);
  }
 
  const handleToChange = (event) => {
    const selectedCurrency = event.target.value;
    setToCurrency(selectedCurrency);
  }

  const swapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  }

  const fetchToQuantity = async () => {
    const fromKey = Object.keys(currencyList).find(key => currencyList[key] === fromCurrency) || 'USD';
    const toKey = Object.keys(currencyList).find(key => currencyList[key] === toCurrency) || 'MXN';
    try {
      const host = 'api.frankfurter.app';
      const response = await fetch(`https://${host}/latest?amount=${fromQuantity}&from=${fromKey}&to=${toKey}`);
      const data = await response.json();
      props.dataForChart([fromKey, toKey])
      setToQuantity(data.rates[toKey]);
    } catch(error) {
      console.error("error:", error);
    }
  }

  useEffect(() => {
    fetchToQuantity();
  }, [currencyList, fromCurrency, toCurrency, fromQuantity]);

  useEffect(() => {
    setCurrencyList(props.currencyList);
  }, [props.currencyList]);

  return (
    <div className='pair-wrapper bg-success-subtle rounded'>
      <div className='pair-headline'>
        <strong>{fromQuantity}</strong> {fromCurrency}(s) is <strong>{toQuantity}</strong> {toCurrency}(s)
      </div>
      <form className='pair-form'>
        <label htmlFor='quantity-pair'>Select Amount</label>
        <input className='quantity-input' name='quantity-pair' type='number' value={fromQuantity} onChange={handleFrQuantityChange}/>
        <p></p>
        <label htmlFor='from-pair'>Convert From</label>
        <select name='from-pair' onChange={handleFromChange} value={fromCurrency}>
          {Object.values(currencyList).map(currency => (
            // *** NOTE *** Much Easier to Exclude Upon Rendering Than Updating a Whole New List on State
            currency !== toCurrency &&
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <p></p>
        <label htmlFor='to-pair'>Convert To</label>
        <select name='to-pair' onChange={handleToChange} value={toCurrency}>
          {Object.values(currencyList).map(currency => (
            // *** NOTE *** Much Easier to Exclude Upon Rendering Than Updating a Whole New List on State
            currency !== fromCurrency &&
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </form>
      <button className="btn btn-success swap-button" onClick={swapCurrencies}>Swap Currencies</button>
    </div>
  );
};



