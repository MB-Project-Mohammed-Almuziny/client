import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { theme } from "./styles/muiThemes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/LogIn" element={<Login />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
