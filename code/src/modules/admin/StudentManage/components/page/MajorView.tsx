import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import type { IMajorItem } from "../../interface/StudentMange.interface";

export interface IMajorViewProps {
  facultyName: string;
  data: IMajorItem[];
  isLoading: boolean;
  onBack: () => void;
  onSelectMajor: (major: IMajorItem) => void;
}

const cardBorder = "#dbe3ef";
const titleColor = "#081633";
const subColor = "#64748b";

const MajorView: React.FunctionComponent<IMajorViewProps> = ({
  facultyName,
  data,
  isLoading,
  onBack,
  onSelectMajor,
}) => {
  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: "0px",
          border: `1px solid ${cardBorder}`,
          mb: 4,
        }}
      >
        <CardContent sx={{ px: 3, py: 3 }}>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              textTransform: "none",
              color: titleColor,
              fontWeight: 700,
              mb: 3,
              px: 0,
            }}
          >
            กลับไปหน้าคณะ
          </Button>

          <Typography
            sx={{
              fontSize: { xs: 30, md: 34 },
              fontWeight: 800,
              color: titleColor,
            }}
          >
            {facultyName}
          </Typography>

          <Typography sx={{ mt: 1, color: subColor, fontSize: 16 }}>
            เลือกสาขาวิชาเพื่อดูรายชื่อนิสิต
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: 28, md: 32 },
            fontWeight: 800,
            color: titleColor,
          }}
        >
          สาขาวิชาทั้งหมด
        </Typography>
        <Typography sx={{ mt: 0.5, color: subColor, fontSize: 16 }}>
          {data.length} สาขา
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
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${cardBorder}`,
                  minHeight: 145,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Skeleton width="75%" height={34} />
                  <Skeleton width="35%" height={24} sx={{ mt: 4 }} />
                </CardContent>
              </Card>
            ))
          : data.map((major) => (
              <Card
                key={major.major_id}
                elevation={0}
                onClick={() => onSelectMajor(major)}
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${cardBorder}`,
                  minHeight: 145,
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
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Stack direction="row" spacing={1.2} sx={{ maxWidth: "88%" }}>
                      <Groups2OutlinedIcon
                        sx={{ color: "#2563eb", mt: "2px" }}
                      />
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: titleColor,
                        }}
                      >
                        {major.major_name}
                      </Typography>
                    </Stack>

                    <ArrowForwardIosRoundedIcon
                      sx={{ color: "#94a3b8", fontSize: 24 }}
                    />
                  </Stack>

                  <Typography sx={{ fontSize: 16, color: titleColor, mt: 3 }}>
                    จำนวนนิสิต: {major.count_student} คน
                  </Typography>
                </CardContent>
              </Card>
            ))}
      </Box>
    </>
  );
};

export default MajorView;