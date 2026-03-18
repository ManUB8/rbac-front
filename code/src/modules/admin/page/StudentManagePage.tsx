import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

export interface IStudentManagePageProps {}

interface IStudent {
  id: number;
  student_code: string;
  first_name: string;
  last_name: string;
}

interface IBranch {
  id: string;
  name: string;
  students: IStudent[];
}

interface IFaculty {
  id: string;
  name: string;
  branches: IBranch[];
}

interface IStudentFormData {
  student_code: string;
  first_name: string;
  last_name: string;
}

type ViewMode = "faculty" | "branch" | "student";
type ModalMode = "add" | "edit";

const pageBg = "#f3f6fb";
const cardBorder = "#dbe3ef";

const initialFormData: IStudentFormData = {
  student_code: "",
  first_name: "",
  last_name: "",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
  },
};

const initialFacultyData: IFaculty[] = [
  {
    id: "f1",
    name: "คณะการจัดการธุรกิจและการเงิน",
    branches: [
      {
        id: "b1",
        name: "สาขาวิชาการตลาดดิจิทัล",
        students: [
          { id: 1, student_code: "6510001234", first_name: "สมชาย", last_name: "การตลาด" },
          { id: 2, student_code: "6510001235", first_name: "สุภารัตน์", last_name: "ดิจิทัล" },
          { id: 3, student_code: "6510001236", first_name: "วิชัย", last_name: "โซเชียล" },
          { id: 4, student_code: "6510001237", first_name: "นภัสสร", last_name: "แบรนด์" },
        ],
      },
      {
        id: "b2",
        name: "สาขาวิชาเทคโนโลยีสารสนเทศเพื่อการจัดการธุรกิจ",
        students: [
          { id: 5, student_code: "6510002231", first_name: "กิตติ", last_name: "ระบบ" },
          { id: 6, student_code: "6510002232", first_name: "อรทัย", last_name: "ข้อมูล" },
          { id: 7, student_code: "6510002233", first_name: "ธนา", last_name: "ซอฟต์แวร์" },
        ],
      },
      {
        id: "b3",
        name: "สาขาวิชาการจัดการองค์กรธุรกิจสมัยใหม่",
        students: [
          { id: 8, student_code: "6510003231", first_name: "มานะ", last_name: "องค์กร" },
          { id: 9, student_code: "6510003232", first_name: "พิมพ์ชนก", last_name: "ธุรกิจ" },
          { id: 10, student_code: "6510003233", first_name: "ศุภชัย", last_name: "บริหาร" },
          { id: 11, student_code: "6510003234", first_name: "ชุติมา", last_name: "แผนงาน" },
        ],
      },
      {
        id: "b4",
        name: "สาขาวิชาการจัดการธุรกิจเกมและอีสปอร์ต",
        students: [
          { id: 12, student_code: "6510004231", first_name: "ภูมิ", last_name: "เกม" },
          { id: 13, student_code: "6510004232", first_name: "ธนพล", last_name: "อีสปอร์ต" },
          { id: 14, student_code: "6510004233", first_name: "ศิริพร", last_name: "สตรีม" },
        ],
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
        students: [
          { id: 15, student_code: "6520001001", first_name: "ปกรณ์", last_name: "สุขภาพ" },
          { id: 16, student_code: "6520001002", first_name: "ชลธิชา", last_name: "กีฬา" },
          { id: 17, student_code: "6520001003", first_name: "ณัฐพงษ์", last_name: "ฟิตเนส" },
          { id: 18, student_code: "6520001004", first_name: "รุ่งนภา", last_name: "เวลเนส" },
          { id: 19, student_code: "6520001005", first_name: "อภิวัฒน์", last_name: "เทรน" },
          { id: 20, student_code: "6520001006", first_name: "วริษา", last_name: "โค้ช" },
        ],
      },
      {
        id: "b6",
        name: "สาขาวิชาธุรกิจการท่องเที่ยว การโรงแรมและอีเว้นท์",
        students: [
          { id: 21, student_code: "6520002001", first_name: "กมลชนก", last_name: "ท่องเที่ยว" },
          { id: 22, student_code: "6520002002", first_name: "สิรภพ", last_name: "โรงแรม" },
          { id: 23, student_code: "6520002003", first_name: "อชิรญา", last_name: "อีเว้นท์" },
          { id: 24, student_code: "6520002004", first_name: "ภาณุ", last_name: "บริการ" },
        ],
      },
      {
        id: "b7",
        name: "สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน",
        students: [
          { id: 25, student_code: "6520003001", first_name: "ภัทร", last_name: "โลจิสติกส์" },
          { id: 26, student_code: "6520003002", first_name: "เบญญา", last_name: "ซัพพลาย" },
          { id: 27, student_code: "6520003003", first_name: "กรกฎ", last_name: "คลังสินค้า" },
        ],
      },
      {
        id: "b8",
        name: "สาขาวิชาธุรกิจการบิน",
        students: [
          { id: 28, student_code: "6520004001", first_name: "กัญญาณัฐ", last_name: "การบิน" },
          { id: 29, student_code: "6520004002", first_name: "ธนกฤต", last_name: "สนามบิน" },
          { id: 30, student_code: "6520004003", first_name: "นรีรัตน์", last_name: "ลูกเรือ" },
        ],
      },
      {
        id: "b9",
        name: "สาขาวิชาภาษาอังกฤษ",
        students: [
          { id: 31, student_code: "6520005001", first_name: "จิราภรณ์", last_name: "ภาษา" },
          { id: 32, student_code: "6520005002", first_name: "ภาสกร", last_name: "อังกฤษ" },
          { id: 33, student_code: "6520005003", first_name: "วริศรา", last_name: "สื่อสาร" },
        ],
      },
      {
        id: "b10",
        name: "สาขาภาษาจีนธุรกิจ",
        students: [
          { id: 34, student_code: "6520006001", first_name: "พีรพล", last_name: "จีน" },
          { id: 35, student_code: "6520006002", first_name: "สุธิดา", last_name: "ธุรกิจจีน" },
          { id: 36, student_code: "6520006003", first_name: "รัชนี", last_name: "ล่าม" },
        ],
      },
    ],
  },
  {
    id: "f3",
    name: "คณะอุตสาหกรรมสร้างสรรค์",
    branches: [
      {
        id: "b11",
        name: "สาขาวิชาอุตสาหกรรมบันเทิงสร้างสรรค์",
        students: [
          { id: 37, student_code: "6530001001", first_name: "ณัฐวุฒิ", last_name: "ครีเอทีฟ" },
          { id: 38, student_code: "6530001002", first_name: "ปาริชาติ", last_name: "โปรดักชัน" },
          { id: 39, student_code: "6530001003", first_name: "ธนภัทร", last_name: "สื่อ" },
          { id: 40, student_code: "6530001004", first_name: "ศรันย์", last_name: "บันเทิง" },
          { id: 41, student_code: "6530001005", first_name: "พิชญา", last_name: "คอนเทนต์" },
        ],
      },
    ],
  },
  {
    id: "f4",
    name: "คณะวิเทศธุรกิจ",
    branches: [
      {
        id: "b12",
        name: "สาขาวิชาธุรกิจระหว่างประเทศ",
        students: [
          { id: 42, student_code: "6540001001", first_name: "อิทธิพล", last_name: "อินเตอร์" },
          { id: 43, student_code: "6540001002", first_name: "พรทิพย์", last_name: "ต่างประเทศ" },
          { id: 44, student_code: "6540001003", first_name: "สุเมธ", last_name: "ส่งออก" },
          { id: 45, student_code: "6540001004", first_name: "ชญานิศ", last_name: "นำเข้า" },
        ],
      },
      {
        id: "b13",
        name: "สาขาวิชาภาษาต่างประเทศเพื่อธุรกิจ",
        students: [
          { id: 46, student_code: "6540002001", first_name: "พิมลดา", last_name: "ภาษาโลก" },
          { id: 47, student_code: "6540002002", first_name: "กฤษณะ", last_name: "สื่อสารสากล" },
          { id: 48, student_code: "6540002003", first_name: "มธุรส", last_name: "เจรจา" },
        ],
      },
    ],
  },
  {
    id: "f5",
    name: "คณะการสื่อสารดิจิทัล",
    branches: [
      {
        id: "b14",
        name: "สาขาวิชานิเทศศาสตร์ดิจิทัล",
        students: [
          { id: 49, student_code: "6550001001", first_name: "เจษฎา", last_name: "นิเทศ" },
          { id: 50, student_code: "6550001002", first_name: "ศุภลักษณ์", last_name: "ดิจิทัลมีเดีย" },
          { id: 51, student_code: "6550001003", first_name: "วรัญญา", last_name: "คอนเทนต์" },
          { id: 52, student_code: "6550001004", first_name: "ก้องภพ", last_name: "วิดีโอ" },
        ],
      },
      {
        id: "b15",
        name: "สาขาวิชาการออกแบบสื่อสร้างสรรค์",
        students: [
          { id: 53, student_code: "6550002001", first_name: "ณัฐชา", last_name: "ออกแบบ" },
          { id: 54, student_code: "6550002002", first_name: "พัชรพล", last_name: "กราฟิก" },
          { id: 55, student_code: "6550002003", first_name: "ศศิธร", last_name: "โมชั่น" },
        ],
      },
    ],
  },
  {
    id: "f6",
    name: "คณะนิติศาสตร์และการปกครอง",
    branches: [
      {
        id: "b16",
        name: "สาขาวิชานิติศาสตร์",
        students: [
          { id: 56, student_code: "6560001001", first_name: "ภูวดล", last_name: "กฎหมาย" },
          { id: 57, student_code: "6560001002", first_name: "ชนิตา", last_name: "นิติ" },
          { id: 58, student_code: "6560001003", first_name: "ธนกร", last_name: "สิทธิ" },
          { id: 59, student_code: "6560001004", first_name: "ลภัสรดา", last_name: "ยุติธรรม" },
        ],
      },
      {
        id: "b17",
        name: "สาขาวิชารัฐประศาสนศาสตร์",
        students: [
          { id: 60, student_code: "6560002001", first_name: "อภิสิทธิ์", last_name: "รัฐศาสตร์" },
          { id: 61, student_code: "6560002002", first_name: "รัตนา", last_name: "ปกครอง" },
          { id: 62, student_code: "6560002003", first_name: "ณัฐพัชร์", last_name: "นโยบาย" },
          { id: 63, student_code: "6560002004", first_name: "ศิรดา", last_name: "บริหารรัฐกิจ" },
        ],
      },
    ],
  },
  {
    id: "f7",
    name: "คณะศึกษาศาสตร์",
    branches: [
      {
        id: "b18",
        name: "สาขาวิชาการศึกษาปฐมวัย",
        students: [
          { id: 64, student_code: "6570001001", first_name: "นลิน", last_name: "ปฐมวัย" },
          { id: 65, student_code: "6570001002", first_name: "พิชชานันท์", last_name: "ครูเด็ก" },
          { id: 66, student_code: "6570001003", first_name: "ภัทรา", last_name: "พัฒนาเด็ก" },
        ],
      },
      {
        id: "b19",
        name: "สาขาวิชาพลศึกษา",
        students: [
          { id: 67, student_code: "6570002001", first_name: "ธนวัฒน์", last_name: "พลศึกษา" },
          { id: 68, student_code: "6570002002", first_name: "อริสรา", last_name: "กีฬาโรงเรียน" },
          { id: 69, student_code: "6570002003", first_name: "ชิษณุพงศ์", last_name: "สุขศึกษา" },
          { id: 70, student_code: "6570002004", first_name: "เขมจิรา", last_name: "ครูพละ" },
        ],
      },
    ],
  },
];

