import { Box, Button, Divider, Grid, ListSubheader, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { SortGroup } from '../../interface/MasterSupplier.interface'; 

export interface ISortFilterProps {
    sortFilterList: SortGroup[];
    sortFilter: {
        title: string;
        value: number;
        label: string;
    };
    onChangeSort?: ((val: number) => void) | undefined;
}

const SortFilter: React.FunctionComponent<ISortFilterProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const current = React.useMemo(() => {
        for (const g of props.sortFilterList) {
            const f = g.options.find((o) => o.value === props.sortFilter.value);
            if (f) return f.label;
        }
        return props.sortFilter.label;
    }, [props.sortFilter.value, props.sortFilter.label, props.sortFilterList]);

    const handleSelect = (value: number) => {
        props.onChangeSort?.(value);
        handleClose();
    };

    return (
        <Grid sx={{ flexShrink: 0 }}>
            <Button size="large" variant="outlined" color='primary' onClick={handleOpen}  endIcon={<KeyboardArrowDownIcon />} aria-haspopup="menu" sx={{ whiteSpace: 'nowrap', gap:1, height:56 }}>
                <Typography variant="subtitle2" >
                    จัดเรียง
                </Typography>
                <Typography variant="subtitle2" fontWeight={700}>
                    {current}
                </Typography>
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            boxShadow: `
                  0px 2px 6px 2px rgba(0,0,0,0.05),
                  0px 1px 2px 0px rgba(0,0,0,0.15)
                `,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            minWidth: 188,
                            py: 1
                        }
                    }
                }}
            >
                {props.sortFilterList.map((group, gi) => (
                    <Box key={group.title}>
                        <ListSubheader disableSticky sx={{ typography: 'subtitle2', px: 2, pb: 1 }}>
                            {group.title}
                        </ListSubheader>

                        {group.options.map((opt) => (
                            <MenuItem
                                key={opt.value}
                                onClick={() => handleSelect(opt.value)}
                                selected={opt.value === props.sortFilter.value} // ✅ เช็คกับ value
                                sx={{
                                    typography: 'subtitle2',
                                    py: 1,
                                    px: 2,
                                    '&.Mui-selected': { bgcolor: 'action.selected' },
                                    '&.Mui-selected:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                {opt.label}
                            </MenuItem>
                        ))}

                        {gi !== props.sortFilterList.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                ))}
            </Menu>
        </Grid>
    );
};

export default SortFilter;
