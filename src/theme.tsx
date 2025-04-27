import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Koyu tema renkleri
const darkThemeColors = {
  primary: {
    main: "#0088ff",
    light: "#5db8ff",
    dark: "#005db7",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#7c4dff",
    light: "#b47cff",
    dark: "#3a1fff",
    contrastText: "#ffffff",
  },
  success: {
    main: "#00c853",
    light: "#5efc82",
    dark: "#009624",
    contrastText: "#000000",
  },
  warning: {
    main: "#ffc107",
    light: "#fff350",
    dark: "#c79100",
    contrastText: "#000000",
  },
  error: {
    main: "#ff3d00",
    light: "#ff7539",
    dark: "#c30000",
    contrastText: "#ffffff",
  },
  info: {
    main: "#00b0ff",
    light: "#69e2ff",
    dark: "#0081cb",
    contrastText: "#000000",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#b0b0b0",
    disabled: "#6c6c6c",
  },
};

// Açık tema renkleri
const lightThemeColors = {
  primary: {
    main: "#0066cc",
    light: "#5b94ff",
    dark: "#003c9a",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#6200ea",
    light: "#9c4dff",
    dark: "#4400b6",
    contrastText: "#ffffff",
  },
  success: {
    main: "#00c853",
    light: "#5efc82",
    dark: "#009624",
    contrastText: "#000000",
  },
  warning: {
    main: "#ff9800",
    light: "#ffc947",
    dark: "#c66900",
    contrastText: "#000000",
  },
  error: {
    main: "#d50000",
    light: "#ff5131",
    dark: "#9b0000",
    contrastText: "#ffffff",
  },
  info: {
    main: "#0091ea",
    light: "#64c1ff",
    dark: "#0064b7",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  text: {
    primary: "#212121",
    secondary: "#616161",
    disabled: "#9e9e9e",
  },
};

// Koyu tema
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...darkThemeColors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${darkThemeColors.primary.dark} 0%, ${darkThemeColors.primary.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${darkThemeColors.primary.main} 0%, ${darkThemeColors.primary.light} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${darkThemeColors.secondary.dark} 0%, ${darkThemeColors.secondary.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${darkThemeColors.secondary.main} 0%, ${darkThemeColors.secondary.light} 100%)`,
          },
        },
        containedSuccess: {
          background: `linear-gradient(45deg, ${darkThemeColors.success.dark} 0%, ${darkThemeColors.success.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${darkThemeColors.success.main} 0%, ${darkThemeColors.success.light} 100%)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
        elevation3: {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, #1a1a1a 0%, #2c2c2c 100%)`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: darkThemeColors.primary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: darkThemeColors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Açık tema
const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...lightThemeColors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${lightThemeColors.primary.dark} 0%, ${lightThemeColors.primary.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${lightThemeColors.primary.main} 0%, ${lightThemeColors.primary.light} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${lightThemeColors.secondary.dark} 0%, ${lightThemeColors.secondary.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${lightThemeColors.secondary.main} 0%, ${lightThemeColors.secondary.light} 100%)`,
          },
        },
        containedSuccess: {
          background: `linear-gradient(45deg, ${lightThemeColors.success.dark} 0%, ${lightThemeColors.success.main} 100%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${lightThemeColors.success.main} 0%, ${lightThemeColors.success.light} 100%)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
        elevation3: {
          boxShadow: "0 6px 14px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, ${lightThemeColors.primary.dark} 0%, ${lightThemeColors.primary.main} 100%)`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: lightThemeColors.primary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: lightThemeColors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Responsive fontları etkinleştirme
export const responsiveThemeDark = responsiveFontSizes(darkTheme);
export const responsiveThemeLight = responsiveFontSizes(lightTheme);

export default responsiveThemeDark;
