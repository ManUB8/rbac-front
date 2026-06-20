import React from 'react';
import type { IuseFetchMasterStudentYearReport } from '../../hook/useFetchStudentYearReport';
import { useMasterStudentYearReportColumns } from '../columns/ColumnsStudentYearReport';
import { Box, Collapse, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export interface ITableStudentYearReportProps {
    mastercontroller: IuseFetchMasterStudentYearReport
};

const TableStudentYearReport: React.FunctionComponent<ITableStudentYearReportProps> = ({ mastercontroller }) => {
    const columns = useMasterStudentYearReportColumns(mastercontroller);

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
                            {mastercontroller.loading_student_year ? (
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
                            ) : mastercontroller.student_year_data?.length === 0 ? (
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
                                mastercontroller.student_year_data.map((row) => {
                                    const open =
                                        mastercontroller.openRows[row.faculty_id] ?? false;

                                    return (
                                        <React.Fragment key={row.faculty_id}>
                                            <TableRow hover>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.render(row)}
                                                    </TableCell>
                                                ))}
                                            </TableRow>

                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    sx={{
                                                        py: 0,
                                                        borderBottom: 0,
                                                    }}
                                                >
                                                    <Collapse
                                                        in={open}
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        <Box sx={{ p: 2 }}>
                                                            {row.majors.map((major) => (
                                                                <Box
                                                                    key={major.major_id}
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        py: 1,
                                                                        px: 2,
                                                                        borderBottom:
                                                                            "1px solid",
                                                                        borderColor:
                                                                            "divider",
                                                                    }}
                                                                >
                                                                    <Typography>
                                                                        {major.major_name}
                                                                    </Typography>

                                                                    <Typography
                                                                        sx={{ fontWeight: 700 }}
                                                                    >
                                                                        {major.count_student}
                                                                        {" คน"}
                                                                    </Typography>
                                                                </Box>
                                                            ))}
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
                </TableContainer>
            </Paper>
        </Grid>
    );
};

export default TableStudentYearReport;