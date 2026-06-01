import React from "react";
import type { IuseMasterFunctionUser } from "../../hook/useFetchUser";
import {
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";

import { useMasterUserColumns } from "../Table/UserColumns";

export interface ITableUserProps {
    masterController: IuseMasterFunctionUser;
}

const TableUser: React.FC<ITableUserProps> = ({ masterController }) => {
    const columns = useMasterUserColumns(masterController);

    const handleChangePage = (_event: unknown, newPage: number) => {
        masterController.setSearchStateUser((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        masterController.setSearchStateUser((prev) => ({
            ...prev,
            page: 1,
            limit: Number(event.target.value),
        }));
    };

    return (
        <Grid container spacing={1} sx={{ mt: 2 }}>
            <Paper variant="outlined" sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 500, overflowX: "auto" }}>
                    <Table stickyHeader sx={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{ minWidth: column.minWidth }}
                                    >
                                        {column.headerRender ? (
                                            column.headerRender()
                                        ) : (
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 700 }}
                                            >
                                                {column.label}
                                            </Typography>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {masterController.loading_User ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Skeleton
                                            variant="rounded"
                                            height={40}
                                            sx={{ mb: 1, borderRadius: "8px" }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : masterController.User_data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography variant="body1">ไม่พบข้อมูล</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                masterController.User_data.map((row) => (
                                    <TableRow key={row.user_id} hover tabIndex={0}>
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

                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={masterController.total_User}
                    rowsPerPage={masterController.searchState.limit}
                    page={masterController.searchState.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
};

export default TableUser;