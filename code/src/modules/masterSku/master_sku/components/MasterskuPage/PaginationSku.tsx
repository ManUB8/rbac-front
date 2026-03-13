import React from 'react';
import { searchStateSku } from '../../hook/AtomSku';
import { useAtom } from 'jotai';
import { Box, IconButton, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export interface IPaginationSkuProps {
    total: number;
};

const PaginationSku: React.FunctionComponent<IPaginationSkuProps> = ({
    total
}) => {
    const theme = useTheme();
    const [search, setSearch] = useAtom(searchStateSku);
    const pageCount = Math.max(1, Math.ceil(total / Number(search.limit)));
    const startIndex = total === 0 ? 0 : (Number(search.page) - 1) * Number(search.limit) + 1;
    const endIndex = total === 0 ? 0 : Math.min(Number(search.page) * Number(search.limit), total);

    const handleLimitChange = (event: any) => {
        setSearch((prev) => ({
            ...prev,
            limit: String(event.target.value),
            page: '1', // reset page
        }));
    };

    const handlePrev = () => {
        if (Number(search.page) > 1) {
            setSearch(prev => ({
                ...prev,
                page: String(Number(prev.page) - 1),
            }));
        }
    };

    const handleNext = () => {
        if (Number(search.page) < pageCount) {
            setSearch(prev => ({
                ...prev,
                page: String(Number(prev.page) + 1),
            }));
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ m: 1 }}

        >
            {/* Dropdown:*/}
            <Box
                sx={{
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    display: "flex",
                    height: "48px",
                    px: "16px",
                    py: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <Select
                    value={search.limit}
                    onChange={handleLimitChange}
                    variant="standard"
                    disableUnderline
                    IconComponent={() => (
                        <ArrowDownwardOutlinedIcon sx={{
                            color: theme.palette.text.primary,
                            width: 20,
                            height: 20,
                        }} />
                    )}
                    sx={{
                        "& .MuiSelect-select": { padding: 1 },
                    }}
                >
                    {[20, 50, 100].map((v) => (
                        <MenuItem key={v} value={v}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
                                {`${v} ต่อ หน้า`}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* ตัวเลขช่วง & total */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    px: 2.0,
                    py: 1.0,
                }}
            >
                <Typography variant='subtitle1'>
                    {startIndex} - {endIndex}
                </Typography>

                <Typography variant='subtitle2' sx={{ color: "onSurfaceVariant", ml: 0.5 }}>
                    จาก {new Intl.NumberFormat().format(total)}
                </Typography>

                <IconButton
                    size="small"
                    onClick={handlePrev}
                    disabled={Number(search.page) === 1}
                    sx={{
                        flexShrink: 0,
                        color: theme.palette.text.primary,
                        "&.Mui-disabled": {
                            color: theme.palette.action.disabled,
                        },
                        transition: "background 0.2s ease",
                    }}
                >
                    <ArrowBackOutlinedIcon sx={{
                        width: 20,
                        height: 20,
                    }} />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={Number(search.page) === pageCount}
                    sx={{
                        flexShrink: 0,
                        color: theme.palette.text.primary,

                        "&.Mui-disabled": {
                            color: theme.palette.action.disabled,
                        },
                        transition: "background 0.2s ease",
                    }}
                >
                    <ArrowForwardOutlinedIcon sx={{
                        width: 20,
                        height: 20,
                    }} />
                </IconButton>
            </Box>
        </Stack>
    );
};

export default PaginationSku;