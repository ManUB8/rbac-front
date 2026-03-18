import { createTheme, alpha } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      pageBg: string;
      cardBg: string;
      cardBorder: string;
      mutedBg: string;
      inputBg: string;
      brand: string;
      brandHover: string;
      brandSoft: string;
      textSoft: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      pageBg?: string;
      cardBg?: string;
      cardBorder?: string;
      mutedBg?: string;
      inputBg?: string;
      brand?: string;
      brandHover?: string;
      brandSoft?: string;
      textSoft?: string;
    };
  }
}

export const getTheme = (mode: "light" | "dark") => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,

      ...(isLight
        ? {
            primary: {
              main: "#2952D9",
              light: "#4F72E5",
              dark: "#1F43BD",
              contrastText: "#FFFFFF",
            },
            secondary: {
              main: "#F59E0B",
              light: "#FBBF24",
              dark: "#D97706",
              contrastText: "#111827",
            },
            error: {
              main: "#DC2626",
              light: "#EF4444",
              dark: "#B91C1C",
              contrastText: "#FFFFFF",
            },
            warning: {
              main: "#F59E0B",
            },
            info: {
              main: "#2563EB",
            },
            success: {
              main: "#16A34A",
            },
            background: {
              default: "#F4F6FB",
              paper: "#FFFFFF",
            },
            text: {
              primary: "#111827",
              secondary: "#64748B",
              disabled: "#9CA3AF",
            },
            divider: "#E2E8F0",
            action: {
              hover: "rgba(15, 23, 42, 0.04)",
              selected: "rgba(41, 82, 217, 0.10)",
              disabledBackground: "#E5E7EB",
              disabled: "#9CA3AF",
            },
            custom: {
              pageBg: "#F4F6FB",
              cardBg: "#FFFFFF",
              cardBorder: "#E5E7EB",
              mutedBg: "#F8FAFC",
              inputBg: "#F8FAFC",
              brand: "#2952D9",
              brandHover: "#2348BF",
              brandSoft: "#E8EEFF",
              textSoft: "#64748B",
            },
          }
        : {
            primary: {
              main: "#7C9BFF",
              light: "#9CB3FF",
              dark: "#5E7EF2",
              contrastText: "#081120",
            },
            secondary: {
              main: "#FBBF24",
              light: "#FCD34D",
              dark: "#D97706",
              contrastText: "#111827",
            },
            error: {
              main: "#F87171",
              light: "#FCA5A5",
              dark: "#DC2626",
              contrastText: "#1F0A0A",
            },
            warning: {
              main: "#FBBF24",
            },
            info: {
              main: "#60A5FA",
            },
            success: {
              main: "#4ADE80",
            },
            background: {
              default: "#0F172A",
              paper: "#111827",
            },
            text: {
              primary: "#F8FAFC",
              secondary: "#94A3B8",
              disabled: "#64748B",
            },
            divider: "#243041",
            action: {
              hover: "rgba(148, 163, 184, 0.08)",
              selected: "rgba(124, 155, 255, 0.16)",
              disabledBackground: "#1E293B",
              disabled: "#64748B",
            },
            custom: {
              pageBg: "#0F172A",
              cardBg: "#111827",
              cardBorder: "#243041",
              mutedBg: "#182233",
              inputBg: "#182233",
              brand: "#7C9BFF",
              brandHover: "#6B8CFF",
              brandSoft: "#1A2750",
              textSoft: "#94A3B8",
            },
          }),
    },

    typography: {
      fontFamily: ["IBM Plex Sans", "IBM Plex Sans Thai", "sans-serif"].join(","),
      fontSize: 16,

      h1: {
        fontWeight: 700,
        fontSize: "64px",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 700,
        fontSize: "48px",
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontWeight: 700,
        fontSize: "36px",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 700,
        fontSize: "30px",
        lineHeight: 1.35,
      },
      h5: {
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: 1.45,
      },
      subtitle1: {
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: 1.5,
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: 1.5,
      },
      body1: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: 1.6,
      },
      body2: {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: 1.6,
      },
      caption: {
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: 1.5,
        letterSpacing: "0.02em",
      },
      button: {
        fontWeight: 700,
        fontSize: "14px",
        textTransform: "none",
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.custom.pageBg,
            color: theme.palette.text.primary,
            fontFamily: ["IBM Plex Sans", "IBM Plex Sans Thai", "sans-serif"].join(","),
            transition: "background-color 0.25s ease, color 0.25s ease",
          },

          "*": {
            boxSizing: "border-box",
          },

          "*:focus-visible": {
            outline: "none",
          },

          ".MuiIconButton-root.Mui-focusVisible": {
            outline: "none !important",
            boxShadow: "none !important",
          },

          ".MuiButtonBase-root.Mui-focusVisible": {
            outline: "none !important",
            boxShadow: "none !important",
          },

          ".form-error-focus": {
            outline: `2px solid ${alpha(theme.palette.error.main, 0.5)}`,
            outlineOffset: "2px",
            borderRadius: "8px",
            scrollMarginTop: "100px",
          },
        }),
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.custom.cardBg,
            border: `1px solid ${theme.palette.custom.cardBorder}`,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 12px 32px rgba(15, 23, 42, 0.08)"
                : "0 12px 32px rgba(0, 0, 0, 0.28)",
            borderRadius: 20,
            transition: "all 0.2s ease",
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
          }),
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
          color: "primary",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 14,
            fontWeight: 700,
            boxShadow: "none",
            outline: "none",
            transition: "all 0.2s ease",
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
          }),

          containedPrimary: ({ theme }) => ({
            backgroundColor: theme.palette.custom.brand,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.custom.brandHover,
            },
          }),

          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,
            "&:hover": {
              borderColor: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
            },
          }),

          text: ({ theme }) => ({
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),

          sizeSmall: {
            height: 36,
            fontSize: 13,
          },
          sizeMedium: {
            height: 42,
            fontSize: 14,
          },
          sizeLarge: {
            height: 48,
            fontSize: 15,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              outline: "none !important",
              boxShadow: "none !important",
            },
            "&:focus-visible": {
              outline: "none !important",
              boxShadow: "none !important",
            },
            "&:focus": {
              outline: "none !important",
              boxShadow: "none !important",
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            cursor: "pointer",
            textDecorationColor: alpha(theme.palette.primary.main, 0.35),

            "&:visited": {
              color: theme.palette.primary.main,
            },
            "&:hover": {
              color: theme.palette.primary.dark,
              textDecoration: "underline",
            },
            "&:focus": {
              color: theme.palette.primary.main,
              outline: "none",
            },
          }),
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: 15,
            fontWeight: 500,
            color: theme.palette.text.secondary,
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
            "&.Mui-error": {
              color: theme.palette.error.main,
            },
          }),
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            minHeight: 56,
            borderRadius: 14,
            backgroundColor: theme.palette.custom.inputBg,
            transition: "all 0.2s ease",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
              borderWidth: 1,
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: 1.5,
            },

            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
              borderWidth: 1.5,
            },

            "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
              borderWidth: 1.5,
            },

            "&.Mui-disabled": {
              backgroundColor: theme.palette.action.disabledBackground,
            },
          }),

          input: ({ theme }) => ({
            fontSize: 16,
            fontWeight: 400,
            color: theme.palette.text.primary,
            "::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          }),
        },
      },

      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            minHeight: 56,
            borderRadius: 14,
            backgroundColor: theme.palette.custom.inputBg,
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: theme.palette.custom.inputBg,
              borderColor: theme.palette.text.secondary,
            },

            "&.Mui-focused": {
              backgroundColor: theme.palette.custom.inputBg,
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.10)}`,
            },

            "&.Mui-error": {
              borderColor: theme.palette.error.main,
            },

            "&.Mui-error.Mui-focused": {
              borderColor: theme.palette.error.main,
              boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.12)}`,
            },

            "&:before, &:after, &:hover:before, &.Mui-disabled:before": {
              borderBottom: "none",
            },

            "&.Mui-disabled": {
              backgroundColor: theme.palette.action.disabledBackground,
              opacity: 1,
            },
          }),

          input: ({ theme }) => ({
            fontSize: 16,
            color: theme.palette.text.primary,

            "&::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },

            "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
              WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.custom.inputBg} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
              transition: "background-color 9999s ease-out 0s",
            },
          }),
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
          standardError: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FEECEC"
                : alpha(theme.palette.error.main, 0.14),
            color: theme.palette.error.main,
          }),
          filledError: ({ theme }) => ({
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }),
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.divider,
          }),
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            width: 58,
            height: 32,
            padding: 0,
            display: "flex",

            "& .MuiSwitch-switchBase": {
              padding: 4,
              transitionDuration: "200ms",

              "&.Mui-checked": {
                transform: "translateX(26px)",
                color: "#fff",

                "& + .MuiSwitch-track": {
                  backgroundColor: theme.palette.primary.main,
                  opacity: 1,
                  border: "none",
                },
              },
            },

            "& .MuiSwitch-thumb": {
              width: 24,
              height: 24,
              boxShadow: "none",
              backgroundColor: "#fff",
            },

            "& .MuiSwitch-track": {
              borderRadius: 999,
              backgroundColor:
                theme.palette.mode === "light" ? "#CBD5E1" : "#334155",
              opacity: 1,
              transition: theme.transitions.create(["background-color"], {
                duration: 200,
              }),
            },
          }),
        },
      },

      MuiAutocomplete: {
        defaultProps: {
          disablePortal: false,
          autoHighlight: true,
        },
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[6],
          }),

          option: ({ theme }) => ({
            color: theme.palette.text.primary,

            "&.Mui-focused": {
              backgroundColor: theme.palette.action.hover,
            },

            '&[aria-selected="true"]': {
              backgroundColor: theme.palette.action.selected,
            },

            "&.Mui-disabled": {
              opacity: 0.6,
            },
          }),

          root: ({ theme }) => ({
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.custom.inputBg,
              color: theme.palette.text.primary,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
          }),

          popupIndicator: ({ theme }) => ({
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.text.primary,
            },
          }),

          clearIndicator: ({ theme }) => ({
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.text.primary,
            },
          }),

          groupLabel: ({ theme }) => ({
            backgroundColor: theme.palette.custom.mutedBg,
            color: theme.palette.text.secondary,
            fontWeight: 700,
          }),
        },
      },
    },
  });
};

export default getTheme;