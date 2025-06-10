import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import { Box } from "@mui/material";
import useDevice from "../hooks/useDevice";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const HEADER_HEIGHT = 35;
const FOOTER_HEIGHT = 55;
const Layout = ({ children, label = "Dashboard" }) => {
  const { isMobile } = useDevice();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Header fijo */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${HEADER_HEIGHT}px`,
          backgroundColor: "#fff",
          zIndex: 1000,
        }}
      >
        <Header
          loginVisible={true}
          label={label}
          expanded={expanded}
          setExpanded={setExpanded}
          isMobile={isMobile}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
      </Box>

      {/* Contenido y menú lateral */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          width: "100%",
          height:
            location.pathname === "/progetti"
              ? `calc(100vh - ${HEADER_HEIGHT}px)`
              : `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          backgroundColor: "#f5f7fa",
        }}
      >
        {/* Menú lateral compacto */}
        {menuVisible && (
          <Box
            sx={{
              backgroundColor: "#15616D",
              transition: "width 0.3s",
              width: "80px",
              height: "100%", // Esto ahora sí será 100% del contenedor ajustado arriba
              zIndex: 1200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SideMenu setExpanded={setExpanded} />
          </Box>
        )}

        {/* Contenido principal */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
