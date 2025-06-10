import React from "react";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeaderIcon from "./HeaderIcon";
import { useSelector } from "react-redux";

const IconLogin = ({
  onClick = () => {},
  imgLogin = "https://placehold.co/40x40?text=G.G.",
  ariaControls,
  ariaHasPopup,
  ariaExpanded,
}) => {
  const isLogged = useSelector((state) => state.isLogged.value.logged);

  const randomInt = Math.floor(Math.random() * 101);

  const clickIcon = () => {
    onClick();
  };

  return (
    <Box
      onClick={clickIcon}
      aria-controls={ariaControls}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      sx={{ cursor: 'pointer', display: 'flex' }}
    >
      <HeaderIcon isLogged={isLogged}>
        {isLogged ? (
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundImage: "url(" + imgLogin + ")",
              backgroundSize: "cover",
              filter:
                "grayscale(100%) sepia(" +
                randomInt +
                "%) hue-rotate(" +
                randomInt +
                "deg)",
            }}
          ></Box>
        ) : (
          <AccountCircleIcon
            sx={{ fontSize: "40px" }}
          ></AccountCircleIcon>
        )}
      </HeaderIcon>
    </Box>
  );
};
export default IconLogin;
