import React from "react";
import { Box, Button, Grid, Typography, Container, Stack } from "@mui/material";
import Logo from "../../../assets/svg/logo_rbac.svg";
import Video from "../../../assets/video/vdo-rbac.mp4";
import { useNavigate } from "react-router";
import { AppRoutes } from "../../../router/router";

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Background video */}
      <Box
        component="video"
        src={Video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        sx={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none", // กันไม่ให้รับคลิก
        }}
        onError={(e) => console.error("Video error", e)}
      />

      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Foreground content */}
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2, // ⬅️ อยู่บนสุด
        }}
      >
        <Stack spacing={2}>
         <Box display="flex" alignItems="center" gap={1}>
             <Box component="img" width={100} src={Logo} alt="logo_rbac" />
            <Typography sx={{ fontSize: 28, color: "white", fontWeight: 700 }}>
              {"Web SMO Activity"}
            </Typography>
          </Box>

          <Box  display="flex" justifyContent="center">
            <Button
              onClick={() => navigate(AppRoutes.login)}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ width: "160px", height: "55px" }}
            >
              <Typography fontSize={18} fontWeight={500}>
                {"เข้าสู่ระบบ"}
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default LoginPage;
