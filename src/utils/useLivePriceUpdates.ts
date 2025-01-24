import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectToWebSocket } from "./api.ts";
import { updateLivePrice } from "../redux/cryptoSlice.ts";
import { RootState } from "../redux/store.ts";

const useLivePriceUpdates = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedCrypto
  );

  useEffect(() => {
    const ws = connectToWebSocket(selectedCrypto, (data) => {
      if (data[selectedCrypto]) {
        dispatch(updateLivePrice({ price: data[selectedCrypto] }));
      }
    });

    return () => {
      ws.close(); // Cleanup WebSocket connection on unmount or crypto change
    };
  }, [selectedCrypto, dispatch]);
};

export default useLivePriceUpdates;
