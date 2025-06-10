import React from "react";
import {
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Typography,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"; // <-- Nuevo icono
import SaveIcon from "@mui/icons-material/Save";
// Ahora Footer recibe onAddPage y onOffPage como props
const Footer = ({
  tab,
  setTab,
  orientation,
  setOrientation,
  handleZoomIn,
  handleZoomOut,
  pageCount = 3,
  onAddPage, // Para agregar páginas
  onOffPage, // Para eliminar páginas
}) => {
  return (
    <Box sx={{ width: "100%", height: "100%", marginTop: 2 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Stack direction="row" spacing={1} alignItems="center">
            <Pagination
              count={pageCount}
              page={tab + 1}
              onChange={(_, value) => setTab(value - 1)}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
              showFirstButton
              showLastButton
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={onAddPage}
              sx={{ minWidth: 0, px: 1 }}
            >
              Aggiungi pagina
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RemoveIcon />}
              onClick={onOffPage}
              sx={{ minWidth: 0, px: 1 }}
              disabled={pageCount <= 1}
            >
              Elimina pagina
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SaveIcon />}
              //onClick={onOffPage} --> implemetare per il salvataggio
              sx={{ minWidth: 0, px: 1 }}
            >
              SALVA
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={orientation}
            exclusive
            onChange={(e, val) => val && setOrientation(val)}
            size="small"
          >
            <ToggleButton value="portrait">Verticale</ToggleButton>
            <ToggleButton value="landscape">Orizzontale</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        </Grid>
        <Grid item>
          <Box display="flex" gap={1} ml={1}>
            <Button variant="contained" onClick={handleZoomOut}>
              -
            </Button>
            <Button variant="contained" onClick={handleZoomIn}>
              +
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
