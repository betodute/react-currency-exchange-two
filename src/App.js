import './App.css';
import { React, useState, useEffect } from 'react';
import { Headline } from './Headline.js'
import { Base } from './Base.js'
import { List } from './List.js'
import { News } from './News.js'
import { Footer } from './Footer.js'

function App() {

  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  const fetchRates = async () => {
    try {
      const host = 'api.frankfurter.app';
      const response = await fetch(`https://${host}/latest?from=${baseCurrency}`);
      const data = await response.json();
      const rates = data.rates;
      if (!rates.hasOwnProperty(baseCurrency)) {
        rates[baseCurrency] = 1; // Assuming the rate for the base currency is 1
      }
      setRates(rates);
      setBaseCurrency(data.base)
    } catch (error) {
      console.error ('Error', error)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [baseCurrency])

  return (
    <div>
      <Headline />
      <Base list={rates} setBaseCurrency={setBaseCurrency} baseCurrency={baseCurrency} />
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <List  list={rates} baseCurrency={baseCurrency} />
          </div>
          <div className='col-md-6'>
            <News />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
