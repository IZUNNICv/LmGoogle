import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";

import Icon from "./Icon";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: 80,
        padding: 2,
        backgroundColor: "#15616D",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Tooltip title="Progetti" arrow placement="right">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "5px",
            marginTop: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            gap: 2,
            color: "white",
            borderLeft:
              location.pathname === "/progetti" ? "5px solid #E65100" : "none",
          }}
          onClick={() => navigate("/progetti")}
        >
          <Icon iconName="BackupTable" color="white" size={25} />
        </Box>
      </Tooltip>
      <Box
        sx={{
          width: "100%",
          height: "3px",
          backgroundColor: "#0F3D4C",
          my: 1.3,
          borderRadius: "2px",
        }}
      />

      <Tooltip title="Dashboard" arrow placement="right">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "5px",
            marginTop: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            gap: 2,
            color: "white",
            borderLeft:
              location.pathname === "/dashboard" ? "5px solid #E65100" : "none",
          }}
          onClick={() => navigate("/dashboard")}
        >
          <Icon iconName="Article" color="white" size={25} />
        </Box>
      </Tooltip>

      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          height: "3px",
          backgroundColor: "#0F3D4C",
          my: 1.3,
          borderRadius: "2px",
        }}
      />
    </Box>
  );
};

export default SideMenu;
