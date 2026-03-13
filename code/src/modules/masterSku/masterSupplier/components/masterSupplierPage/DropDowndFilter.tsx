import React from 'react';
import { Box, Button, Checkbox, Divider, Grid, ListItemButton, ListItemText, ListSubheader, Menu, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { DropDownOption } from '../../interface/MasterSupplier.interface';

export interface IGroupFilterProps {
    groupFilterList: DropDownOption[];
    selectGroup: number[];
    onChange: (next: number[]) => void;
    label: string;
}

const DropDownFilter: React.FunctionComponent<IGroupFilterProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const allValues = React.useMemo(() => props.groupFilterList.map((g) => g.value), [props.groupFilterList]);

    const allChecked = props.selectGroup.length === allValues.length && allValues.length > 0;
    const indeterminate = props.selectGroup.length > 0 && props.selectGroup.length < allValues.length;

    const toggleAll = () => {
        props.onChange(allChecked ? [] : allValues);
    };

    const toggleOne = (v: number) => {
        const has = props.selectGroup.includes(v);
        props.onChange(has ? props.selectGroup.filter((x) => x !== v) : [...props.selectGroup, v]);
    };

    const buttonLabel =
        props.selectGroup.length === 0
            ? ''
            : props.selectGroup.length === allValues.length
            ? 'ทั้งหมด'
            : props.selectGroup.length === 1
            ? props.groupFilterList.find((g) => g.value === props.selectGroup[0])?.label ?? 'ทั้งหมด'
            : `${props.selectGroup.length}`;

    return (
        <Grid sx={{ flexShrink: 0 }}>
            <Button size="large" variant="outlined" color='primary' sx={{height:56}} endIcon={<KeyboardArrowDownIcon />} onClick={handleOpen}>
                <Box display={'flex'} gap={1}>
                    <Typography variant="subtitle2" >
                        {props.label}
                    </Typography>
                    <Typography variant="subtitle2" textAlign={'left'} fontWeight={700} maxWidth={100} noWrap>
                        {buttonLabel}
                    </Typography>
                </Box>
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
                            borderRadius: 2,
                            overflow: 'hidden',
                            width: 200,
                            py: 1
                        }
                    }
                }}
            >
                {/* หัวข้อ: ทั้งหมด + indeterminate */}
                <Box px={1}>
                    <ListItemButton onClick={toggleAll}>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle2" sx={{ width: 116 }}>
                                    ทั้งหมด
                                </Typography>
                            }
                        />
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={allChecked}
                            onChange={toggleAll}
                            color="warning"
                            edge="end"
                            sx={{
                                '&.Mui-checked': { color: 'warning' }, // ✅ เช็คแล้วเป็นเหลือง
                                '&.MuiCheckbox-indeterminate': { color: '#FBBF14 !important' } // ✅ ขีดกลางก็เหลือง
                            }}
                        />
                    </ListItemButton>
                </Box>

                {/* รายการหมวดหมู่ */}
                <Box px={1} pb={0.5}>
                    {props.groupFilterList.map((g) => {
                        const checked = props.selectGroup.includes(g.value);
                        return (
                            <ListItemButton key={g.value} onClick={() => toggleOne(g.value)}>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                // maxWidth: 116
                                            }}
                                            title={g.label}
                                        >
                                            {g.label}
                                        </Typography>
                                    }
                                />
                                <Checkbox edge="end" checked={checked} onChange={() => toggleOne(g.value)} color="warning" />
                            </ListItemButton>
                        );
                    })}
                </Box>
            </Menu>
        </Grid>
    );
};

export default DropDownFilter;
