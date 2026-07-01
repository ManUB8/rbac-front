import { Typography } from '@mui/material';
import React from 'react';
export interface IHeader_StudentProps { };
const Header_Student: React.FunctionComponent<IHeader_StudentProps> = () => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        หน้าข้อมูลนิสิต
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          mb: 3,
        }}
      >
        กิจกรรมที่เปิดให้เข้าร่วม
      </Typography>

    </>
  );
};
export default Header_Student;
