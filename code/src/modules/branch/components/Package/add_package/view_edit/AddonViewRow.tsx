import React from 'react';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export interface IAddonViewRowProps {
    index: number;
    addon: any;
    priceText: string;
    serviceLabel: string;
    formatDateUnix: (unix?: number) => string;
    onRemove: () => void;
    onEdit: () => void;
};

const AddonViewRow: React.FunctionComponent<IAddonViewRowProps> = ({
    index,
    addon,
    priceText,
    serviceLabel,
    formatDateUnix,
    onRemove,
    onEdit,
}) => {

    return (
        <Grid
            size={12}
            sx={{
                mt: 2,
                pb: 3,
                borderBottom: '1px solid',
                borderColor: 'grey.200',
            }}
        >
            <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle2">{`แพ็กเกจเสริม ${index + 1}`}</Typography>

                <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                    <Button variant="text" color="error" onClick={onRemove}>
                        {'ยกเลิกแพ็กเกจ'}
                    </Button>

                    <Button
                        variant="contained"
                        color="info"
                        startIcon={<ModeEditOutlinedIcon fontSize="small" />}
                        onClick={onEdit}
                    >
                        {'แก้ไขแพ็กเกจ'}
                    </Button>
                </Box>
            </Stack>

            <Stack
                direction="row"
                spacing={3}
                sx={{ mb: 2 }}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{'แพ็กเกจเสริม'}</Typography>
                    <Typography variant="body1">{addon.package_name || '-'}</Typography>
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{'การใช้บริการ'}</Typography>
                    <Typography variant="body1">{serviceLabel}</Typography>
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{'ราคา'}</Typography>
                    <Typography variant="body1">{priceText}</Typography>
                </Box>
            </Stack>

            <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{'วันที่เริ่มใช้งาน'}</Typography>
                    <Typography variant="body1">{formatDateUnix(addon.start_at)}</Typography>
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{'วันที่สิ้นสุด'}</Typography>
                    <Typography variant="body1">{formatDateUnix(addon.end_at)}</Typography>
                </Box>
            </Stack>
        </Grid>
    );
};

export default AddonViewRow;