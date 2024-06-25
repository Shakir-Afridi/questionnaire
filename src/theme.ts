import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {
        primary: {
            main: "#6b54fe",
        },
        info: {
            main: "#4e4e4e",
        },
        secondary: {
            main: "#eee",
        },
    },
});
