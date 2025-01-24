import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Menu,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { setSelectedCrypto } from "../redux/cryptoSlice.ts";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedCrypto
  );

  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleCryptoChange = (event: SelectChangeEvent) => {
    dispatch(setSelectedCrypto(event.target.value));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuAnchor(null); // Close mobile menu if open
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Title */}
        <Typography
          variant="h6"
          onClick={() => handleNavigation("/dashboard")}
          sx={{ cursor: "pointer", flexShrink: 0 }}
        >
          Crypto Dashboard
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on small screens
            gap: "16px",
          }}
        >
          <Typography
            variant="button"
            onClick={() => handleNavigation("/dashboard")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="button"
            onClick={() => handleNavigation("/overview")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            Overview
          </Typography>
          <Typography
            variant="button"
            onClick={() => handleNavigation("/history")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            History
          </Typography>
        </Box>

        {/* Mobile Menu Icon */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" }, // Show only on small screens
          }}
        >
          <IconButton
            color="inherit"
            onClick={handleMobileMenuOpen}
            sx={{ marginLeft: "auto" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Cryptocurrency Selector */}
        <Select
          value={selectedCrypto}
          onChange={handleCryptoChange}
          sx={{
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            marginLeft: { xs: "8px", sm: "16px" },
          }}
        >
          <MenuItem value="bitcoin">Bitcoin</MenuItem>
          <MenuItem value="ethereum">Ethereum</MenuItem>
          <MenuItem value="dogecoin">Dogecoin</MenuItem>
        </Select>
      </Toolbar>

      {/* Mobile Navigation Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => handleNavigation("/dashboard")}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/overview")}>
          Overview
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/history")}>
          History
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