const StudentManagePage: React.FunctionComponent<IStudentManagePageProps> = () => {
  const [faculties, setFaculties] = useState<IFaculty[]>(initialFacultyData);
  const [viewMode, setViewMode] = useState<ViewMode>("faculty");
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<IStudentFormData>(initialFormData);

  const selectedFaculty = useMemo(() => {
    return faculties.find((faculty) => faculty.id === selectedFacultyId) || null;
  }, [faculties, selectedFacultyId]);

  const selectedBranch = useMemo(() => {
    if (!selectedFaculty) return null;
    return selectedFaculty.branches.find((branch) => branch.id === selectedBranchId) || null;
  }, [selectedFaculty, selectedBranchId]);

  const handleSelectFaculty = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    setSelectedBranchId(null);
    setViewMode("branch");
  };

  const handleSelectBranch = (branchId: string) => {
    setSelectedBranchId(branchId);
    setViewMode("student");
  };

  const handleBackToFaculty = () => {
    setSelectedFacultyId(null);
    setSelectedBranchId(null);
    setViewMode("faculty");
  };

  const handleBackToBranch = () => {
    setSelectedBranchId(null);
    setViewMode("branch");
  };

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingStudentId(null);
    setFormData(initialFormData);
    setOpenStudentModal(true);
  };

  const handleOpenEditModal = (student: IStudent) => {
    setModalMode("edit");
    setEditingStudentId(student.id);
    setFormData({
      student_code: student.student_code,
      first_name: student.first_name,
      last_name: student.last_name,
    });
    setOpenStudentModal(true);
  };

  const handleCloseStudentModal = () => {
    setOpenStudentModal(false);
    setEditingStudentId(null);
    setFormData(initialFormData);
  };

  const handleSubmitStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFacultyId || !selectedBranchId) return;

    if (modalMode === "add") {
      const newStudent: IStudent = {
        id: Date.now(),
        student_code: formData.student_code,
        first_name: formData.first_name,
        last_name: formData.last_name,
      };

      setFaculties((prev) =>
        prev.map((faculty) => {
          if (faculty.id !== selectedFacultyId) return faculty;

          return {
            ...faculty,
            branches: faculty.branches.map((branch) => {
              if (branch.id !== selectedBranchId) return branch;

              return {
                ...branch,
                students: [...branch.students, newStudent],
              };
            }),
          };
        }),
      );
    }

    if (modalMode === "edit" && editingStudentId !== null) {
      setFaculties((prev) =>
        prev.map((faculty) => {
          if (faculty.id !== selectedFacultyId) return faculty;

          return {
            ...faculty,
            branches: faculty.branches.map((branch) => {
              if (branch.id !== selectedBranchId) return branch;

              return {
                ...branch,
                students: branch.students.map((student) =>
                  student.id === editingStudentId
                    ? {
                        ...student,
                        student_code: formData.student_code,
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                      }
                    : student,
                ),
              };
            }),
          };
        }),
      );
    }

    handleCloseStudentModal();
  };

  const handleDeleteStudent = (studentId: number) => {
    if (!selectedFacultyId || !selectedBranchId) return;

    setFaculties((prev) =>
      prev.map((faculty) => {
        if (faculty.id !== selectedFacultyId) return faculty;

        return {
          ...faculty,
          branches: faculty.branches.map((branch) => {
            if (branch.id !== selectedBranchId) return branch;

            return {
              ...branch,
              students: branch.students.filter((student) => student.id !== studentId),
            };
          }),
        };
      }),
    );
  };

  const renderStudentModal = () => {
    const isEditMode = modalMode === "edit";

    return (
      <Dialog
        open={openStudentModal}
        onClose={handleCloseStudentModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "18px",
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography fontSize={34} fontWeight={800} color="#0f172a">
                {isEditMode ? "แก้ไขข้อมูลนิสิต" : "เพิ่มนิสิตใหม่"}
              </Typography>
              <Typography sx={{ mt: 0.5 }} color="text.secondary">
                กรอกข้อมูลนิสิตให้ครบถ้วน
              </Typography>
            </Box>

            <IconButton onClick={handleCloseStudentModal}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Box component="form" onSubmit={handleSubmitStudent}>
            <Stack spacing={2.2}>
              <Box>
                <Typography fontWeight={700} mb={1}>
                  รหัสนิสิต *
                </Typography>
                <TextField
                  fullWidth
                  required
                  name="student_code"
                  placeholder="เช่น 6510001234"
                  value={formData.student_code}
                  onChange={handleChangeForm}
                  sx={inputSx}
                />
              </Box>

              <Box>
                <Typography fontWeight={700} mb={1}>
                  ชื่อ *
                </Typography>
                <TextField
                  fullWidth
                  required
                  name="first_name"
                  placeholder="ชื่อจริง"
                  value={formData.first_name}
                  onChange={handleChangeForm}
                  sx={inputSx}
                />
              </Box>

              <Box>
                <Typography fontWeight={700} mb={1}>
                  นามสกุล *
                </Typography>
                <TextField
                  fullWidth
                  required
                  name="last_name"
                  placeholder="นามสกุล"
                  value={formData.last_name}
                  onChange={handleChangeForm}
                  sx={inputSx}
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleCloseStudentModal}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  borderColor: "#d1d5db",
                  color: "#111827",
                }}
              >
                ยกเลิก
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  backgroundColor: "#020617",
                  boxShadow: "none",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#111827",
                    boxShadow: "none",
                  },
                }}
              >
                {isEditMode ? "บันทึกการแก้ไข" : "เพิ่มนิสิต"}
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  const renderFacultyView = () => {
    return (
      <>
        <Box p={1}>
          <Card>
            <CardContent>
              <Typography variant="h4">หน้าจัดการนิสิต</Typography>
              <Typography sx={{ mt: 1 }}>Student management page</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
            เลือกคณะ
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#64748b" }}>
            คลิกเพื่อดูสาขาวิชาและข้อมูลนิสิต
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {faculties.map((faculty) => {
            const totalBranches = faculty.branches.length;
            const totalStudents = faculty.branches.reduce(
              (sum, branch) => sum + branch.students.length,
              0,
            );

            return (
              <Card
                key={faculty.id}
                onClick={() => handleSelectFaculty(faculty.id)}
                sx={{
                  borderRadius: "18px",
                  border: `1px solid ${cardBorder}`,
                  boxShadow: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.07)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "1.15rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          mb: 5,
                        }}
                      >
                        {faculty.name}
                      </Typography>

                      <Typography sx={{ color: "#334155", mb: 1 }}>
                        จำนวนสาขา: {totalBranches} สาขา
                      </Typography>
                      <Typography sx={{ color: "#334155" }}>
                        จำนวนนิสิต: {totalStudents} คน
                      </Typography>
                    </Box>

                    <ArrowForwardIosRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </>
    );
  };

  const renderBranchView = () => {
    if (!selectedFaculty) return null;

    return (
      <>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderBottom: `1px solid ${cardBorder}`,
            mx: -2,
            mt: -2.5,
            mb: 4,
            px: 5,
            py: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleBackToFaculty}
            sx={{
              textTransform: "none",
              color: "#0f172a",
              fontWeight: 600,
              mb: 2,
              px: 0,
              minWidth: "auto",
            }}
          >
            กลับไปหน้าคณะ
          </Button>

          <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
            {selectedFaculty.name}
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#64748b" }}>
            เลือกสาขาวิชาเพื่อดูรายชื่อนิสิต
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>
            สาขาวิชาทั้งหมด
          </Typography>
          <Typography sx={{ color: "#64748b", mt: 0.5 }}>
            {selectedFaculty.branches.length} สาขา
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {selectedFaculty.branches.map((branch) => (
            <Card
              key={branch.id}
              onClick={() => handleSelectBranch(branch.id)}
              sx={{
                borderRadius: "18px",
                border: `1px solid ${cardBorder}`,
                boxShadow: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.07)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box sx={{ flex: 1, pr: 2 }}>
                    <Stack direction="row" spacing={1.2} alignItems="center">
                      <Groups2OutlinedIcon sx={{ color: "#2563eb" }} />
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        {branch.name}
                      </Typography>
                    </Stack>

                    <Typography sx={{ color: "#334155", mt: 4 }}>
                      จำนวนนิสิต: {branch.students.length} คน
                    </Typography>
                  </Box>

                  <ArrowForwardIosRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </>
    );
  };

  const renderStudentView = () => {
    if (!selectedFaculty || !selectedBranch) return null;

    return (
      <>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderBottom: `1px solid ${cardBorder}`,
            mx: -2,
            mt: -2.5,
            mb: 4,
            px: 5,
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              onClick={handleBackToBranch}
              sx={{
                textTransform: "none",
                color: "#0f172a",
                fontWeight: 600,
                mb: 2,
                px: 0,
                minWidth: "auto",
              }}
            >
              กลับไปหน้าสาขา
            </Button>

            <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
              {selectedBranch.name}
            </Typography>
            <Typography sx={{ mt: 0.5, color: "#64748b" }}>
              {selectedFaculty.name}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddModal}
            sx={{
              borderRadius: "12px",
              px: 2.5,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#020617",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#111827",
                boxShadow: "none",
              },
            }}
          >
            เพิ่มนิสิต
          </Button>
        </Box>

        <Card
          sx={{
            borderRadius: "18px",
            border: `1px solid ${cardBorder}`,
            boxShadow: "none",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonOutlineOutlinedIcon sx={{ color: "#2563eb" }} />
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    fontSize: "1.25rem",
                  }}
                >
                  รายชื่อนิสิต
                </Typography>
              </Stack>

              <Typography sx={{ color: "#334155" }}>
                ทั้งหมด {selectedBranch.students.length} คน
              </Typography>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>ลำดับ</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>รหัสนิสิต</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>ชื่อ</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>นามสกุล</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      จัดการ
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedBranch.students.map((student, index) => (
                    <TableRow key={student.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.student_code}</TableCell>
                      <TableCell>{student.first_name}</TableCell>
                      <TableCell>{student.last_name}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton
                            onClick={() => handleOpenEditModal(student)}
                            sx={{
                              width: 36,
                              height: 36,
                              border: "1px solid #e5e7eb",
                              borderRadius: "10px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 18, color: "#111827" }} />
                          </IconButton>

                          <IconButton
                            onClick={() => handleDeleteStudent(student.id)}
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "10px",
                              backgroundColor: "#e11d48",
                              "&:hover": {
                                backgroundColor: "#be123c",
                              },
                            }}
                          >
                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18, color: "#fff" }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {renderStudentModal()}
      </>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: pageBg,
        py: 2.5,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ px: { xs: 1, md: 2 } }}>
          {viewMode === "faculty" && renderFacultyView()}
          {viewMode === "branch" && renderBranchView()}
          {viewMode === "student" && renderStudentView()}
        </Box>
      </Container>
    </Box>
  );
};

export default StudentManagePage;