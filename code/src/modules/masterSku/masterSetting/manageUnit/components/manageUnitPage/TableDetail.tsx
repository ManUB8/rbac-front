import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import type { ICreatePopupMode, IGetAllUnit, IUnitItem } from '../../interface/manageUnit.interface';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LoadingTable from '../../../../../../shared/components/loading/LoadingTable';

export interface ITableDetailProps {
    getAllData: IGetAllUnit | undefined;
    handleOpenCreatePopup: (mode: ICreatePopupMode, row?: IUnitItem) => void;
    isLoad: boolean;
}

const TableDetail: React.FunctionComponent<ITableDetailProps> = (props) => {
    const rows = props.getAllData?.list ?? [];

    return (
        <Box>
            <TableContainer
                sx={{
                    maxHeight: 'calc(100vh - 280px)',
                    overflowY: 'auto'
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F2F2F2' }}>
                            <TableCell sx={{ typography: 'subtitle1', borderBottom: 'none', bgcolor: '#F2F2F2' }}>ชื่อหน่วย</TableCell>
                            <TableCell sx={{ typography: 'subtitle1', borderBottom: 'none', bgcolor: '#F2F2F2' }}>หน่วยย่อ</TableCell>
                            <TableCell align="center" sx={{ typography: 'subtitle1', borderBottom: 'none', bgcolor: '#F2F2F2' }}>
                                จัดการ
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.isLoad ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LoadingTable open={props.isLoad} />
                                </TableCell>
                            </TableRow>
                        ) : props.getAllData?.total === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="subtitle1">ไม่พบข้อมูล</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ typography: 'subtitle2', borderBottom: 'none' }}>{row.name}</TableCell>
                                    <TableCell sx={{ typography: 'subtitle2', borderBottom: 'none' }}>{row.unit}</TableCell>
                                    <TableCell align="center" sx={{ borderBottom: 'none' }}>
                                        <IconButton size="small" onClick={() => props.handleOpenCreatePopup('view', row)} disabled>
                                            {/* <DriveFileRenameOutlineIcon sx={{ color: '#FBBF14' }} /> */}
                                            <DriveFileRenameOutlineIcon sx={{ color: '#fbbd145e' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TableDetail;
