import React from "react";
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { useFetchYear } from "../../hook/useFetchDashboardAdmin";

export interface IYearProps { }

const Year: React.FC<IYearProps> = () => {
    const { year_data, total_stu, year_Loading } = useFetchYear();

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                สรุปจำนวนนิสิตตามคณะ / สาขา
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                จำนวนนิสิตทั้งหมด: <b>{total_stu ?? 0}</b> คน
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow >
                            {/* <TableCell sx={{ color: "text.primary", fontWeight: 700 }}>
                                คณะ
                            </TableCell> */}

                            <TableCell sx={{ color: "text.primary", fontWeight: 700 }}>
                                สาขา
                            </TableCell>

                            <TableCell
                                align="right"
                                sx={{ color: "text.primary", fontWeight: 700 }}
                            >
                                จำนวน
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {year_Loading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>
                        ) : year_data?.length ? (
                            year_data.map((faculty) =>
                                faculty.majors.map((major) => (
                                    <TableRow
                                        key={`${faculty.faculty_id}-${major.major_id}`}
                                        hover
                                    >
                                        {/* <TableCell>
                                            <Typography>
                                                {faculty.faculty_name}
                                            </Typography>
                                        </TableCell> */}

                                        <TableCell>
                                            {major.major_name}
                                        </TableCell>

                                        <TableCell align="right">
                                            {major.count_student.toLocaleString()} คน
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                                    ไม่พบข้อมูล
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Year;