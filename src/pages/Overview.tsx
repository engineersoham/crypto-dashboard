import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { fetchOverviewData } from "../utils/api.ts";
import { setOverviewData } from "../redux/cryptoSlice.ts";

const Overview: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedCrypto
  );
  const overviewData = useSelector(
    (state: RootState) => state.crypto.overviewData
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOverviewData(selectedCrypto);
      dispatch(
        setOverviewData({
          marketCap: data.market_data.market_cap.usd,
          totalSupply: data.market_data.total_supply,
          circulatingSupply: data.market_data.circulating_supply,
          allTimeHigh: data.market_data.ath.usd,
          rank: data.market_cap_rank,
          description: data.description.en,
        })
      );
    };

    fetchData();
  }, [dispatch, selectedCrypto]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Overview</h1>
      {overviewData ? (
        <div>
          <p>Market Cap: ${overviewData.marketCap.toLocaleString()}</p>
          <p>
            Total Supply: {overviewData.totalSupply?.toLocaleString() || "N/A"}
          </p>
          <p>
            Circulating Supply:{" "}
            {overviewData.circulatingSupply?.toLocaleString() || "N/A"}
          </p>
          <p>All-Time High: ${overviewData.allTimeHigh.toFixed(2)}</p>
          <p>Rank: {overviewData.rank}</p>
          <div style={{ marginTop: "16px" }}>
            <h2>Description:</h2>
            <p
              style={{ lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: overviewData.description }}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Overview;
