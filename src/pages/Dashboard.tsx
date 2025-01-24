import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { fetchPriceData, fetchHistoricalData } from "../utils/api.ts";
import { setPriceData, setHistoricalData } from "../redux/cryptoSlice.ts";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useLivePriceUpdates from "../utils/useLivePriceUpdates.ts";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedCrypto
  );
  const priceData = useSelector((state: RootState) => state.crypto.priceData);
  const historicalData = useSelector(
    (state: RootState) => state.crypto.historicalData
  );

  useLivePriceUpdates();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const price = await fetchPriceData(selectedCrypto);
        dispatch(
          setPriceData({
            price: price[selectedCrypto]?.usd || 0,
            change: price[selectedCrypto]?.usd_24h_change || 0,
          })
        );

        const historical = await fetchHistoricalData(selectedCrypto, 7);
        dispatch(setHistoricalData(historical.prices));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, selectedCrypto]);

  const chartData = {
    labels: historicalData?.map((point) =>
      new Date(point[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${selectedCrypto.toUpperCase()} Price (USD)`,
        data: historicalData?.map((point) => point[1]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  const renderPriceData = () => {
    if (priceData && typeof priceData.price === "number") {
      return (
        <div>
          <p>
            <strong>Current Price:</strong> ${priceData.price.toFixed(2)}
          </p>
          <p>
            <strong>24h Change:</strong> {priceData.change.toFixed(2)}%
          </p>
        </div>
      );
    }
    return <p>Loading price data...</p>;
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Dashboard</h1>
      {renderPriceData()}
      <h2>{selectedCrypto.toUpperCase()} Price Trend (Last 7 Days)</h2>
      {historicalData?.length > 0 ? (
        <div style={{ maxWidth: "800px", margin: "0 auto", height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Dashboard;
