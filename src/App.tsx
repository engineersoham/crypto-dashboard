import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Footer from "./components/Footer.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Overview from "./pages/Overview.tsx";
import History from "./pages/History.tsx";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flex: 1,
              paddingBottom: { xs: "60px", sm: "56px" }, // Ensure space for footer
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
