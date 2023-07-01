import React, { useState, useEffect } from 'react';
import './App.css';

export const Base = (props) => {

  const [currencyList, setCurrencyList] = useState([]);
  const [ratesList, setRatesList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(props.baseCurrency);
  const [currencyName, setCurrencyName] = useState('')

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setSelectedCurrency(selectedCurrency);
    props.setBaseCurrency(selectedCurrency);
    const selectedCurrencyName = currencyList[selectedCurrency];
    setCurrencyName(selectedCurrencyName);
  };

  useEffect(() => {
    setCurrencyList(props.currencyList)
  }, [])

  useEffect(() => { 
    setRatesList(props.ratesList)
  }, [])

  useEffect(() => {
    const selectedCurrencyName = currencyList[selectedCurrency];
    setCurrencyName(selectedCurrencyName || "United States Dollar");
  }, [currencyList, selectedCurrency, currencyName]);

  const renderOptions = () => {
    const currencies = Object.keys(props.ratesList);
    const baseCurrencyIndex = currencies.indexOf(selectedCurrency);

    // This entire if condition is organizing the order in which the options are rendered
    // So that the currency selected is not on the bottom of the list

    if (baseCurrencyIndex > 0) {
      const baseCurrency = currencies[baseCurrencyIndex];
      const otherCurrencies = currencies.filter((currency) => currency !== baseCurrency);
      return [baseCurrency, ...otherCurrencies].map((currency) => (
        <option key={currency} value={currency}>
          {'1 ' + currency}
        </option>
      ));
    }

    return currencies.map((currency) => (
      <option key={currency} value={currency}>
        {'1 ' + currency}
      </option>
    ));
  };

  return (
    <div className='base-wrapper bg-success-subtle rounded'>
      <div className='base-headline'>
        Base Currency: <strong>{selectedCurrency ? "1 " + selectedCurrency : "1 USD"}</strong>
      </div>
      <div className='currency-dropdown'>
        <select onChange={handleCurrencyChange} value={selectedCurrency}>
          {renderOptions()}
        </select>
        <span className='base-currency-name'> <strong> {currencyName} </strong> </span>
      </div>
    </div>
  );
};

