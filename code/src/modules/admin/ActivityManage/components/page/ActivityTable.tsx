import React, { Activity, useState } from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Paper,
    Skeleton,
    TablePagination,
} from "@mui/material";
import type { IuseActivityFetch, IuseMasterFunctionActivityFromFetch } from "../../hook/useFetchActivity";
import { useMasterActivityColumns } from "../Table/ActivityColumns";

export interface IActivityTableProps {
    MasterActivity: IuseActivityFetch
    MasterController: IuseMasterFunctionActivityFromFetch
};

const ActivityTable: React.FunctionComponent<IActivityTableProps> = ({
    MasterActivity,
    MasterController
}) => {
    const columns = useMasterActivityColumns(MasterActivity, MasterController);

    const handleChangePage = (_event: unknown, newPage: number) => {
        MasterActivity.setSearchStateActivity((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        MasterActivity.setSearchStateActivity((prev) => ({
            ...prev,
            page: 1,
            limit: +event.target.value,
        }));
    };
    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader >
                            <TableHead
                                sx={{
                                    '& .MuiTableCell-root': (theme) => ({
                                        position: 'sticky',
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
                                            <Typography variant="subtitle2">
                                                {column.headerRender ? column.headerRender() : column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {MasterActivity.activityLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <Skeleton
                                                variant="rounded"
                                                height={40}
                                                sx={{ mb: 1, borderRadius: "8px" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ) : MasterActivity.activity_data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <Typography variant="body1">{"ไม่พบข้อมูล"}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    MasterActivity.activity_data.map((row, rowIndex) => (
                                        <TableRow
                                            key={row.activity_id}
                                            hover
                                            tabIndex={0}
                                        >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.render(row, rowIndex)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[20, 50, 100]}
                        component="div"
                        count={MasterActivity.total_activity}
                        rowsPerPage={MasterActivity.searchState.limit}
                        page={MasterActivity.searchState.page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </>
    )
};

export default ActivityTable;