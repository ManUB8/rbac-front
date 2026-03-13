import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import Avatar from "../../../assets/svg/Avatar.svg";

interface UserProfileProps {
  collapsed: boolean;
  isMobile: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ collapsed, isMobile }) => {
  // Mobile = โชว์เต็มเสมอ
  const showText = isMobile ? true : !collapsed;

  return (
    <Menu style={{ marginTop: 8, padding: 0 }}>
      {/* <MenuItem
        style={{ padding: 0, paddingLeft: 10 }}
        icon={<img src={Avatar} alt="avatar" style={{ width: 24, height: 24 }} />}
      > */}
       <MenuItem style={{ padding: '0px', paddingLeft: '10px' }} icon={<img src={Avatar} style={{ fontSize: '24px' }} />}>
        {showText && (
          <Box sx={{ lineHeight: 1.1, width: "100%", ml: "20px" }}>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              คุณซุปเปอร์ โคโค่นัท
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#6B7274" }}>
              ร้านซุปเปอร์ โคโค่นัท
            </Typography>
          </Box>
        )}
      </MenuItem>
    </Menu>
  );
};