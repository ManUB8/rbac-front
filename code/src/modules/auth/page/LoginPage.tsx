import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Logo from "../../../assets/svg/logo_rbac.svg";
import Logo_Samo from "../../../assets/image/logo_samo.jpg";
import Video from "../../../assets/video/vdo-rbac.mp4";
import { useNavigate } from "react-router";
import { AppRoutes } from "../../../router/router";

export interface ILoginPageProps { }

const LoginPage: React.FC<ILoginPageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
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
          pointerEvents: "none",
        }}
        onError={(e) => console.error("Video error", e)}
      />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box component="img" sx={{ width: 100 }} src={Logo_Samo} alt="logo_rbac" />

            <Typography
              sx={{
                fontSize: 28,
                color: "white",
                fontWeight: 700,
              }}
            >
              {"Web Activity"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => navigate(AppRoutes.login)}
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                width: 160,
                height: 55,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
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