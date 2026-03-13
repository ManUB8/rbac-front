import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export interface ILoadingTableProps {
  open: boolean;
}

const LoadingTable: React.FunctionComponent<ILoadingTableProps> = ({
  open,
}) => {
  if (open) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#FBBF14" }} />
        <Typography sx={{ color: "#FBBF14" }}>Loading data...</Typography>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default LoadingTable;
