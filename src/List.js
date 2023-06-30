import './App.css';

export const List = (props) => {
  const { currencyList, ratesList, baseCurrency } = props;

  const filteredList = Object.entries(ratesList).filter(([currency]) => currency !== baseCurrency);

  return (
    <div className='list-wrapper'>
      <ul>
        {filteredList.map(([currency, value]) => (
          <li key={currency}>
            {currency}: {value} - {currencyList[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
};


