import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { fetchHistoricalData } from "../utils/api.ts";
import { setHistoricalData } from "../redux/cryptoSlice.ts";

const History: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedCrypto
  );
  const historicalData = useSelector(
    (state: RootState) => state.crypto.historicalData
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistoricalData(selectedCrypto);
        const formattedData = data.prices.map(
          (price: [number, number], index: number) => ({
            date: new Date(price[0]).toLocaleDateString(),
            price: price[1],
            volume: data.total_volumes[index][1],
          })
        );
        dispatch(setHistoricalData(formattedData));
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchData();
  }, [dispatch, selectedCrypto]);

  const filteredData = Array.isArray(historicalData)
    ? historicalData.filter((entry: any) => {
        return (
          entry?.date?.includes(searchTerm) ||
          entry?.price?.toString().includes(searchTerm) ||
          entry?.volume?.toString().includes(searchTerm)
        );
      })
    : [];

  return (
    <div style={{ padding: "16px" }}>
      <h1>History</h1>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search by date, price, or volume..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      {filteredData.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Price (USD)
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                24h Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry: any, index: number) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {entry.date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${entry.price.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${entry.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading or no data available...</p>
      )}
    </div>
  );
};

export default History;
