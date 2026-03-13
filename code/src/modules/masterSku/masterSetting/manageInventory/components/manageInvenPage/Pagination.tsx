import React from 'react';
import { Stack, Typography, Select, MenuItem, IconButton, Box, useTheme } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export interface IPackagePaginationProps {
    total: number;
    page: string;
    setpage: (value: string) => void;
    limit: string;
    setlimit: (value: string) => void;
}

const Pagination: React.FunctionComponent<IPackagePaginationProps> = ({ total, page, setpage, limit, setlimit }) => {
    const theme = useTheme();

    const pageCount = Math.max(1, Math.ceil(total / Number(limit)));
    const startIndex = total === 0 ? 0 : (Number(page) - 1) * Number(limit) + 1;
    const endIndex = total === 0 ? 0 : Math.min(Number(page) * Number(limit), total);

    const handleLimitChange = (event: SelectChangeEvent<string>) => {
        const newLimit = event.target.value; // เป็น string อยู่แล้ว
        setlimit(newLimit);
        setpage('1'); // reset page
    };

    const handlePrev = () => {
        if (Number(page) > 1) {
            setpage(String(Number(page) - 1));
        }
    };

    const handleNext = () => {
        if (Number(page) < pageCount) {
            setpage(String(Number(page) + 1));
        }
    };

    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ m: 1 }}>
            {/* Dropdown: จำนวนต่อหน้า */}
            <Box
                sx={{
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    display: 'flex',
                    height: '48px',
                    px: '16px',
                    py: '12px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <Select
                    value={limit}
                    onChange={handleLimitChange}
                    variant="standard"
                    disableUnderline
                    IconComponent={() => (
                        <ArrowDownwardOutlinedIcon
                            sx={{
                                color: theme.palette.text.primary,
                                width: 20,
                                height: 20
                            }}
                        />
                    )}
                    sx={{
                        '& .MuiSelect-select': { padding: 1 }
                    }}
                >
                    {[20, 50, 100].map((v) => (
                        <MenuItem key={v} value={String(v)}>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
                                {`${v} ต่อ หน้า`}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* ตัวเลขช่วง & total + ปุ่ม prev/next */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    px: 2.0,
                    py: 1.0,
                    gap: 1
                }}
            >
                <Typography variant="subtitle1">
                    {startIndex} - {endIndex}
                </Typography>

                <Typography variant="subtitle2" sx={{ color: '#667085', ml: 0.5 }}>
                    จาก {total}
                </Typography>

                <IconButton
                    size="small"
                    onClick={handlePrev}
                    disabled={Number(page) === 1}
                    sx={{
                        flexShrink: 0,
                        color: theme.palette.text.primary,
                        '&.Mui-disabled': {
                            color: theme.palette.action.disabled
                        },
                        transition: 'background 0.2s ease'
                    }}
                >
                    <ArrowBackOutlinedIcon sx={{ width: 20, height: 20 }} />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={Number(page) === pageCount}
                    sx={{
                        flexShrink: 0,
                        color: theme.palette.text.primary,
                        '&.Mui-disabled': {
                            color: theme.palette.action.disabled
                        },
                        transition: 'background 0.2s ease'
                    }}
                >
                    <ArrowForwardOutlinedIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
            </Box>
        </Stack>
    );
};

export default Pagination;
