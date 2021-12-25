import { Routes, Route } from "react-router";
import { Box } from "@mui/material";

import { Header } from "./components/Header";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function App() {
  return (
    <Box>
      <Header />

      <Routes>
        <Route path="/" element={<> home </>} />
        <Route path="/register" element={<Register />} />
        <Route path="/LogIn" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
