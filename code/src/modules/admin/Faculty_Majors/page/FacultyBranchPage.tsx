import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export interface IFacultyBranchPageProps {}

interface IBranchItem {
  id: string;
  name: string;
  student_count: number;
}

interface IFacultyItem {
  id: string;
  name: string;
  branches: IBranchItem[];
}

type DeleteMode = "faculty" | "branch" | null;

const facultyMockData: IFacultyItem[] = [
  {
    id: "f1",
    name: "คณะการจัดการธุรกิจและการเงิน",
    branches: [
      { id: "b1", name: "สาขาวิชาการตลาดดิจิทัล", student_count: 4 },
      {
        id: "b2",
        name: "สาขาวิชาเทคโนโลยีสารสนเทศเพื่อการจัดการธุรกิจ",
        student_count: 3,
      },
      {
        id: "b3",
        name: "สาขาวิชาการจัดการองค์กรธุรกิจสมัยใหม่",
        student_count: 4,
      },
      {
        id: "b4",
        name: "สาขาวิชาการจัดการธุรกิจเกมและอีสปอร์ต",
        student_count: 3,
      },
    ],
  },
  {
    id: "f2",
    name: "คณะอุตสาหกรรมบริการ",
    branches: [
      {
        id: "b5",
        name: "สาขาวิชาการจัดการการกีฬาและสุขภาพ",
        student_count: 6,
      },
      {
        id: "b6",
        name: "สาขาวิชาธุรกิจการท่องเที่ยว การโรงแรมและอีเว้นท์",
        student_count: 4,
      },
    ],
  },
  {
    id: "f3",
    name: "คณะอุตสาหกรรมสร้างสรรค์",
    branches: [
      {
        id: "b7",
        name: "สาขาวิชาอุตสาหกรรมบันเทิงสร้างสรรค์",
        student_count: 5,
      },
    ],
  },
  {
    id: "f4",
    name: "คณะวิเทศธุรกิจ",
    branches: [
      { id: "b8", name: "สาขาวิชาธุรกิจระหว่างประเทศ", student_count: 4 },
      {
        id: "b9",
        name: "สาขาวิชาภาษาต่างประเทศเพื่อธุรกิจ",
        student_count: 3,
      },
    ],
  },
  {
    id: "f5",
    name: "คณะการสื่อสารดิจิทัล",
    branches: [
      { id: "b10", name: "สาขาวิชานิเทศศาสตร์ดิจิทัล", student_count: 4 },
      {
        id: "b11",
        name: "สาขาวิชาการออกแบบสื่อสร้างสรรค์",
        student_count: 3,
      },
    ],
  },
  {
    id: "f6",
    name: "คณะนิติศาสตร์และการปกครอง",
    branches: [
      { id: "b12", name: "สาขาวิชานิติศาสตร์", student_count: 4 },
      { id: "b13", name: "สาขาวิชารัฐประศาสนศาสตร์", student_count: 4 },
    ],
  },
  {
    id: "f7",
    name: "คณะศึกษาศาสตร์",
    branches: [
      { id: "b14", name: "สาขาวิชาการศึกษาปฐมวัย", student_count: 3 },
      { id: "b15", name: "สาขาวิชาพลศึกษา", student_count: 4 },
    ],
  },
];

const iconButtonSx = {
  width: 56,
  height: 46,
  borderRadius: "14px",
  border: "1px solid #d7dbe3",
  backgroundColor: "#ffffff",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    fontSize: 18,
    height: 58,
    "& fieldset": {
      borderColor: "#cbd5e1",
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0f172a",
      borderWidth: "1px",
    },
  },
};

const FacultyBranchPage: React.FunctionComponent<
  IFacultyBranchPageProps
