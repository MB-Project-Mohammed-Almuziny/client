import { Routes, Route } from "react-router";
import { Box } from "@mui/material";

import { Header } from "./components/Header";

function App() {
  return (
    <Box>
      <Header />

      <Routes>
        <Route path="/" element={<> home </>} />
      </Routes>
    </Box>
  );
}

export default App;
