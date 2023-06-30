import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export const Graph = (props) => {
  
  const [toCurrency, setToCurrency] = useState('MXN');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const get15DaysAgoDate = () => {
    const today = new Date();
    const fifteenDaysAgo = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
    const year = fifteenDaysAgo.getFullYear();
    const month = String(fifteenDaysAgo.getMonth() + 1).padStart(2, '0');
    const day = String(fifteenDaysAgo.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();
  const fifteenAgo = get15DaysAgoDate();
  
  const fetchChartData = async () => {
    try {
      const host = 'api.frankfurter.app';
      const response = await fetch(`https://${host}/${fifteenAgo}..${currentDate}?from=${fromCurrency}&to=${toCurrency}`);
      const data = await response.json();
      const dates = Object.keys(data.rates);
      const rates = Object.values(data.rates).map(rate => rate[toCurrency]);

      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);
      const minRange = Math.floor(minRate) - 5;
      const maxRange = Math.ceil(maxRate) + 5;
      
      setChartData({
        labels: dates,
        datasets: [
          {
            label: `Exchange Rate (${fromCurrency} to ${toCurrency})`,
            data: rates,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });
  
      setChartOptions({
        scales: {
          y: {
            beginAtZero: false,
            min: minRange,
            max: maxRange
          }
        }
      });

    } catch(error) {
      console.error("error:", error);
    }
  }

  useEffect(() => {
    setFromCurrency(props.pairData[0]);
  }, [props.pairData[0]])

  useEffect(() => { 
    setToCurrency(props.pairData[1]);
  }, [props.pairData[1]])

  useEffect(()=> {
    fetchChartData();
  }, [fromCurrency, toCurrency])

  return (
    <div className="chart-wrapper bg-warning-subtle rounded" style={{ width: "auto", height: "auto" }}>
      <div className='chart-headline text-center'> Last 15 Days </div>
      {Object.keys(chartData).length > 0 ? (
      <Line data={chartData} options={chartOptions} />
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  )
}

