import { Stack, Typography, Select, MenuItem, IconButton, Box, useTheme, TablePagination } from "@mui/material";
import { useAtom } from "jotai";

import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { searchStateOwner } from "../../hook/Atom";

type Props = {
    total: number;
};

export default function OwnerPagination({ total }: Props) {
    const theme = useTheme();
    const [search, setSearch] = useAtom(searchStateOwner);

    // const pageCount = Math.max(1, Math.ceil(total / search.limit));
    // const startIndex = (search.page - 1) * search.limit + 1;
    // const endIndex = Math.min(search.page * search.limit, total);

    const pageCount = Math.max(1, Math.ceil(total / Number(search.limit)));
    const startIndex = total === 0 ? 0 : (Number(search.page) - 1) * Number(search.limit) + 1;
    const endIndex = total === 0 ? 0 : Math.min(Number(search.page) * Number(search.limit), total);

    const handleLimitChange = (event: any) => {
        setSearch((prev) => ({
            ...prev,
            limit: Number(event.target.value),
            page: 1, // reset page
        }));
    };

    const handlePrev = () => {
        if (search.page > 1) {
            setSearch((prev) => ({ ...prev, page: prev.page - 1 }));
        }
    };

    const handleNext = () => {
        if (search.page < pageCount) {
            setSearch((prev) => ({ ...prev, page: prev.page + 1 }));
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
                <Typography variant="subtitle1">
                    {startIndex} - {endIndex}
                </Typography>

                <Typography  variant="subtitle2" sx={{ color: theme.palette.onSurfaceVariant , ml: 0.5 }}>จาก {total}</Typography>

                <IconButton
                    size="small"
                    onClick={handlePrev}
                    disabled={search.page === 1}
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
                    disabled={search.page === pageCount}
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

            {/* <TablePagination
                component="div"
                count={total}
                page={search.page - 1} // zero-based
                rowsPerPage={search.limit}
                rowsPerPageOptions={[20, 50, 100]}
                onPageChange={handleNext}
                onRowsPerPageChange={handlePrev}
                labelRowsPerPage=""
                labelDisplayedRows={({ from, to, count }) => (
                    <span>
                        <strong>{from}-{to}</strong> จาก <strong>{count}</strong>
                    </span>
                )}

                //  ✅ ใช้ icon ขนาด 20x20 และ layout สวยเหมือนรูปที่ 2 
                slots={{
                    actions: {
                        previousButtonIcon: ArrowBackOutlinedIcon,
                        nextButtonIcon: ArrowForwardOutlinedIcon,
                    },
                }}
                slotProps={{
                    root: {
                        sx: (theme) => ({
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                        }),
                    },
                    toolbar: {
                        sx: {
                            width: "100%",
                            justifyContent: "space-between",
                            px: 0,
                        },
                    },
                    select: {
                        renderValue: (v: unknown) => `${v} ต่อ หน้า`,
                        sx: (theme) => ({
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            px: 2,
                            py: 0.75,
                            minWidth: 140,
                            fontWeight: 600,
                        }),
                    },
                    displayedRows: {
                        sx: { fontWeight: 500 },
                    },
                    //  ✅ ปรับขนาดและสี icon 
                    actions: {
                        previousButtonIcon: { sx: { width: 20, height: 20 } },
                        nextButtonIcon: { sx: { width: 20, height: 20 } },
                        previousButton: { sx: { '&.Mui-disabled': { opacity: 0.4 } } },
                        nextButton: { sx: { '&.Mui-disabled': { opacity: 0.4 } } },
                    },
                }}
            /> */}
        </Stack>
    );
}