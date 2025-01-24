import React from "react";
import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: "16px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        "@media (max-width: 600px)": {
          padding: "12px 0", // Adjust padding for smaller screens
          fontSize: "0.875rem", // Smaller text on mobile
        },
      }}
    >
      <Typography variant="body2">
        Last updated: {dayjs().format("YYYY-MM-DD HH:mm:ss")}
      </Typography>
    </Box>
  );
};

export default Footer;
