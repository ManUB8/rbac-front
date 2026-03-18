// DrawerMenuBar.tsx
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box, Typography, Drawer, IconButton, Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { UserProfile } from "../layouts/UserProfile";
import { routesConfig } from "../../../router/router";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ENUM_VERSION } from "../Enum";
import LoGo from "../../../assets/image/logo/minilogo.svg";
import Logo_sc from "../../../assets/image/logo/logo.svg";
import LogoSC from "../../../assets/image/logo/LogoSCBlack02-long.png";
import { useAuth } from "../../../modules/auth";
import DrawerMenuBody from "./DrawerMenuBody";

export interface IDrawerMenuBarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    isMobile?: boolean;
}

const DrawerMenuBar: React.FC<IDrawerMenuBarProps> = ({ open, setOpen, isMobile = false }) => {
    const navigate = useNavigate();
    const { handleLogOut } = useAuth();

    const onClose = () => setOpen(false);

    // ✅ ปิดเมื่อเปลี่ยนหน้า
    const loc = useLocation();
    useEffect(() => { setOpen(false); }, [loc.pathname]);

    // ✅ ปิดทันทีเมื่อยืดจอ (mobile -> desktop)
    useEffect(() => {
        if (!isMobile && open) setOpen(false);
    }, [isMobile, open, setOpen]);

    const onNavigate = (path: string, _name: string) => {
        navigate(path);
        onClose();
    };

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            // ✅ ให้ Drawer อยู่เหนือ sidebar เสมอ (กันเคส zIndex เท่ากันในโปรดักชัน)
            sx={{ zIndex: (t) => t.zIndex.modal + 1 }}
            // ✅ ใช้ PaperProps (เสถียรกว่าในบาง build)
            slotProps={{
                paper: {
                    sx: {
                        height: "calc(100vh - 200px)",
                        display: "flex",
                        flexDirection: "column",
                    },
                }
            }}
            // PaperProps={{
            //     sx: {
            //         height: "calc(100vh - 200px)",
            //         display: "flex",
            //         flexDirection: "column",
            //     },
            // }}
            ModalProps={{
                keepMounted: false,       // ลด artifact เวลา resize
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <UserProfile collapsed={false} isMobile={isMobile} />
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </Box>
            <Divider />

            {/* Body (scrollable) */}
            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <DrawerMenuBody
                    onNavigate={(path, name) => {
                        navigate(path);
                        onClose(); // ปิด drawer หลังเปลี่ยนหน้า
                    }}
                />
            </Box>

            {/* Footer (sticky) */}
            <Divider />
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box onClick={handleLogOut} sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
                    <Typography sx={{ color: "#B3261E", fontSize: 16, fontWeight: 500, lineHeight: "24px" }}>
                        ออกจากระบบ :
                    </Typography>
                    <Typography sx={{ color: "#B3261E", fontSize: 16, fontWeight: 500, lineHeight: "24px" }} noWrap title={'Admin'}>
                        {'Admin'}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <img src={LogoSC} alt="logo" style={{ width: '190px', height: '30px', display: "block" }} /> */}
                    <img src={LoGo} alt="logo" style={{ width: 28, height: 34, display: "block" }} />
                    <img src={Logo_sc} alt="super" style={{ width: 94, height: 34, display: "block" }} />
                </Box>

                {/* <Typography sx={{ whiteSpace: "nowrap" }}>
                    {`Admin Version ${ENUM_VERSION}`}
                </Typography> */}
                <Typography sx={{ whiteSpace: "nowrap" }} variant="body1">{`Web Admin Version ${ENUM_VERSION}`}</Typography>
            </Box>
        </Drawer>
    );
};

export default DrawerMenuBar;