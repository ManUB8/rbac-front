import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import * as R from "ramda";
import { AppRoutes } from "../../../router/router";
import { useAuth } from "../hook/useAuth";
import type { ILoginAdminBody } from "../interface/Login.interface";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const LoginForm: React.FC = () => {
  const { getAuthToken, handleLoginAdmin, handleLoginStudent } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<ILoginAdminBody>({
    defaultValues: { username: "", password: "" },
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [roleTab, setRoleTab] = useState<"student" | "admin">("student");

  const toggleShowPassword = useCallback(() => setShowPassword((v) => !v), []);

  if (R.isNotEmpty(getAuthToken())) {
    return <Navigate to={AppRoutes.default} replace />;
  }

  const onSubmit = async (payload: ILoginAdminBody) => {
    setBanner(null);

    let ok = false;

    if (roleTab === "admin") {
      ok = await handleLoginAdmin({
        username: payload.username,
        password: payload.password,
      });
    } else {
      ok = await handleLoginStudent({
        student_id: payload.username,
        password: payload.password,
      });
    }

    if (!ok) {
      setBanner("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
      setError("username", { message: "ข้อมูลไม่ถูกต้อง" });
      setError("password", { message: "ข้อมูลไม่ถูกต้อง" });
    }
  };

  const handleSelectTab = (tab: "student" | "admin") => {
    setRoleTab(tab);
    setBanner(null);

    if (tab === "student") {
      setValue("username", "67010533");
      setValue("password", "1234");
    } else {
      setValue("username", "admin");
      setValue("password", "1234");
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 2,
        backgroundColor: "#F3F4F6",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 3.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>{/* img */}</Box>

          <Typography
            sx={{
              fontSize: { xs: 24, md: 30 },
              fontWeight: 800,
              color: "#111827",
              mb: 0.25,
            }}
          >
            ระบบนิสิต
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            University Student Portal
          </Typography>
        </Box>

        {/* Card */}
        <Card
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 640,
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 3, md: 3.5 },
              "&:last-child": {
                pb: { xs: 2.5, sm: 3, md: 3.5 },
              },
            }}
          >
            {/* Segmented Tabs */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5,
                p: 0.75,
                mb: 3,
                borderRadius: "20px",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Button
                type="button"
                onClick={() => handleSelectTab("student")}
                startIcon={<SchoolOutlinedIcon />}
                sx={{
                  height: 60,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: 17,
                  fontWeight: 800,
                  backgroundColor:
                    roleTab === "student" ? "#2952D9" : "transparent",
                  color: roleTab === "student" ? "#FFFFFF" : "#111827",
                  border: "none",
                  boxShadow:
                    roleTab === "student"
                      ? "0 8px 20px rgba(41,82,217,0.22)"
                      : "none",
                  "& .MuiButton-startIcon": {
                    mr: 1,
                  },
                  "&:hover": {
                    backgroundColor:
                      roleTab === "student" ? "#2348BF" : "#EEF2F7",
                    boxShadow:
                      roleTab === "student"
                        ? "0 8px 20px rgba(41,82,217,0.22)"
                        : "none",
                  },
                }}
              >
                นิสิต
              </Button>

              <Button
                type="button"
                onClick={() => handleSelectTab("admin")}
                startIcon={<AdminPanelSettingsOutlinedIcon />}
                sx={{
                  height: 60,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: 17,
                  fontWeight: 800,
                  backgroundColor:
                    roleTab === "admin" ? "#2952D9" : "transparent",
                  color: roleTab === "admin" ? "#FFFFFF" : "#111827",
                  border: "none",
                  boxShadow:
                    roleTab === "admin"
                      ? "0 8px 20px rgba(41,82,217,0.22)"
                      : "none",
                  "& .MuiButton-startIcon": {
                    mr: 1,
                  },
                  "&:hover": {
                    backgroundColor:
                      roleTab === "admin" ? "#2348BF" : "#EEF2F7",
                    boxShadow:
                      roleTab === "admin"
                        ? "0 8px 20px rgba(41,82,217,0.22)"
                        : "none",
                  },
                }}
              >
                แอดมิน
              </Button>
            </Box>

            <Stack spacing={2.5}>
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  {roleTab === "student" ? "อีเมล" : "ชื่อผู้ใช้"}
                </Typography>

                <TextField
                  fullWidth
                  variant="filled"
                  placeholder={
                    roleTab === "student"
                      ? "email@university.ac.th"
                      : "กรอกชื่อผู้ใช้"
                  }
                  autoComplete="username"
                  {...register("username", { required: "กรุณากรอกบัญชี" })}
                  error={!!errors.username}
                  sx={{
                    "& .MuiFilledInput-root": {
                      minHeight: 62,
                      borderRadius: "16px",
                      backgroundColor: "#F8FAFC",
                      border: `1px solid ${errors.username ? "#D32F2F" : "#D6DCE5"}`,
                      fontSize: 17,
                      px: 1,
                      transition: "all 0.2s ease",
                    },
                    "& .MuiFilledInput-root:hover": {
                      backgroundColor: "#F8FAFC",
                      borderColor: "#C7D2E0",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #2952D9",
                      boxShadow: "0 0 0 3px rgba(41,82,217,0.08)",
                    },
                    "& .MuiFilledInput-root.Mui-error": {
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #D32F2F",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                      {
                        display: "none",
                      },
                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "#475569",
                    },
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      endAdornment: errors.username ? (
                        <InputAdornment position="end">
                          <ErrorOutline color="error" fontSize="small" />
                        </InputAdornment>
                      ) : null,
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  รหัสผ่าน
                </Typography>

                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••"
                  autoComplete="current-password"
                  {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
                  error={!!errors.password}
                  sx={{
                    "& .MuiFilledInput-root": {
                      minHeight: 62,
                      borderRadius: "16px",
                      backgroundColor: "#F8FAFC",
                      border: `1px solid ${errors.password ? "#D32F2F" : "#D6DCE5"}`,
                      fontSize: 17,
                      px: 1,
                      transition: "all 0.2s ease",
                    },
                    "& .MuiFilledInput-root:hover": {
                      backgroundColor: "#F8FAFC",
                      borderColor: "#C7D2E0",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #2952D9",
                      boxShadow: "0 0 0 3px rgba(41,82,217,0.08)",
                    },
                    "& .MuiFilledInput-root.Mui-error": {
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #D32F2F",
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                      {
                        display: "none",
                      },
                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "#475569",
                    },
                  }}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          {errors.password && (
                            <ErrorOutline color="error" fontSize="small" />
                          )}
                          <IconButton
                            onClick={toggleShowPassword}
                            edge="end"
                            size="small"
                            sx={{ ml: 0.5 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                height: 62,
                borderRadius: "16px",
                textTransform: "none",
                backgroundColor: "#2952D9",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#2348BF",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#AFC0FF",
                  color: "#FFFFFF",
                },
              }}
            >
              <Typography fontSize={18} fontWeight={800}>
                {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Typography>
            </Button>

            <Box
              sx={{
                mt: 2.5,
                borderRadius: "16px",
                backgroundColor: "#F1F5F9",
                px: 2.5,
                py: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15 },
                  color: "#64748B",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                คลิก "นิสิต" หรือ "แอดมิน" เพื่อเติมข้อมูลอัตโนมัติ
                แล้วกดเข้าสู่ระบบ
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => navigate("/forgot-password")}
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                ลืมรหัสผ่านใช่ไหม?
              </Link>

              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={() => navigate("/register")}
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                สมัครข้อมูล
              </Link>
            </Box>
            {banner && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ mt: 2.5, borderRadius: 2 }}
              >
                {banner}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
