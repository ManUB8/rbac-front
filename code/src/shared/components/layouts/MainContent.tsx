// MainContent.tsx
import { Box } from "@mui/material";
import React, { type ReactNode } from "react";

export interface IMainContentProps {
  children: ReactNode;
  isMobile: boolean;
  bottomOffset?: number;
  topOffset?: number;
}

const MainContent: React.FC<IMainContentProps> = ({
  children,
  isMobile,
  bottomOffset = 0,
  topOffset = 0,
}) => {
  return (
    // <Box
    //   className="main-center-container"
    //   sx={{
    //     flex: "1 1 auto",
    //     minWidth: 0,
    //     minHeight: 0,

    //     overflowY: "auto",
    //     overflowX: "hidden",

    //     px: isMobile ? 2 : 3,
    //     py: isMobile ? 2 : 3,

    //     pt: topOffset ? `${topOffset}px` : undefined,
    //     pb: bottomOffset ? `${bottomOffset + 16}px` : undefined,

    //     bgcolor: "background.default",

    //     scrollBehavior: "auto",
    //     WebkitOverflowScrolling: "touch",
    //   }}
    // >

    //   {children}
    // </Box>
    // <Box
    //   className="main-center-container"
    //   sx={{
    //     flex: "1 1 auto",
    //     minWidth: 0,
    //     minHeight: 0,
    //     overflowY: "auto",
    //     overflowX: "hidden",
    //     p: 2,
    //     bgcolor: "background.default",
    //   }}
    // >
    //   {children}
    // </Box>
    <Box
      className="main-center-container"
      sx={{
        flex: "1 1 auto",
        minWidth: 0,
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",
        p: { xs: 2, md: 3 },
        bgcolor: "background.default",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;