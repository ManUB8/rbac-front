import React from 'react';
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { IGetAllGroupMock } from '../../interface/ManageInventory.interface';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useNavigate } from 'react-router';
import LoadingTable from '../../../../../../shared/components/loading/LoadingTable';

export interface ITableDetailProps {
    list: IGetAllGroupMock | undefined;
    isLoad: boolean;
}

const TableDetail: React.FunctionComponent<ITableDetailProps> = (props) => {
    const groups = props.list?.list ?? [];
    const [openIds, setOpenIds] = React.useState<number[]>([]);
    const navigate = useNavigate();

    const handleToggle = (id: number) => {
        setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    return (
        <Box border="none" sx={{ maxHeight: 'calc(100vh - 340px)', overflowY: 'auto' }}>
            <Table sx={{ borderCollapse: 'collapse' }} stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', bgcolor:'#F2F2F2' }}>
                            <Typography variant="subtitle1">หมวดหมู่หลัก</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', bgcolor:'#F2F2F2' }} width={'33%'}>
                            <Typography variant="subtitle1">รหัสหมวดหมู่หลัก</Typography>
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', bgcolor:'#F2F2F2' }} width={'33%'} align="center">
                            <Typography variant="subtitle1">จัดการ</Typography>
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
                    ) : props.list?.total === '0' ? (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                <Typography variant="subtitle1">ไม่พบข้อมูล</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        groups.map((g) => {
                            const isOpen = openIds.includes(g.id);

                            return (
                                <React.Fragment key={g.id}>
                                    {/* แถวหลัก */}
                                    <TableRow hover sx={{ borderBottom: 'none' }}>
                                        <TableCell sx={{ borderBottom: 'none' }}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <IconButton size="small" onClick={() => handleToggle(g.id)}>
                                                    {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                                </IconButton>
                                                <Typography variant="subtitle2">{g.goupName}</Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell sx={{ borderBottom: 'none' }}>
                                            <Typography variant="subtitle2">{g.code}</Typography>
                                        </TableCell>

                                        <TableCell sx={{ borderBottom: 'none' }} align="center">
                                            <Button onClick={() => navigate('/inventory-category/create/' + g.id)} disabled>
                                                {/* <DriveFileRenameOutlineIcon sx={{ color: '#FBBF14' }} /> */}
                                                <DriveFileRenameOutlineIcon sx={{ color: '#fbbd145e' }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* แถวย่อย */}
                                    <TableRow sx={{ borderBottom: 'none' }}>
                                        <TableCell
                                            colSpan={3}
                                            sx={{
                                                paddingBottom: 0,
                                                paddingTop: 0,
                                                p: 0,
                                                borderBottom: 'none'
                                            }}
                                        >
                                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                                <Box bgcolor={'#ffffff'} sx={{ border: 'none' }}>
                                                    <Table size="small" sx={{ borderCollapse: 'collapse' }}>
                                                        <TableHead>
                                                            <TableRow sx={{ bgcolor: '#F2F2F2', borderBottom: 'none' }}>
                                                                <TableCell sx={{ py: 0, pl: '100px', borderBottom: 'none' }}>
                                                                    <Typography variant='subtitle1'>หมวดหมู่ย่อย</Typography>
                                                                </TableCell>
                                                                <TableCell width={'40%'} sx={{ borderBottom: 'none' }}>
                                                                    <Typography variant='subtitle1'>รหัสหมวดหมู่ย่อย</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        <TableBody>
                                                            {g.subList.map((sub) => (
                                                                <TableRow key={sub.id} sx={{ borderBottom: 'none' }}>
                                                                    <TableCell sx={{ p: 0, pl: '100px', borderBottom: 'none', typography:'subtitle2' }}>{sub.name}</TableCell>
                                                                    <TableCell sx={{ borderBottom: 'none', typography:'subtitle2' }}>{sub.code}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default TableDetail;
