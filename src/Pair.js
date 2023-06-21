import React, { useState, useEffect } from 'react';
import './App.css';

export const Pair = (props) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [fullCurrencyList, setFullCurrencyList] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [fromCurrency, setFromCurrency] = useState('United States Dollar');
  const [toCurrency, setToCurrency] = useState('Mexican Peso');
  const [resultRate, setResultRate] = useState([]);

  const findKeyByValue = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value);
  };
  const fromConvCurrency = findKeyByValue(fullCurrencyList, fromCurrency)
  const toConvCurrency = findKeyByValue(fullCurrencyList, toCurrency)

  const host = 'api.frankfurter.app';

  useEffect(() => {
    const fetchCurrencyList = async () => {
      const response = await fetch(`https://${host}/currencies`);
      const data = await response.json();
      setFullCurrencyList(data);
      setCurrencyList(Object.values(data)); // this is so cool how the values can be saved this way in one quick line
    };
    fetchCurrencyList();
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
    fetchResultRate();
  }

  const handleFromCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setFromCurrency(selectedCurrency);
    if (selectedCurrency === toCurrency) {
      setToCurrency('');
    }
    fetchResultRate();
  };

  const handleToCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setToCurrency(selectedCurrency);
    if (selectedCurrency === fromCurrency) {
      setFromCurrency('');
    }
    fetchResultRate();
  };

  const fetchResultRate = async () => {
    const response = await fetch(`https://${host}/latest?amount=${quantity}&from=${fromConvCurrency}&to=${toConvCurrency}`)
    const data = await response.json();
    setResultRate(data)
  }

  console.log("resultRate:", resultRate.rates)
  console.log("variable name", toConvCurrency)
  console.log(typeof(resultRate))

  return (
    <div className='pair-wrapper bg-success-subtle rounded-pill'>
      <div className='pair-headline'>{quantity} {fromCurrency}(s) is {toCurrency}(s)</div>
      <div className='pair-form container'>
        <div className='row'>
          <div className='col-12 from-currency'>
            <div className="row">
              <div className="col-4">
                <div>select quantity</div>
              </div>
              <div className="col-8">
                <input type='number' className='form-control custom-input' value={quantity} onChange={handleQuantityChange} />
              </div>
            </div>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {currencyList.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            To
          </div>
          <div className='col-12 to-currency'>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              {currencyList.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            {resultRate.rates.MXN}
          </div>
        </div>
      </div>
    </div>
  );
  
};

