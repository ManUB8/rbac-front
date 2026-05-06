// theme/getTheme.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#0B0A0A" },
            secondary: { main: "#785A00" },
            error: { main: "#BA1A1A" },
            success: { main: "#18874D" },
            background: {
              default: "#F3F6FB",
              paper: "#FFFFFF",
            },
          }
        : {
            primary: { main: "#CAC5C5" },
            secondary: { main: "#FFE2A7" },
            error: { main: "#FFDAD6" },
            success: { main: "#99EAC0" },
            background: {
              default: "#252525",
              paper: "#2B2B2B",
            },
          }),
    },

    shape: {
      borderRadius: 16,
    },

    typography: {
      fontFamily: ['IBM Plex Sans', 'IBMPlexSansThai'].join(","),
      h3: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 700,
        fontSize: "1.75rem",
        lineHeight: 1.35,
      },
      h5: {
        fontWeight: 700,
        fontSize: "1.5rem",
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 700,
        fontSize: "1.25rem",
        lineHeight: 1.4,
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: "1rem",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontWeight: 400,
        fontSize: "0.95rem",
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          html: {
            width: "100%",
            height: "100%",
          },
          body: {
            width: "100%",
            minHeight: "100%",
            margin: 0,
            overflowX: "hidden",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
          "#root": {
            width: "100%",
            minHeight: "100%",
            backgroundColor: theme.palette.background.default,
          },
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
        }),
      },

      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: "none",
          }),
        },
      },

      // MuiPaper: {
      //   defaultProps: {
      //     elevation: 0,
      //   },
      //   styleOverrides: {
      //     root: ({ theme }) => ({
      //       backgroundImage: "none",
      //       boxShadow: "none",
      //       backgroundColor: theme.palette.background.paper,
      //     }),
      //   },
      // },

      // MuiCard: {
      //   styleOverrides: {
      //     root: ({ theme }) => ({
      //       borderRadius: 24,
      //       backgroundColor: theme.palette.background.paper,
      //       border: `1px solid ${theme.palette.divider}`,
      //       boxShadow: "none",
      //     }),
      //   },
      // },

      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            minHeight: 48,
            borderRadius: 16,
            transition: "all 0.2s ease",
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected,
              color: theme.palette.primary.main,
            },
            "&.Mui-selected:hover": {
              backgroundColor: theme.palette.action.selected,
            },
          }),
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
            "&.Mui-focusVisible": {
              outline: "none",
              boxShadow: "none",
            },
          },
        },
      },

      MuiContainer: {
        defaultProps: {
          maxWidth: false,
        },
        styleOverrides: {
          root: {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  });

export default getTheme;