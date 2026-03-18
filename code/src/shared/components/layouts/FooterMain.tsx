import { Box } from '@mui/material';
import React from 'react';
import '../styles/FooterMain.css';
import MenuIcon from '@mui/icons-material/Menu';

export interface IFooterMainProps {
    isMobile: boolean;
    setOpenDrawer: (open: boolean) => void;
}

const FooterMain: React.FunctionComponent<IFooterMainProps> = (props) => {
    const onClickOpen = () => {
        props.setOpenDrawer(true);
    };
    if (props.isMobile) {
        return (
            <>
            <Box className="footer-box">
                <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'space-between' }}>
                    <Box onClick={onClickOpen} sx={{ fontSize: '24px', display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                        <MenuIcon />
                    </Box>
                </Box>
            </Box>
            </>
        );
    }
};

export default FooterMain;
