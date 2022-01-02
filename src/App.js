import { useEffect } from "react";
import { Routes, Route } from "react-router";
import io from "socket.io-client";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { HeaderComponent } from "./components/HeaderComponent";
import { Home } from "./pages/Home";
import { CoursesByCategory } from "./pages/CoursesByCategory";
import { CoursesByTerm } from "./pages/CoursesByTerm";
import { CreateCourse } from "./pages/CreateCourse";
import { CourseSetting } from "./pages/CourseSetting";
import { CourseInfo } from "./pages/CourseInfo";
import { CourseLearn } from "./pages/CourseLearn";
import { UserSetting } from "./pages/UserSetting";
import { UserInfo } from "./pages/UserInfo";
import { Chats } from "./pages/Chats";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { theme } from "./styles/muiThemes";

let socket;
let CONNECTION_PORT = process.env.REACT_APP_BASE_URL;

function App() {
  const connectRoom = () => {
    socket.emit("join_room", { userName: "user", room: "roomid " });
  };

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    connectRoom();
  }, [CONNECTION_PORT]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CoursesByCategory />} />
          <Route path="/search/:term" element={<CoursesByTerm />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/course/learn/:courseId" element={<CourseLearn />} />
          <Route path="/course/setting/:courseId" element={<CourseSetting />} />
          <Route path="/course/:courseId" element={<CourseInfo />} />
          <Route path="/user/setting" element={<UserSetting />} />
          <Route path="/user/:user_id" element={<UserInfo />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/register" element={<Register />} />
          <Route path="/LogIn" element={<Login />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
