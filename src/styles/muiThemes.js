import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: teal,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
