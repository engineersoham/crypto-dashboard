import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoState {
  selectedCrypto: string;
  priceData: { price: number; change: number } | null;
  historicalData: Array<any>;
  overviewData: {
    marketCap: number;
    totalSupply: number;
    circulatingSupply: number;
    allTimeHigh: number;
    rank: number;
    description: string;
  } | null;
}

const initialState: CryptoState = {
  selectedCrypto: "bitcoin",
  priceData: null,
  historicalData: [],
  overviewData: null,
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload;
    },
    setPriceData: (
      state,
      action: PayloadAction<{ price: number; change?: number }>
    ) => {
      state.priceData = {
        price: action.payload.price,
        change: action.payload.change ?? 0,
      };
    },
    setHistoricalData: (state, action: PayloadAction<Array<any>>) => {
      state.historicalData = action.payload;
    },
    setOverviewData: (
      state,
      action: PayloadAction<CryptoState["overviewData"]>
    ) => {
      state.overviewData = action.payload;
    },
    updateLivePrice: (state, action: PayloadAction<{ price: number }>) => {
      if (state.priceData) {
        state.priceData.price = action.payload.price;
      }
    },
  },
});

export const {
  setSelectedCrypto,
  setPriceData,
  setHistoricalData,
  setOverviewData,
  updateLivePrice,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
