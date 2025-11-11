import { Line } from 'react-chartjs-2';

const TrendChart = ({ data }) => (
  <div className="chart-container">
    <Line data={data} options={{ responsive: true }} />
  </div>
);

export default TrendChart;