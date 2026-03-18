import { AppBar, Button, FormControlLabel, IconButton, Switch, Toolbar, Typography, type Theme } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from 'jotai';
import { colorModeAtom } from '../../store/themeAtom';
import { useAuth } from '../../../modules/auth/index';

export interface IHeaderProps {
    isMobile: boolean;
    toggleDrawer: () => void;
    open: boolean;
    drawerWidth: number;
    theme: Theme;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const { handleLogOut } = useAuth();
    const [modeTheme, setModeTheme] = useAtom(colorModeAtom);
    const handleChangeTheme = () => {
        const newTheme = modeTheme == 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setModeTheme(newTheme);
    };
    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{
                    ml: !props.isMobile && props.open ? `${props.drawerWidth}px` : 0,
                    transition: props.theme.transitions.create(['margin', 'width'], {
                        duration: props.theme.transitions.duration.enteringScreen
                    })
                }}
            >
                <IconButton edge="start" color="inherit" onClick={props.toggleDrawer}>
                    <MenuIcon />
                </IconButton>

                <FormControlLabel control={<Switch checked={modeTheme === 'dark'} onChange={handleChangeTheme} />} label={modeTheme === 'dark' ? 'Dark' : 'Light'} labelPlacement="top" />
                <Button color="inherit" onClick={handleLogOut}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
