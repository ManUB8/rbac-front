import React, { type ReactNode } from "react";
import { Box } from "@mui/material";

export interface IMainContentProps {
  children: ReactNode;
}

const MainContent: React.FunctionComponent<IMainContentProps> = ({
  children,
}) => {
  return (
    <Box
      component="main"
      className="main-center-container"
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        flex: 1,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        overflowX: "clip",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;