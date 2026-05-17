import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddIcon from "@mui/icons-material/Add";

import type {
    IuseFaculty_MajorsFetch,
    IuseFacultyFormFetch,
} from "../../hook/useFetchFaculty_Majors";

import { iconButtonSx } from "../../utils/faculty_major_sx";

export interface IInfo_Faculty_MajorsProps {
    Master_Faculty_Majors: IuseFaculty_MajorsFetch;
    Master_Controller: IuseFacultyFormFetch;
}

const Info_Faculty_Majors: React.FC<IInfo_Faculty_MajorsProps> = ({
    Master_Faculty_Majors,
    Master_Controller,
}) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                mt: 2,
            }}
        >
            <Card
                sx={{
                    borderRadius: "26px",
                    boxShadow: "none",
                    bgcolor: "#ffffff",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 4,
                        },
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            mb: 5,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <AccountBalanceOutlinedIcon
                                sx={{
                                    color: "#2563eb",
                                    fontSize: 28,
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                {"คณะทั้งหมด"}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack spacing={3}>
                        {Master_Faculty_Majors?.faculty_majors?.map(
                            (faculty, facultyIndex) => {
                                const isOpen =
                                    !!Master_Faculty_Majors.openRows?.[
                                        faculty.faculty_id
                                    ];

                                return (
                                    <Box key={faculty.faculty_id}>
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                md: "row",
                                            }}
                                            spacing={1.5}
                                            sx={{
                                                mb: 2.5,
                                                alignItems: {
                                                    xs: "flex-start",
                                                    md: "center",
                                                },
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
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
                                                    ({faculty.majors_count} สาขา)
                                                </Box>
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                sx={{
                                                    alignItems: "center",
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        Master_Faculty_Majors.handleOpenEditFaculty(
                                                            faculty.faculty_id
                                                        )
                                                    }
                                                    sx={iconButtonSx}
                                                >
                                                    <EditOutlinedIcon
                                                        sx={{
                                                            color: "#111827",
                                                        }}
                                                    />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() =>
                                                        Master_Controller.onClickDeleteMaster(
                                                            "faculty",
                                                            faculty.faculty_id
                                                        )
                                                    }
                                                    sx={{
                                                        borderRadius: "14px",
                                                        bgcolor: "#e11d48",
                                                        "&:hover": {
                                                            bgcolor: "#be123c",
                                                        },
                                                    }}
                                                >
                                                    <DeleteOutlineOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff",
                                                        }}
                                                    />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() =>
                                                        Master_Faculty_Majors.handleToggleRow(
                                                            faculty.faculty_id
                                                        )
                                                    }
                                                >
                                                    {isOpen ? (
                                                        <KeyboardArrowUpRoundedIcon />
                                                    ) : (
                                                        <KeyboardArrowDownRoundedIcon />
                                                    )}
                                                </IconButton>
                                            </Stack>
                                        </Stack>

                                        <Collapse
                                            in={isOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <Box
                                                sx={{
                                                    pt: 2,
                                                    pb: 1,
                                                }}
                                            >
                                                <Stack
                                                    direction={{
                                                        xs: "column",
                                                        sm: "row",
                                                    }}
                                                    spacing={1.5}
                                                    sx={{
                                                        mb: 3,
                                                        alignItems: {
                                                            xs: "flex-start",
                                                            sm: "center",
                                                        },
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={1.5}
                                                        sx={{
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <SchoolOutlinedIcon
                                                            sx={{
                                                                color: "#475569",
                                                                fontSize: 24,
                                                            }}
                                                        />

                                                        <Typography
                                                            sx={{
                                                                fontSize: 16,
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
                                                            Master_Faculty_Majors.handleOpenCreateMajor(
                                                                faculty.faculty_id
                                                            )
                                                        }
                                                        variant="outlined"
                                                        sx={{
                                                            height: 46,
                                                            px: 3,
                                                            borderRadius:
                                                                "14px",
                                                            textTransform:
                                                                "none",
                                                            fontSize: 16,
                                                            fontWeight: 600,
                                                            color: "#111827",
                                                            borderColor:
                                                                "#d7dbe3",
                                                        }}
                                                    >
                                                        เพิ่มสาขา
                                                    </Button>
                                                </Stack>

                                                <Stack spacing={2}>
                                                    {faculty.majors?.map(
                                                        (
                                                            branch,
                                                            branchIndex
                                                        ) => (
                                                            <Box
                                                                key={
                                                                    branch.major_id
                                                                }
                                                                sx={{
                                                                    minHeight: 82,
                                                                    borderRadius:
                                                                        "18px",
                                                                    bgcolor:
                                                                        "#f8fafc",
                                                                    px: 2.5,
                                                                    py: 2,
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        {
                                                                            xs: "column",
                                                                            sm: "row",
                                                                        },
                                                                    alignItems:
                                                                        {
                                                                            xs: "flex-start",
                                                                            sm: "center",
                                                                        },
                                                                    justifyContent:
                                                                        "space-between",
                                                                    gap: 2,
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: 16,
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
                                                                        {branchIndex +
                                                                            1}
                                                                        .
                                                                    </Box>

                                                                    {
                                                                        branch.major_name
                                                                    }
                                                                </Typography>

                                                                <Stack
                                                                    direction="row"
                                                                    spacing={1.5}
                                                                >
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            Master_Faculty_Majors.handleOpenEditMajor(
                                                                                branch.major_id,
                                                                                faculty.faculty_id
                                                                            )
                                                                        }
                                                                        sx={
                                                                            iconButtonSx
                                                                        }
                                                                    >
                                                                        <EditOutlinedIcon
                                                                            sx={{
                                                                                color: "#111827",
                                                                            }}
                                                                        />
                                                                    </IconButton>

                                                                    <IconButton
                                                                        onClick={() =>
                                                                            Master_Controller.onClickDeleteMaster(
                                                                                "major",
                                                                                branch.major_id
                                                                            )
                                                                        }
                                                                        sx={{
                                                                            borderRadius:
                                                                                "14px",
                                                                            bgcolor:
                                                                                "#e11d48",
                                                                            "&:hover":
                                                                                {
                                                                                    bgcolor:
                                                                                        "#be123c",
                                                                                },
                                                                        }}
                                                                    >
                                                                        <DeleteOutlineOutlinedIcon
                                                                            sx={{
                                                                                color: "#ffffff",
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                </Stack>
                                                            </Box>
                                                        )
                                                    )}
                                                </Stack>
                                            </Box>
                                        </Collapse>
                                    </Box>
                                );
                            }
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Info_Faculty_Majors;