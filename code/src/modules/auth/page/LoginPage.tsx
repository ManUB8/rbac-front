import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
          background: (theme) =>
            `radial-gradient(circle at 50% 42%, ${theme.palette.custom.brandAccentSoft} 0, transparent 24%), linear-gradient(135deg, rgba(5,11,52,.88), rgba(8,19,95,.72), rgba(5,11,52,.9))`,
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
        <Stack
          spacing={2.5}
          sx={{
            alignItems: "center",
            textAlign: "center",
            px: 3,
            py: 4,
            // borderRadius: 5,
            // border: (theme) => `1px solid ${theme.palette.custom.brandAccentSoft}`,
            // background:
            //   "linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
            // backdropFilter: "blur(10px)",
            // boxShadow: "0 24px 70px rgba(0,0,0,.28)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              component="img"
              sx={{
                width: 104,
                // borderRadius: 2,
                boxShadow: "0 14px 34px rgba(0,0,0,.28)",
              }}
              src={Logo_Samo}
              alt="logo_rbac"
            />

            <Typography
              sx={{
                fontSize: 28,
                color: "white",
                fontWeight: 900,
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
                width: 180,
                height: 56,
                borderRadius: 1,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                "&:hover": {
                  bgcolor: "secondary.light",
                },
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
