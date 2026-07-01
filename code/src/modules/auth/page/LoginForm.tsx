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
import Logo_Samo from "../../../assets/image/logo_samo.jpg";
const LoginForm: React.FC = () => {
  const { getAuthToken, handleLoginAdmin, handleLoginStudent } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
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

    try {
      let res;

      if (roleTab === "admin") {
        res = await handleLoginAdmin({
          username: payload.username,
          password: payload.password,
        });
      } else {
        res = await handleLoginStudent({
          username: payload.username,
          password: payload.password,
        });
      }

      if (!res.success) {
        const message =
          res.detail || "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล";

        setBanner(message);

        setError("username", { message });
        setError("password", { message });

        return;
      }

    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";

      setBanner(message);

      setError("username", { message });
      setError("password", { message });
    }
  };

  const handleSelectTab = (tab: "student" | "admin") => {
    setRoleTab(tab);
    setBanner(null);


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
        background: (theme) =>
          `radial-gradient(circle at top, ${theme.palette.custom.brandAccentSoft} 0, transparent 34%), ${theme.palette.custom.pageBg}`,
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
          {/* <Box>img</Box> */}
          <Box component="img" sx={{ width: 200 }} src={Logo_Samo} alt="logo_rbac" />
          <Typography
            sx={{
              fontSize: { xs: 24, md: 30 },
              fontWeight: 800,
              color: "primary.main",
              mb: 0.25,
            }}
          >
            {"ระบบนิสิต"}
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
            backgroundColor: "background.paper",
            borderRadius: "24px",
            border: (theme) => `1px solid ${theme.palette.custom.cardBorder}`,
            boxShadow: "0 18px 46px rgba(8, 19, 95, 0.12)",
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
                backgroundColor: "custom.mutedBg",
                border: (theme) => `1px solid ${theme.palette.custom.cardBorder}`,
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
                    roleTab === "student" ? "primary.main" : "transparent",
                  color: roleTab === "student" ? "primary.contrastText" : "text.primary",
                  border: "none",
                  boxShadow:
                    roleTab === "student"
                      ? "0 8px 20px rgba(8,19,95,0.22)"
                      : "none",
                  "& .MuiButton-startIcon": {
                    mr: 1,
                  },
                  "&:hover": {
                    backgroundColor:
                      roleTab === "student" ? "primary.light" : "action.hover",
                    boxShadow:
                      roleTab === "student"
                        ? "0 8px 20px rgba(8,19,95,0.22)"
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
                    roleTab === "admin" ? "primary.main" : "transparent",
                  color: roleTab === "admin" ? "primary.contrastText" : "text.primary",
                  border: "none",
                  boxShadow:
                    roleTab === "admin"
                      ? "0 8px 20px rgba(8,19,95,0.22)"
                      : "none",
                  "& .MuiButton-startIcon": {
                    mr: 1,
                  },
                  "&:hover": {
                    backgroundColor:
                      roleTab === "admin" ? "primary.light" : "action.hover",
                    boxShadow:
                      roleTab === "admin"
                        ? "0 8px 20px rgba(8,19,95,0.22)"
                        : "none",
                  },
                }}
              >
                แอดมิน
              </Button>
            </Box>
            {banner && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ mt: 2.5, borderRadius: 3 }}
              >
                {banner}
              </Alert>
            )}
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  {roleTab === "student" ? "รหัสนิสิต" : "Username"}
                </Typography>

                <TextField
                  fullWidth
                  variant="filled"
                  placeholder={
                    roleTab === "student"
                      ? "69010001"
                      : "Username"
                  }
                  autoComplete="username"
                  {...register("username", {
                    required: "กรุณากรอกบัญชี",
                  })}
                  error={!!errors.username}
                  onInput={(e) => {
                    if (roleTab === "student") {
                      const target = e.target as HTMLInputElement;

                      target.value = target.value
                        .replace(/\D/g, "")
                        .slice(0, 8);
                    }
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      minHeight: 62,
                      borderRadius: "16px",
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${errors.username ? theme.palette.error.main : theme.palette.divider
                        }`,
                      fontSize: 17,
                      px: 1,
                      transition: "all 0.2s ease",
                    },
                    "& .MuiFilledInput-root:hover": {
                      backgroundColor: "custom.inputBg",
                      borderColor: "primary.main",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      boxShadow: "0 0 0 3px rgba(8,19,95,0.08)",
                    },
                    "& .MuiFilledInput-root.Mui-error": {
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${theme.palette.error.main}`,
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "text.primary",
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      maxLength: roleTab === "student" ? 8 : undefined,
                      inputMode: roleTab === "student" ? "numeric" : "text",
                    },
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
                    color: "text.primary",
                  }}
                >
                  รหัสผ่าน
                </Typography>

                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  // placeholder="••••"
                  autoComplete="current-password"
                  {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
                  error={!!errors.password}
                  sx={{
                    "& .MuiFilledInput-root": {
                      minHeight: 62,
                      borderRadius: "16px",
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${errors.password ? theme.palette.error.main : theme.palette.divider}`,
                      fontSize: 17,
                      px: 1,
                      transition: "all 0.2s ease",
                    },
                    "& .MuiFilledInput-root:hover": {
                      backgroundColor: "custom.inputBg",
                      borderColor: "primary.main",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      boxShadow: "0 0 0 3px rgba(8,19,95,0.08)",
                    },
                    "& .MuiFilledInput-root.Mui-error": {
                      backgroundColor: "custom.inputBg",
                      border: (theme) => `1px solid ${theme.palette.error.main}`,
                    },
                    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "text.primary",
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
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "action.disabledBackground",
                  color: "text.disabled",
                },
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
                {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Typography>
            </Button>

            {roleTab === "student" && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/register")}
                sx={{
                  mt: 2,
                  height: 62,
                  borderRadius: "16px",
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: 800,
                  backgroundColor: "background.paper",

                  "&:hover": {
                    borderColor: "primary.light",
                    backgroundColor: "custom.brandSoft",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  สมัครข้อมูล
                </Typography>
              </Button>
            )}

            <Box
              sx={{
                mt: 2.5,
                borderRadius: "16px",
                backgroundColor: "custom.mutedBg",
                px: 2.5,
                py: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15 },
                  color: "text.secondary",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                คลิก "นิสิต" หรือ "แอดมิน" เพื่อเติมข้อมูลอัตโนมัติ
                แล้วกดเข้าสู่ระบบ
              </Typography>
            </Box>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
