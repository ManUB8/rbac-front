import { useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router';
import { flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import type { IPackageItem } from '../../interface/PackageServices.interface';
import type { ITextPopup } from '../../../../../shared/components/popup/PopupConfirm.interface';
import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import LoadingTable from '../../../../../shared/components/loading/LoadingTable';
import { AppRoutes } from '../../../../../router/router';
import PackagePagination from '../packagepage/PackagePagination';
import { createPackageColumns } from '../Table/TablePackage';

export interface IPackageTableProps {
    packagedata: IPackageItem[]
    loading_package: boolean
    total_package: number
    setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
    reload: () => void
};

const PackageTable: React.FunctionComponent<IPackageTableProps> = ({
    packagedata,
    loading_package,
    total_package,
    reload,
    setConfirmPopup
}) => {
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    const columns = React.useMemo(
        () =>
            createPackageColumns({
                navigate,
                setConfirmPopup,
                setFlash,
                reload
            }),
        [navigate]
    );
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', m: 'auto' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="packagers">
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': (theme) => ({
                                bgcolor: theme.palette.background.paper,  // ✅ สีพื้นหัวตาราง
                                position: 'sticky',                       // กันโปร่งเวลาสกอร์ล
                                top: 0,
                            }),
                        }}
                    >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ minWidth: column.minWidth }}
                                >
                                    <Typography variant="body1">{column.label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading_package ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <LoadingTable open={loading_package} />
                                </TableCell>
                            </TableRow>
                        ) : packagedata?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="subtitle1">ไม่พบข้อมูล</Typography>
                                </TableCell>
                            </TableRow>
                        ) : ( packagedata.map((row) => (
                                <TableRow
                                    key={row.package_id}
                                    hover
                                    onClick={() => navigate(`${AppRoutes.package_services}/view/edit/${row.package_id}`)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            navigate(`${AppRoutes.package_services}/view/edit/${row.package_id}`)
                                        }
                                    }}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.render(row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <PackagePagination total={total_package}/>
        </Paper>
    )
};

export default PackageTable;