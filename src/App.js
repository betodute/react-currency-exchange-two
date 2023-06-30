import './App.css';
import { React, useState, useEffect } from 'react';
import { Headline } from './Headline.js'
import { Base } from './Base.js'
import { Pair } from './Pair.js'
import { Graph } from './Graph.js'
import { List } from './List.js'
import { News } from './News.js'
import { Footer } from './Footer.js'

function App() {

  const [ratesList, setRatesList] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [dataForChart, setDataForChart] = useState(["USD", "MXN"]);

  const fetchRatesList = async () => {
    try {
      const host = 'api.frankfurter.app';
      const response = await fetch(`https://${host}/latest?from=${baseCurrency}`);
      const data = await response.json();
      const rates = data.rates;
      if (!rates.hasOwnProperty(baseCurrency)) {
        rates[baseCurrency] = 1;
      }
      setRatesList(rates);
      setBaseCurrency(data.base)
    } catch (error) {
      console.error ('Error', error)
    }
  }

  const fetchCurrencyList = async () => {
    try {
      const host = 'api.frankfurter.app';
      const response = await fetch(`https://${host}/currencies`);
      const data = await response.json();
      setCurrencyList(data);
    } catch(error) {
      console.error("error:", error);
    }
  }

  useEffect(() => {
    fetchRatesList()
  }, [baseCurrency])

  useEffect(() => {
    fetchCurrencyList()
  }, [])

  return (
    <div>
      <Headline />
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <Pair currencyList={currencyList} dataForChart={setDataForChart} />
          </div>
          <div className='col-12'>
            <Graph pairData={dataForChart} />
          </div>
          <div className='col-12'>
            <Base ratesList={ratesList} currencyList={currencyList} setBaseCurrency={setBaseCurrency} baseCurrency={baseCurrency} />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <List  currencyList={currencyList} ratesList={ratesList} baseCurrency={baseCurrency} />
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
