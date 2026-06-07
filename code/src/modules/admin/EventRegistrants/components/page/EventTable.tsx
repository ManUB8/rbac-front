import React from 'react';
import { type IuseFetchEventRegistrants } from '../../hook/useFetchEventRegistrants';
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
import { useMasterEventColumns } from '../Table/EventColumns';

export interface IEventTableProps {
    mastercontroller: IuseFetchEventRegistrants
};

const EventTable: React.FunctionComponent<IEventTableProps> = ({
    mastercontroller
}) => {
    const columns = useMasterEventColumns(mastercontroller);

    const handleChangePage = (
        _event: unknown,
        newPage: number
    ) => {
        mastercontroller.setSearchStateEventRegistrants((prev) => ({
            ...prev,
            page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        mastercontroller.setSearchStateEventRegistrants((prev) => ({
            ...prev,
            page: 1,
            limit: +event.target.value,
        }));
    };

    

    return (
        <Grid
            container
            spacing={2}
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
                        <TableHead
                            sx={{
                                "& .MuiTableCell-root": {
                                    position: "sticky",
                                    top: 0,
                                    bgcolor: "background.paper",
                                    zIndex: 1,
                                    backgroundColor: '##e8f4fd'
                                },
                            }}
                        >
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
                            {mastercontroller.event_loading ? (
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
                            ) : mastercontroller.event_data?.length === 0 ? (
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
                                mastercontroller.event_data.map((row, index) => (
                                    <TableRow
                                        key={row.student_id}
                                        hover
                                        tabIndex={0}
                                    >
                                        {columns.map((column) => (
                                            <>
                                               
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.render(row, index)}
                                                </TableCell>
                                            </>

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
                    count={mastercontroller.total_all}
                    rowsPerPage={mastercontroller.searchState.limit}
                    page={mastercontroller.searchState.page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
};

export default EventTable;