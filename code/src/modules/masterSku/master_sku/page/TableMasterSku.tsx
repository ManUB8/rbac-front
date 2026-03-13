import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import LoadingTable from '../../../../shared/components/loading/LoadingTable';
import { useMasterSkuColumns } from '../components/MasterskuPage/TableSku';
import PaginationSku from '../components/MasterskuPage/PaginationSku';
import type { IuseMasterFunctionSkuFetch } from '../hook/useFetchMasterSku';

export interface ITableMasterSkuProps {
  masterController: IuseMasterFunctionSkuFetch
};

const TableMasterSku: React.FunctionComponent<ITableMasterSkuProps> = ({
   masterController
}) => {
    const columns = useMasterSkuColumns(masterController);
    return (
        <>
            <Grid container marginTop={2} spacing={1} >
                <Paper sx={{ width: "100%", overflow: "hidden", m: "auto" }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader >
                            <TableHead
                                sx={{
                                    '& .MuiTableCell-root': (theme) => ({
                                        bgcolor: theme.palette.surfaceContainerLowest,
                                        position: 'sticky',
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
                                            <Typography variant="subtitle1">
                                                {column.headerRender ? column.headerRender() : column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {masterController.loading_sku? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <LoadingTable open={masterController.loading_sku} />
                                        </TableCell>
                                    </TableRow>
                                ) : masterController.master_sku?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <Typography variant="body1">{"ไม่พบข้อมูล"}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    masterController.master_sku.map((row) => (
                                        <TableRow
                                            key={row.master_item_id}
                                            hover
                                            tabIndex={0}
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
                    <PaginationSku total={masterController.total_sku} />
                </Paper>
            </Grid>
        </>
    );
};
export default TableMasterSku;