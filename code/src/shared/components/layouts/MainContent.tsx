// MainContent.tsx
import { Box, type Theme } from '@mui/material';
import React, { type ReactNode } from 'react';

export interface IMainContentProps {
  children: ReactNode;
  isMobile: boolean;
  leftOffset?: number;   // ✅ เปลี่ยนจาก open/drawerWidth เป็นค่าชัด ๆ ที่กันพื้นที่จริง
  bottomOffset?: number;
  topOffset?: number;
}

const MainContent: React.FC<IMainContentProps> = ({
  children, isMobile, leftOffset = 0, bottomOffset = 0, topOffset = 0,
}) => {
  return (
    // <Box
    //   component="main"
    //   sx={{
    //     flexGrow: 1,
    //     minHeight: 0,
    //     height: '100%',
    //     overflowY: 'auto',
    //     p: 2,
    //     pt: topOffset || undefined,
    //     pb: bottomOffset || undefined,
    //     ml: isMobile ? 0 : `${leftOffset}px`,
    //     transition: (theme) => theme.transitions.create(['margin'], {
    //       duration: theme.transitions.duration.enteringScreen,
    //     }),
    //   }}
    // >
    <Box
      component="main"
      sx={{
        flex: '1 1 auto',     // ✅ ให้กินพื้นที่ที่เหลือ
        minWidth: 0,          // ✅ กัน text/ตารางดัน
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        p: 2,
        pt: topOffset || undefined,
        pb: bottomOffset || undefined,
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;


