import React, { useEffect } from 'react';
import { Box, Button, Checkbox, Collapse, Grid, ListItemButton, ListItemText, Menu, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { IGroupFilter } from '../../interface/MasterSupplier.interface';

export interface IDropDownGroupFilterProps {
    groupFilterList: IGroupFilter[];
    selectGroup: number[];
    onChange: (next: number[]) => void;
    label: string;
}

const DropDownGroupFilter: React.FunctionComponent<IDropDownGroupFilterProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});

    useEffect(() => {
        const init: Record<string, boolean> = {};
        props.groupFilterList.forEach((g) => {
            if (openGroups[g.groupname] === undefined) {
                init[g.groupname] = false;
            } else {
                init[g.groupname] = openGroups[g.groupname];
            }
        });
        setOpenGroups(init);
    }, [props.groupFilterList]);

    const toggleGroupOpen = (name: string) => {
        setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const allValues = React.useMemo(() => props.groupFilterList.flatMap((g) => g.grouplist.map((x) => x.value)), [props.groupFilterList]);

    const allChecked = props.selectGroup.length === allValues.length && allValues.length > 0;
    const indeterminate = props.selectGroup.length > 0 && props.selectGroup.length < allValues.length;

    const toggleAll = () => {
        props.onChange(allChecked ? [] : allValues);
    };

    const toggleOne = (v: number) => {
        const has = props.selectGroup.includes(v);
        props.onChange(has ? props.selectGroup.filter((x) => x !== v) : [...props.selectGroup, v]);
    };

    const findLabelByValue = (v: number): string | undefined => {
        for (const g of props.groupFilterList) {
            const found = g.grouplist.find((x) => x.value === v);
            if (found) return found.label;
        }
        return undefined;
    };

    const buttonLabel =
        props.selectGroup.length === 0
            ? ''
            : props.selectGroup.length === allValues.length
            ? 'ทั้งหมด'
            : props.selectGroup.length === 1
            ? findLabelByValue(props.selectGroup[0]) ?? 'ทั้งหมด'
            : `${props.selectGroup.length}`;

    return (
        <Grid sx={{ flexShrink: 0 }}>
            <Button size="large" variant="outlined" color="primary" sx={{ height: 56 }} endIcon={<KeyboardArrowDownIcon />} onClick={handleOpen}>
                <Box display={'flex'} gap={1}>
                    <Typography variant="subtitle2" fontWeight={500}>
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
                            width: 260,
                            py: 1,
                            maxHeight: '70vh'
                        }
                    }
                }}
            >
                {/* แถว "ทั้งหมด" ด้านบน */}
                <Box px={1}>
                    <ListItemButton onClick={toggleAll}>
                        <ListItemText primary={<Typography variant="subtitle2">ทั้งหมด</Typography>} />
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={allChecked}
                            onChange={toggleAll}
                            color="warning"
                            edge="end"
                            sx={{
                                '&.MuiCheckbox-indeterminate': { color: '#FBBF14 !important' }
                            }}
                        />
                    </ListItemButton>
                </Box>

                {/* กลุ่ม + item ข้างใน */}
                <Box px={1} pb={0.5}>
                    {props.groupFilterList.map((group) => {
                        const isOpen = openGroups[group.groupname] ?? true;
                        return (
                            <Box key={group.groupname}>
                                {/* header กลุ่ม */}
                                <ListItemButton onClick={() => toggleGroupOpen(group.groupname)}>
                                    <ListItemText primary={<Typography variant="subtitle2">{group.groupname}</Typography>} />
                                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItemButton>

                                {/* item ในกลุ่ม */}
                                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                    {group.grouplist.map((item) => {
                                        const checked = props.selectGroup.includes(item.value);
                                        const handleClickItem = () => toggleOne(item.value);
                                        const handleCheckboxClick = (e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            toggleOne(item.value);
                                        };

                                        return (
                                            <ListItemButton key={item.value} onClick={handleClickItem} sx={{ pl: 3 }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis'
                                                            }}
                                                            title={item.label}
                                                        >
                                                            {item.label}
                                                        </Typography>
                                                    }
                                                />
                                                <Checkbox edge="end" checked={checked} onClick={handleCheckboxClick} color="warning" />
                                            </ListItemButton>
                                        );
                                    })}
                                </Collapse>
                            </Box>
                        );
                    })}
                </Box>
            </Menu>
        </Grid>
    );
};

export default DropDownGroupFilter;
