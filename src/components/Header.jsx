import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = ({
  loginVisible,
  label,
  expanded,
  setExpanded,
  isMobile,
  menuVisible,
  setMenuVisible,
}) => {
  const Token = localStorage.getItem("axo_token");
  const naviga = useNavigate();
  const dispatch = useDispatch();

  const nomeSoggetto = useSelector((state) => state.auth.value.nomesoggetto);
  const cognomeSoggetto = useSelector(
    (state) => state.auth.value.cognomesoggetto
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("axo_token");
    handleClose();
    naviga("/login");
  };

  const [iniziali, setIniziali] = useState("");

  useEffect(() => {
    setIniziali(
      nomeSoggetto?.charAt(0) + "." + cognomeSoggetto?.charAt(0) + "."
    );
  }, [nomeSoggetto, cognomeSoggetto]);

  const toggleExpanded = () => {
    if (!isMobile) {
      setExpanded((prev) => {
        sessionStorage.setItem("sideMenuDesktopExpanded", !prev);
        return !prev;
      });
    }
  };

  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "60px",
        backgroundColor: "#15616D",
        color: "white",
        px: 2,
      }}
    >
      <IconButton
        onClick={handleMenuToggle}
        sx={{
          color: "white",
          mr: 2,
          borderRadius: "50%",
          width: 40,
          height: 40,
        }}
      >
        {menuVisible ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
      {loginVisible && Token ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Tooltip title="Account">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32, fontSize: "0.85rem" }}>
                {iniziali}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 4,
              sx: {
                mt: 1.5,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profilo</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
