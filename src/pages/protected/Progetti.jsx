import React, { useMemo } from "react";
import Layout from "../../layout/Layout";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Progetti = () => {
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <Layout>
      <Box sx={{ height: "calc(100vh - 6vh)", width: "100%", p: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100% - 50px)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
            {error}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          ></Box>
        )}
      </Box>
    </Layout>
  );
};

export default Progetti;