> = () => {
  const [facultyList, setFacultyList] =
    useState<IFacultyItem[]>(facultyMockData);
  const [expandedFacultyIds, setExpandedFacultyIds] = useState<string[]>([
    "",
  ]);

  const [openFacultyAdd, setOpenFacultyAdd] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState("");

  const [openFacultyEdit, setOpenFacultyEdit] = useState(false);
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyName, setFacultyName] = useState("");

  const [openBranchEdit, setOpenBranchEdit] = useState(false);
  const [editingBranch, setEditingBranch] = useState<{
    facultyId: string;
    branchId: string;
  } | null>(null);
  const [branchName, setBranchName] = useState("");

  const [openBranchAdd, setOpenBranchAdd] = useState(false);
  const [addingBranchFacultyId, setAddingBranchFacultyId] = useState<string | null>(null);
  const [newBranchNames, setNewBranchNames] = useState<string[]>(["", ""]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteMode, setDeleteMode] = useState<DeleteMode>(null);
  const [deletingFaculty, setDeletingFaculty] = useState<IFacultyItem | null>(
    null,
  );
  const [deletingBranch, setDeletingBranch] = useState<{
    facultyId: string;
    branch: IBranchItem;
  } | null>(null);

  const toggleExpand = (facultyId: string) => {
    setExpandedFacultyIds((prev) =>
      prev.includes(facultyId)
        ? prev.filter((id) => id !== facultyId)
        : [...prev, facultyId],
    );
  };

  const handleOpenFacultyAdd = () => {
    setNewFacultyName("");
    setOpenFacultyAdd(true);
  };

  const handleCloseFacultyAdd = () => {
    setOpenFacultyAdd(false);
    setNewFacultyName("");
  };

  const handleAddFaculty = () => {
    const trimmedName = newFacultyName.trim();
    if (!trimmedName) return;

    const newFaculty: IFacultyItem = {
      id: `f${Date.now()}`,
      name: trimmedName,
      branches: [],
    };

    setFacultyList((prev) => [...prev, newFaculty]);
    setExpandedFacultyIds((prev) => [...prev, newFaculty.id]);
    handleCloseFacultyAdd();
  };

  const handleEditFaculty = (faculty: IFacultyItem) => {
    setEditingFacultyId(faculty.id);
    setFacultyName(faculty.name);
    setOpenFacultyEdit(true);
  };

  const handleCloseFacultyEdit = () => {
    setOpenFacultyEdit(false);
    setEditingFacultyId(null);
    setFacultyName("");
  };

  const handleSaveFacultyEdit = () => {
    if (!editingFacultyId || !facultyName.trim()) return;

    setFacultyList((prev) =>
      prev.map((faculty) =>
        faculty.id === editingFacultyId
          ? {
              ...faculty,
              name: facultyName.trim(),
            }
          : faculty,
      ),
    );

    handleCloseFacultyEdit();
  };

  const handleOpenDeleteFaculty = (faculty: IFacultyItem) => {
    setDeleteMode("faculty");
    setDeletingFaculty(faculty);
    setDeletingBranch(null);
    setOpenDeleteDialog(true);
  };

  const handleAddBranch = (faculty: IFacultyItem) => {
    setAddingBranchFacultyId(faculty.id);
    setNewBranchNames(["", ""]);
    setOpenBranchAdd(true);
  };

  const handleCloseBranchAdd = () => {
    setOpenBranchAdd(false);
    setAddingBranchFacultyId(null);
    setNewBranchNames(["", ""]);
  };

  const handleChangeNewBranchName = (index: number, value: string) => {
    setNewBranchNames((prev) =>
      prev.map((item, i) => (i === index ? value : item)),
    );
  };

  const handleAddBranchInput = () => {
    setNewBranchNames((prev) => [...prev, ""]);
  };

  const handleRemoveBranchInput = (index: number) => {
    setNewBranchNames((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSaveNewBranches = () => {
    if (!addingBranchFacultyId) return;

    const cleanedBranchNames = newBranchNames
      .map((name) => name.trim())
      .filter((name) => name !== "");

    if (cleanedBranchNames.length === 0) return;

    setFacultyList((prev) =>
      prev.map((faculty) => {
        if (faculty.id !== addingBranchFacultyId) return faculty;

        const newBranches: IBranchItem[] = cleanedBranchNames.map((name, index) => ({
          id: `b${Date.now()}-${index}`,
          name,
          student_count: 0,
        }));

        return {
          ...faculty,
          branches: [...faculty.branches, ...newBranches],
        };
      }),
    );

    handleCloseBranchAdd();
  };

  const handleEditBranch = (faculty: IFacultyItem, branch: IBranchItem) => {
    setEditingBranch({
      facultyId: faculty.id,
      branchId: branch.id,
    });
    setBranchName(branch.name);
    setOpenBranchEdit(true);
  };

  const handleCloseBranchEdit = () => {
    setOpenBranchEdit(false);
    setEditingBranch(null);
    setBranchName("");
  };

  const handleSaveBranchEdit = () => {
    if (!editingBranch || !branchName.trim()) return;

    setFacultyList((prev) =>
      prev.map((faculty) => {
        if (faculty.id !== editingBranch.facultyId) return faculty;

        return {
          ...faculty,
          branches: faculty.branches.map((branch) =>
            branch.id === editingBranch.branchId
              ? {
                  ...branch,
                  name: branchName.trim(),
                }
              : branch,
          ),
        };
      }),
    );

    handleCloseBranchEdit();
  };

  const handleOpenDeleteBranch = (
    faculty: IFacultyItem,
    branch: IBranchItem,
  ) => {
    setDeleteMode("branch");
    setDeletingFaculty(null);
    setDeletingBranch({
      facultyId: faculty.id,
      branch,
    });
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteMode(null);
    setDeletingFaculty(null);
    setDeletingBranch(null);
  };

  const handleConfirmDelete = () => {
    if (deleteMode === "faculty" && deletingFaculty) {
      setFacultyList((prev) =>
        prev.filter((faculty) => faculty.id !== deletingFaculty.id),
      );
      setExpandedFacultyIds((prev) =>
        prev.filter((id) => id !== deletingFaculty.id),
      );
    }

    if (deleteMode === "branch" && deletingBranch) {
      setFacultyList((prev) =>
        prev.map((faculty) => {
          if (faculty.id !== deletingBranch.facultyId) return faculty;

          return {
            ...faculty,
            branches: faculty.branches.filter(
              (branch) => branch.id !== deletingBranch.branch.id,
            ),
          };
        }),
      );
    }

    handleCloseDeleteDialog();
  };

  const deleteTitle =
    deleteMode === "faculty" ? "ยืนยันการลบคณะ?" : "ยืนยันการลบสาขา?";

  const deleteDescription =
    deleteMode === "faculty"
      ? "คุณแน่ใจหรือไม่ว่าต้องการลบคณะนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
      : "คุณแน่ใจหรือไม่ว่าต้องการลบสาขานี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้";

  const deleteTargetName =
    deleteMode === "faculty"
      ? deletingFaculty?.name || ""
      : deletingBranch?.branch.name || "";

  return (
    <>
      <Box p={1}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h4">หน้าจัดการคณะสาขา</Typography>
              <Typography sx={{ mt: 1 }}>
                เพิ่ม แก้ไข และลบข้อมูลคณะสาขา
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenFacultyAdd}
              sx={{
                height: 54,
                px: 3,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: 16,
                fontWeight: 700,
                backgroundColor: "#020617",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#111827",
                  boxShadow: "none",
                },
              }}
            >
              เพิ่มคณะ
            </Button>
          </CardContent>
        </Card>
      </Box>

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
                {facultyList.length} คณะ
              </Typography>
            </Stack>

            <Stack spacing={3}>
              {facultyList.map((faculty, facultyIndex) => {
                const isExpanded = expandedFacultyIds.includes(faculty.id);

                return (
                  <Box key={faculty.id}>
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
                        {faculty.name}
                        <Box
                          component="span"
                          sx={{
                            color: "#46658f",
                            fontWeight: 500,
                            ml: 1.5,
                          }}
                        >
                          ({faculty.branches.length} สาขา)
                        </Box>
                      </Typography>

                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <IconButton
                          onClick={() => handleEditFaculty(faculty)}
                          sx={iconButtonSx}
                        >
                          <EditOutlinedIcon sx={{ color: "#111827" }} />
                        </IconButton>

                        <IconButton
                          onClick={() => handleOpenDeleteFaculty(faculty)}
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
                          onClick={() => toggleExpand(faculty.id)}
                          sx={{
                            width: 44,
                            height: 44,
                            color: "#667085",
                          }}
                        >
                          {isExpanded ? (
                            <KeyboardArrowUpRoundedIcon />
                          ) : (
                            <KeyboardArrowDownRoundedIcon />
                          )}
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Collapse in={isExpanded}>
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
                            onClick={() => handleAddBranch(faculty)}
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
                          {faculty.branches.map((branch, branchIndex) => (
                            <Box
                              key={branch.id}
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
                                {branch.name}
                                <Box
                                  component="span"
                                  sx={{
                                    color: "#46658f",
                                    fontWeight: 500,
                                    ml: 1.5,
                                  }}
                                >
                                  ({branch.student_count} นิสิต)
                                </Box>
                              </Typography>

                              <Stack direction="row" spacing={1.5}>
                                <IconButton
                                  onClick={() =>
                                    handleEditBranch(faculty, branch)
                                  }
                                  sx={iconButtonSx}
                                >
                                  <EditOutlinedIcon sx={{ color: "#111827" }} />
                                </IconButton>

                                <IconButton
                                  onClick={() =>
                                    handleOpenDeleteBranch(faculty, branch)
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

        <Dialog
          open={openFacultyAdd}
          onClose={handleCloseFacultyAdd}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "22px",
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ pb: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  เพิ่มคณะใหม่
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  กรอกข้อมูลให้ครบถ้วน
                </Typography>
              </Box>

              <IconButton onClick={handleCloseFacultyAdd}>
                <CloseIcon sx={{ color: "#52525b" }} />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 4 }}>
            <Box>
              <Typography
                sx={{
                  mb: 1.2,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                ชื่อคณะ *
              </Typography>

              <TextField
                fullWidth
                value={newFacultyName}
                onChange={(e) => setNewFacultyName(e.target.value)}
                placeholder="เช่น คณะวิศวกรรมศาสตร์"
                sx={inputSx}
              />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseFacultyAdd}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                variant="contained"
                onClick={handleAddFaculty}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#020617",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#111827",
                    boxShadow: "none",
                  },
                }}
              >
                เพิ่ม
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openFacultyEdit}
          onClose={handleCloseFacultyEdit}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "22px",
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ pb: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  แก้ไขคณะ
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  กรอกข้อมูลให้ครบถ้วน
                </Typography>
              </Box>

              <IconButton onClick={handleCloseFacultyEdit}>
                <CloseIcon sx={{ color: "#52525b" }} />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 4 }}>
            <Box>
              <Typography
                sx={{
                  mb: 1.2,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                ชื่อคณะ *
              </Typography>

              <TextField
                fullWidth
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="กรอกชื่อคณะ"
                sx={inputSx}
              />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseFacultyEdit}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveFacultyEdit}
                sx={{
                  minWidth: 180,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#020617",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#111827",
                    boxShadow: "none",
                  },
                }}
              >
                บันทึกการแก้ไข
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openBranchAdd}
          onClose={handleCloseBranchAdd}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "22px",
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ pb: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  เพิ่มสาขาใหม่
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  กรอกข้อมูลให้ครบถ้วน
                </Typography>
              </Box>

              <IconButton onClick={handleCloseBranchAdd}>
                <CloseIcon sx={{ color: "#52525b" }} />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 4 }}>
            <Stack spacing={2.2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  ชื่อสาขา *
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  สามารถเพิ่มได้หลายสาขาพร้อมกัน
                </Typography>
              </Stack>

              {newBranchNames.map((branchValue, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <TextField
                    fullWidth
                    value={branchValue}
                    onChange={(e) =>
                      handleChangeNewBranchName(index, e.target.value)
                    }
                    placeholder={`สาขาที่ ${index + 1}`}
                    sx={inputSx}
                  />

                  <IconButton
                    onClick={() => handleRemoveBranchInput(index)}
                    sx={{
                      width: 42,
                      height: 42,
                      color: "#ef4444",
                      fontSize: 26,
                      fontWeight: 700,
                    }}
                  >
                    ×
                  </IconButton>
                </Stack>
              ))}

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddBranchInput}
                sx={{
                  height: 56,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  borderColor: "#9ca3af",
                  justifyContent: "center",
                }}
              >
                เพิ่มช่องกรอกสาขา
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseBranchAdd}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveNewBranches}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#020617",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#111827",
                    boxShadow: "none",
                  },
                }}
              >
                เพิ่ม
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openBranchEdit}
          onClose={handleCloseBranchEdit}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "22px",
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ pb: 0 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  แก้ไขสาขา
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  กรอกข้อมูลให้ครบถ้วน
                </Typography>
              </Box>

              <IconButton onClick={handleCloseBranchEdit}>
                <CloseIcon sx={{ color: "#52525b" }} />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ pt: 4 }}>
            <Box>
              <Typography
                sx={{
                  mb: 1.2,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                ชื่อสาขา *
              </Typography>

              <TextField
                fullWidth
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="กรอกชื่อสาขา"
                sx={inputSx}
              />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 6 }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseBranchEdit}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                variant="contained"
                onClick={handleSaveBranchEdit}
                sx={{
                  minWidth: 180,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#020617",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#111827",
                    boxShadow: "none",
                  },
                }}
              >
                บันทึกการแก้ไข
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: "20px",
              px: { xs: 1, sm: 2 },
              py: 1.5,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#111827",
              pb: 1,
            }}
          >
            {deleteTitle}
          </DialogTitle>

          <DialogContent sx={{ pt: "8px !important" }}>
            <Typography
              sx={{
                color: "#6b7280",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              {deleteDescription}
            </Typography>

            {!!deleteTargetName && (
              <Typography
                sx={{
                  mt: 1.5,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {deleteTargetName}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseDeleteDialog}
                sx={{
                  minWidth: 110,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                variant="contained"
                onClick={handleConfirmDelete}
                sx={{
                  minWidth: 140,
                  height: 52,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#ef4444",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#dc2626",
                    boxShadow: "none",
                  },
                }}
              >
                {deleteMode === "faculty" ? "ลบคณะ" : "ลบสาขา"}
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default FacultyBranchPage;