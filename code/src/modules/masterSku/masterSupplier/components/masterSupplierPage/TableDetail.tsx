import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import PackagePagination from '../../../../product&services/package_services/components/packagepage/PackagePagination';
import type { IProductItem, ISupplierItem } from '../../interface/MasterSupplier.interface';
import LoadingTable from '../../../../../shared/components/loading/LoadingTable';
import type { IuseMasterSupplier } from '../../hook/useMasterSupplier';
import Pagination from '../../../masterSetting/manageInventory/components/manageInvenPage/Pagination';

export interface ITableDetailProps {
    list: ISupplierItem[] | IProductItem[] | undefined;
    isLoad: boolean;
    total: number | undefined;
    useMasterSupplierController: IuseMasterSupplier;
}

interface IColumn {
    id: 'no' | 'code' | 'name' | 'TypeOfBusiness' | 'businessType' | 'total' | 'status' | 'saler' | 'unit' | 'mapping';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

// 👉 คอลัมน์สำหรับ Supplier
const supplierColumns: IColumn[] = [
    { id: 'code', label: 'รหัส Supplier', minWidth: 120 },
    { id: 'name', label: 'ชื่อ Supplier', minWidth: 200 },
    { id: 'TypeOfBusiness', label: 'รูปแบบกิจการ', minWidth: 160 },
    { id: 'businessType', label: 'ประเภทกิจการ', minWidth: 160 },
    { id: 'total', label: 'จำนวนสินค้า', minWidth: 120, align: 'left' },
    { id: 'status', label: 'สถานะ', minWidth: 120, align: 'center' }
];

// 👉 คอลัมน์สำหรับ Product
const productColumns: IColumn[] = [
    { id: 'name', label: 'ชื่อสินค้า', minWidth: 260 },
    { id: 'saler', label: 'ชื่อผู้ขาย', minWidth: 140, align: 'center' },
    { id: 'unit', label: 'หน่วยซื้อ/หน่วยเก็บ', minWidth: 160 },
    { id: 'mapping', label: 'Mapping', minWidth: 140, align: 'center' },
    { id: 'status', label: 'สถานะ', minWidth: 120, align: 'center' }
];

const isSupplierRow = (row: ISupplierItem | IProductItem): row is ISupplierItem => {
    return 'code' in row && 'TypeOfBusiness' in row;
};

const TableDetail: React.FunctionComponent<ITableDetailProps> = (props) => {
    const rows = props.list ?? [];

    // เลือกว่าจะใช้ columns แบบไหน จากรูปแบบ row แรก
    const activeColumns: IColumn[] = rows.length > 0 && isSupplierRow(rows[0] as ISupplierItem | IProductItem) ? supplierColumns : productColumns;

    return (
        <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', m: 'auto' }}>
                <TableContainer sx={{ maxHeight: 'calc(100vh - 360px)' }}>
                    <Table stickyHeader aria-label="packagers">
                        <TableHead
                            sx={{
                                '& .MuiTableCell-root': (theme) => ({
                                    bgcolor: theme.palette.background.paper, // ✅ สีพื้นหัวตาราง
                                    position: 'sticky', // กันโปร่งเวลาสกอร์ล
                                    top: 0
                                })
                            }}
                        >
                            <TableRow>
                                {activeColumns.map((column) => (
                                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                        <Typography variant="subtitle2">{column.label}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.isLoad ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <LoadingTable open={props.isLoad} />
                                    </TableCell>
                                </TableRow>
                            ) : props.total === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={activeColumns.length} align="center">
                                        <Typography variant="subtitle2">ไม่พบข้อมูล</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rows.map((row: any, index) => (
                                    <TableRow key={row.id} hover tabIndex={0} sx={{ cursor: 'pointer' }}>
                                        {activeColumns.map((column) => {
                                            let value: React.ReactNode = null;

                                            if (column.id === 'no') {
                                                value = index + 1;
                                            } else if (column.id === 'status') {
                                                const isActive = row.status?.value === 0;
                                                value = (
                                                    <Chip
                                                        label={row.status?.label}
                                                        sx={{
                                                            bgcolor: isActive ? '#00A78F' : '#BA1A1A',
                                                            color: '#FFFFFF',
                                                            fontSize: 16,
                                                            fontWeight: 500,
                                                            borderRadius: '4px'
                                                        }}
                                                        size="small"
                                                    />
                                                );
                                            } else {
                                                value = row[column.id];
                                            }

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Typography variant="subtitle2" fontWeight={400}>
                                                        {value}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    total={props.total || 0}
                    limit={props.useMasterSupplierController.limit}
                    page={props.useMasterSupplierController.page}
                    setlimit={props.useMasterSupplierController.setLimit}
                    setpage={props.useMasterSupplierController.setPage}
                />
            </Paper>
        </Box>
    );
};

export default TableDetail;
