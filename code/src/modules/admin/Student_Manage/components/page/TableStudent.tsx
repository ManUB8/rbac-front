import React from "react";
import type { IuseMasterFunctionStudent } from "../../hook/useFetchStudent";
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

import { useMasterStudentColumns } from "../Table/StudentColumns";

export interface ITableStudentProps {
    masterController: IuseMasterFunctionStudent;
}

const TableStudent: React.FC<ITableStudentProps> = ({
    masterController,
}) => {
    const columns = useMasterStudentColumns(masterController);

    const handleChangePage = (
        _event: unknown,
        newPage: number
    ) => {
        masterController.setSearchStateStudent((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        masterController.setSearchStateStudent((prev) => ({
            ...prev,
            page: 1,
            limit: +event.target.value,
        }));
    };

    return (
        <Grid
            container
            spacing={1}
            sx={{
                mt: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <TableContainer
                    sx={{
                        maxHeight: 500,
                    }}
                >
                    <Table stickyHeader>
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{
                                            minWidth: column.minWidth,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            {column.headerRender
                                                ? column.headerRender()
                                                : column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {masterController.loading_student ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        align="center"
                                    >
                                        <Skeleton
                                            variant="rounded"
                                            height={40}
                                            sx={{
                                                mb: 1,
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : masterController.student_data?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        align="center"
                                    >
                                        <Typography variant="body1">
                                            ไม่พบข้อมูล
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                masterController.student_data.map((row) => (
                                    <TableRow
                                        key={row.student_id}
                                        hover
                                        tabIndex={0}
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
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
                    count={masterController.total_student_all}
                    rowsPerPage={masterController.searchState.limit}
                    page={masterController.searchState.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
};

export default TableStudent;