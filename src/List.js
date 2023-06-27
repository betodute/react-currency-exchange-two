import './App.css';

export const List = (props) => {
  const { list, baseCurrency } = props;

  const filteredList = Object.entries(list).filter(([currency]) => currency !== baseCurrency);

  return (
    <div className='list-wrapper'>
      <ul>
        {filteredList.map(([currency, value]) => (
          <li key={currency}>
            {currency}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};


