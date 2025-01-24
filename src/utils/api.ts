import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchPriceData = async (cryptoId: string) => {
  const response = await axios.get(`${BASE_URL}/simple/price`, {
    params: {
      ids: cryptoId,
      vs_currencies: "usd",
      include_24hr_change: "true",
    },
  });
  return response.data;
};

export const fetchHistoricalData = async (
  crypto: string,
  days: number = 30
) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: days,
      },
    }
  );
  return response.data;
};

export const fetchOverviewData = async (cryptoId: string) => {
  const response = await axios.get(`${BASE_URL}/coins/${cryptoId}`);
  return response.data;
};

export const connectToWebSocket = (
  cryptoId: string,
  onMessage: (data: any) => void
) => {
  const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${cryptoId}`);

  ws.onopen = () => {
    console.log(`WebSocket connected for ${cryptoId}`);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket Message:", data);
    onMessage(data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return ws;
};
