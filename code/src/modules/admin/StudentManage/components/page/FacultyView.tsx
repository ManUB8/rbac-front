import React from "react";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import type { IFacultyItem } from "../../interface/StudentMange.interface";

export interface IFacultyViewProps {
  data: IFacultyItem[];
  isLoading: boolean;
  onSelectFaculty: (faculty: IFacultyItem) => void;
}

const cardBorder = "#dbe3ef";
const titleColor = "#081633";

const FacultyView: React.FunctionComponent<IFacultyViewProps> = ({
  data,
  isLoading,
  onSelectFaculty,
}) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: 28, md: 32 },
            fontWeight: 800,
            color: titleColor,
          }}
        >
          เลือกคณะ
        </Typography>
        <Typography sx={{ mt: 0.5, color: "#64748b", fontSize: 16 }}>
          คลิกเพื่อดูสาขาวิชาและข้อมูลนิสิต
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${cardBorder}`,
                  minHeight: 160,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Skeleton width="70%" height={36} />
                  <Skeleton width="40%" height={26} sx={{ mt: 3 }} />
                  <Skeleton width="35%" height={26} />
                </CardContent>
              </Card>
            ))
          : data.map((faculty) => (
              <Card
                key={faculty.faculty_id}
                elevation={0}
                onClick={() => onSelectFaculty(faculty)}
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${cardBorder}`,
                  minHeight: 160,
                  cursor: "pointer",
                  transition: "all .2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: titleColor,
                        maxWidth: "85%",
                      }}
                    >
                      {faculty.faculty_name}
                    </Typography>

                    <ArrowForwardIosRoundedIcon
                      sx={{ color: "#94a3b8", fontSize: 24 }}
                    />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Typography sx={{ fontSize: 16, color: titleColor }}>
                      จำนวนสาขา: {faculty.count_major} สาขา
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: titleColor, mt: 1 }}>
                      จำนวนนิสิต: {faculty.count_student} คน
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
      </Box>
    </>
  );
};

export default FacultyView;