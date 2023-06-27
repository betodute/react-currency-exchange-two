import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Graph = () => {
  
  const data = {
    labels: ["Red", "Danger", "Blue", "Happy"],
    datasets: [
      {
        data: [10, 20, 30, 40], // Example data values
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB", "#FF9F40"], // Example background colors
        hoverBackgroundColor: ["#FF6384", "#FFCE56", "#36A2EB", "#FF9F40"], // Example hover colors
      },
    ],
  };

  return (
    <div className="chart-wrapper bg-warning-subtle rounded" style={{ width: "630px", height: "700px" }}>
      <div className='chart-headline text-center'> Historical Data </div>
      <Doughnut data={data} />
    </div>
  )
}

