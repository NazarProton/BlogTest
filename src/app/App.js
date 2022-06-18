import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import Navbar from "./components/navBar";
import PostsListPage from "./components/PostsListPage";
import Login from "./components/login";
import Users from "./components/users";
import LogOut from "./components/logOut";

function App() {
  return (
    <div className="container_general">
      <Navbar></Navbar>
      <Routes>
        <Route path="users/*" element={<Users />}>
          <Route path=":userId/:edit" element={<Users />} />
          <Route path=":userId" element={<Users />} />
        </Route>
        <Route path="posts/*" element={<PostsListPage />}>
          <Route path=":posts/:edit" element={<PostsListPage />} />
          <Route path=":posts" element={<PostsListPage />} />
        </Route>
        <Route path="login/*" element={<Login />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
