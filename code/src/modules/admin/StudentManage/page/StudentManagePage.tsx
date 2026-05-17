import React, { useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useStudentMangeFetch } from "../hook/useFetchStudentMange";
import type { IStudentItem } from "../interface/StudentMange.interface";
import FacultyView from "../components/page/FacultyView";
import MajorView from "../components/page/MajorView";
import StudentTableView from "../components/page/StudentTableView";

export interface IStudentManagePageProps { }

const pageBg = "#f3f6fb";
const cardBorder = "#dbe3ef";
const titleColor = "#081633";

const StudentManagePage: React.FunctionComponent<IStudentManagePageProps> = () => {
  const master = useStudentMangeFetch();

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [_selectedStudent, setSelectedStudent] = useState<IStudentItem | null>(null);

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
          {master.viewMode === "faculty" && (
            <>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${cardBorder}`,
                  mb: 3,
                }}
              >
                <CardContent sx={{ px: 3, py: 3 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 28, md: 34 },
                      fontWeight: 800,
                      color: titleColor,
                      lineHeight: 1.2,
                    }}
                  >
                    หน้าจัดการนิสิต
                  </Typography>
                  <Typography sx={{ mt: 1, color: "#64748b", fontSize: 16 }}>
                    รายชื่อนิสิตของแต่ละคณะสาขา
                  </Typography>
                </CardContent>
              </Card>

              <FacultyView
                data={master.studentmange_data}
                isLoading={master.facultyLoading}
                onSelectFaculty={master.handleSelectFaculty}
              />
            </>
          )}

          {master.viewMode === "branch" && (
            <MajorView
              facultyName={master.selectedFacultyName}
              data={master.major_data}
              isLoading={master.majorLoading}
              onBack={master.handleBackToFaculty}
              onSelectMajor={master.handleSelectMajor}
            />
          )}

          {master.viewMode === "student" && (
            <StudentTableView master={master} />
          )}
        </Box>
      </Container>


    </Box>
  );
};

export default StudentManagePage;