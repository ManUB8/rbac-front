import { Box } from "@mui/material";
import ArrowClose from "../../../assets/svg/arrow_menu_close.svg";
import ArrowOpen from "../../../assets/svg/arrow_menu_open.svg";
import { UserProfile } from "../layouts/UserProfile";

export default function SidebarHeader({
  collapsed, isMobile, onToggle,
}: { collapsed: boolean; isMobile: boolean; onToggle: () => void; }) {
  return (
    <Box>
      <Box sx={{ p: 1, display: "flex", justifyContent: collapsed ? "center" : "flex-end" }}>
        <Box sx={{ height: 24, cursor: "pointer" }} onClick={onToggle}>
          {collapsed ? <img src={ArrowOpen} /> : <img src={ArrowClose} />}
        </Box>
      </Box>
      <UserProfile collapsed={collapsed} isMobile={isMobile} />
    </Box>
  );
}