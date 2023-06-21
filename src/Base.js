import React, { useState } from 'react';
import './App.css';

export const Base = (props) => {
  const [selectedCurrency, setSelectedCurrency] = useState(props.baseCurrency);

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setSelectedCurrency(selectedCurrency);
    props.setBaseCurrency(selectedCurrency);
  };

  const renderOptions = () => {
    const currencies = Object.keys(props.list);
    const baseCurrencyIndex = currencies.indexOf(selectedCurrency);

    // This entire if condition is merely dealing with the order in which the options are rendered
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
    <div className='base-wrapper bg-success-subtle rounded-pill'>
      <div className='base-headline'>
        Base Currency: <strong>{selectedCurrency ? "1 " + selectedCurrency : "1 USD"}</strong>
      </div>
      <div className='currency-dropdown'>
        <select onChange={handleCurrencyChange} value={selectedCurrency}>
          {renderOptions()}
        </select>
      </div>
    </div>
  );
};

