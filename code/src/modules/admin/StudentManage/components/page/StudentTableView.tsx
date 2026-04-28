import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { IuseStudentMangeFetch } from "../../hook/useFetchStudentMange";
import { useMasterStudentColumns } from "../Table/TableStudent";
import StudentFrom from "../From/StudentFrom";
import LoadingTable from "../../../../../shared/components/loading/LoadingTable";

export interface IStudentTableViewProps {
    master: IuseStudentMangeFetch;

}

const cardBorder = "#dbe3ef";
const titleColor = "#081633";
const subColor = "#64748b";

const StudentTableView: React.FunctionComponent<IStudentTableViewProps> = ({
    master,
}) => {
    const [openStudentModal, setOpenStudentModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number>(0);
    const [searchStudentId, setSearchStudentId] = useState("");
    const [searchFirstName, setSearchFirstName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");

    const onAdd = () => {
        setSelectedStudentId(0);
        setOpenStudentModal(true);
    };

    const columns = useMasterStudentColumns({
        reload: master.reload,

        onEdit: (id) => {
            setSelectedStudentId(id);
            setOpenStudentModal(true);
        },

        onClickDeleteMaster: (id) => { // ✅ เปลี่ยนชื่อ
            master.onClickDeleteMaster(id); // ✅ ต้องมีใน master
        },
    });
    const filteredStudents = master.student_data.filter((student) => {
        const matchStudentId = student.student_code
            ?.toLowerCase()
            .includes(searchStudentId.toLowerCase());

        const matchFirstName = student.first_name
            ?.toLowerCase()
            .includes(searchFirstName.toLowerCase());

        const matchLastName = student.last_name
            ?.toLowerCase()
            .includes(searchLastName.toLowerCase());

        return matchStudentId && matchFirstName && matchLastName;
    });

    return (
        <>
            <StudentFrom
                open={openStudentModal}
                id={selectedStudentId}
                facultyId={master.selectedFacultyId}
                majorId={master.selectedMajorId}
                onClose={() => setOpenStudentModal(false)}
                reload={master.reload} // ✅ เพิ่ม
            />

            <Card
                elevation={0}
                sx={{
                    borderRadius: "0px",
                    border: `1px solid ${cardBorder}`,
                    mb: 4,
                }}
            >
                <CardContent sx={{ px: 3, py: 3 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <div>
                            <Button
                                startIcon={<ArrowBackRoundedIcon />}
                                onClick={master.handleBackToBranch}
                                sx={{
                                    textTransform: "none",
                                    color: titleColor,
                                    fontWeight: 700,
                                    mb: 3,
                                    px: 0,
                                }}
                            >
                                กลับไปหน้าสาขา
                            </Button>

                            <Typography
                                sx={{
                                    fontSize: { xs: 30, md: 34 },
                                    fontWeight: 800,
                                    color: titleColor,
                                }}
                            >
                                {master.selectedMajorName}
                            </Typography>

                            <Typography sx={{ mt: 1, color: subColor, fontSize: 16 }}>
                                {master.selectedFacultyName}
                            </Typography>
                        </div>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onAdd}
                            sx={{
                                minWidth: 140,
                                height: 48,
                                borderRadius: "14px",
                                textTransform: "none",
                                fontWeight: 700,
                                backgroundColor: "#020b2a",
                                boxShadow: "none",
                            }}
                        >
                            เพิ่มนิสิต
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Card
                elevation={0}
                sx={{
                    borderRadius: "22px",
                    border: `1px solid ${cardBorder}`,
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 3 }}
                    >
                        <Stack direction="row" spacing={1.2} alignItems="center">
                            <PersonOutlineOutlinedIcon sx={{ color: "#2563eb" }} />
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                    color: titleColor,
                                }}
                            >
                                รายชื่อนิสิต
                            </Typography>
                        </Stack>

                        <Typography sx={{ fontSize: 16, color: titleColor }}>
                            แสดง {filteredStudents.length} / {master.total_student} คน
                        </Typography>
                    </Stack>

                    <Box sx={{ mb: 3 }}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            sx={{ width: "100%" }}
                        >
                            <TextField
                                fullWidth
                                // size="small"
                                placeholder="ค้นหารหัสนิสิต"
                                value={searchStudentId}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, "");
                                    setSearchStudentId(value);
                                }}
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    maxLength: 8, // (ถ้าต้องการจำกัด)
                                }}
                                sx={{
                                    maxWidth: { xs: "100%", md: 260 },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="ค้นหาชื่อ"
                                value={searchFirstName}
                                onChange={(e) => setSearchFirstName(e.target.value)}
                                sx={{
                                    maxWidth: { xs: "100%", md: 180 },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="ค้นหานามสกุล"
                                value={searchLastName}
                                onChange={(e) => setSearchLastName(e.target.value)}
                                sx={{
                                    maxWidth: { xs: "100%", md: 180 },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "16px",
                                        backgroundColor: "#f8fafc",
                                    },
                                }}
                            />
                        </Stack>
                    </Box>

                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{ minWidth: column.minWidth }}
                                        >
                                            <Typography variant="subtitle1" fontWeight={700}>
                                                {column.headerRender ? column.headerRender() : column.label}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {master.studentLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <LoadingTable open={master.studentLoading} />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredStudents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            <Typography variant="body1">ไม่พบข้อมูล</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredStudents.map((row, index) => (
                                        <TableRow key={row.student_id} hover tabIndex={0}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.render(row, index)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    );
};

export default StudentTableView;