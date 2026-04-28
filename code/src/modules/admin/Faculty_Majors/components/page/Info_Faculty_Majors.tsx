import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    IconButton,
    Button,
    Collapse,
} from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddIcon from "@mui/icons-material/Add";
import type { IuseFaculty_MajorsFetch, IuseFacultyFormFetch } from '../../hook/useFetchFaculty_Majors';
import { iconButtonSx } from '../../utils/faculty_major_sx';
export interface IInfo_Faculty_MajorsProps {
    Master_Faculty_Majors: IuseFaculty_MajorsFetch
    Master_Controller: IuseFacultyFormFetch
};

const Info_Faculty_Majors: React.FunctionComponent<IInfo_Faculty_MajorsProps> = props => {
    return (<>
        <Box
            sx={{
                minHeight: "100vh",
                p: 3,
            }}
        >
            <Card
                sx={{
                    borderRadius: "26px",
                    boxShadow: "none",
                    backgroundColor: "#ffffff",
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 5 }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <AccountBalanceOutlinedIcon
                                sx={{ color: "#2563eb", fontSize: 28 }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                คณะทั้งหมด
                            </Typography>
                        </Stack>

                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 500,
                                color: "#334155",
                            }}
                        >
                            {props.Master_Faculty_Majors?.Faculty_MajorsItem_data?.length} คณะ
                        </Typography>
                    </Stack>

                    <Stack spacing={3}>
                        {props.Master_Faculty_Majors?.Faculty_MajorsItem_data?.map((faculty, facultyIndex) => {

                            return (
                                <Box key={faculty.faculty_id}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mb: 2.5 }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                                color: "#0f172a",
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "#64748b",
                                                    fontWeight: 500,
                                                    mr: 2,
                                                }}
                                            >
                                                #{facultyIndex + 1}
                                            </Box>
                                            {faculty.faculty_name}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "#46658f",
                                                    fontWeight: 500,
                                                    ml: 1.5,
                                                }}
                                            >
                                                ({faculty.majors.length} สาขา)
                                            </Box>
                                        </Typography>

                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <IconButton
                                                onClick={() =>
                                                    props.Master_Faculty_Majors.handleOpenEditFaculty(faculty.faculty_id)
                                                }
                                            >
                                                <EditOutlinedIcon sx={{ color: "#111827" }} />
                                            </IconButton>

                                            <IconButton
                                                onClick={() =>
                                                    props.Master_Controller.onClickDeleteMaster("faculty", faculty.faculty_id)
                                                }
                                                sx={{
                                                    width: 56,
                                                    height: 46,
                                                    borderRadius: "14px",
                                                    backgroundColor: "#e11d48",
                                                    "&:hover": {
                                                        backgroundColor: "#be123c",
                                                    },
                                                }}
                                            >
                                                <DeleteOutlineOutlinedIcon
                                                    sx={{ color: "#ffffff" }}
                                                />
                                            </IconButton>


                                            <IconButton
                                                onClick={() =>
                                                    props.Master_Faculty_Majors.handleToggleRow(faculty.faculty_id)
                                                }
                                            >
                                                {props.Master_Faculty_Majors.openRows?.[faculty.faculty_id] ? (
                                                    <KeyboardArrowUpRoundedIcon />
                                                ) : (
                                                    <KeyboardArrowDownRoundedIcon />
                                                )}
                                            </IconButton>
                                        </Stack>
                                    </Stack>

                                    <Collapse
                                        in={!!props.Master_Faculty_Majors.openRows?.[faculty.faculty_id]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Box sx={{ pt: 2, pb: 1 }}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ mb: 3 }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    alignItems="center"
                                                >
                                                    <SchoolOutlinedIcon
                                                        sx={{ color: "#475569", fontSize: 24 }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                            color: "#334155",
                                                        }}
                                                    >
                                                        สาขาวิชาทั้งหมด
                                                    </Typography>
                                                </Stack>

                                                <Button
                                                    startIcon={<AddIcon />}
                                                    onClick={() =>
                                                        props.Master_Faculty_Majors.handleOpenCreateMajor(faculty.faculty_id)
                                                    }
                                                    variant="outlined"
                                                    sx={{
                                                        height: 46,
                                                        px: 3,
                                                        borderRadius: "14px",
                                                        textTransform: "none",
                                                        fontSize: 16,
                                                        fontWeight: 600,
                                                        color: "#111827",
                                                        borderColor: "#d7dbe3",
                                                    }}
                                                >
                                                    เพิ่มสาขา
                                                </Button>
                                            </Stack>

                                            <Stack spacing={2}>
                                                {faculty.majors?.map((branch, branchIndex) => (
                                                    <Box
                                                        key={branch.major_id}
                                                        sx={{
                                                            minHeight: 82,
                                                            borderRadius: "18px",
                                                            backgroundColor: "#f8fafc",
                                                            px: 2.5,
                                                            py: 2,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: 18,
                                                                color: "#0f172a",
                                                                fontWeight: 700,
                                                                flex: 1,
                                                            }}
                                                        >
                                                            <Box
                                                                component="span"
                                                                sx={{
                                                                    color: "#64748b",
                                                                    fontWeight: 500,
                                                                    mr: 2,
                                                                }}
                                                            >
                                                                {branchIndex + 1}.
                                                            </Box>
                                                            {branch.major_name}
                                                        </Typography>

                                                        <Stack direction="row" spacing={1.5}>
                                                            <IconButton
                                                                onClick={() =>
                                                                    props.Master_Faculty_Majors.handleOpenEditMajor(branch.major_id,faculty.faculty_id)
                                                                }
                                                                sx={iconButtonSx}
                                                            >
                                                                <EditOutlinedIcon sx={{ color: "#111827" }} />
                                                            </IconButton>

                                                            <IconButton
                                                                onClick={() =>
                                                                    props.Master_Controller.onClickDeleteMaster("major", branch.major_id)
                                                                }
                                                                sx={{
                                                                    width: 56,
                                                                    height: 46,
                                                                    borderRadius: "14px",
                                                                    backgroundColor: "#e11d48",
                                                                    "&:hover": {
                                                                        backgroundColor: "#be123c",
                                                                    },
                                                                }}
                                                            >
                                                                <DeleteOutlineOutlinedIcon
                                                                    sx={{ color: "#ffffff" }}
                                                                />
                                                            </IconButton>
                                                        </Stack>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </Collapse>
                                </Box>
                            );
                        })}
                    </Stack>
                </CardContent>
            </Card>
        </Box>


    </>);
};
export default Info_Faculty_Majors;