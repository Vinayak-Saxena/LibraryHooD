import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminProfile from "./pages/Profile/Admin";
import Login from "./pages/ULogin/Login";
import SignUp from "./pages/SignUp/SignUp";
import NavBar from "./components/nav bar/NavBar";
import AboutUs from "./components/AboutUs/AboutUs";
import User from "./pages/Profile/User";
import Test from "./pages/Test/Test";
import PrivateRoutes from "./hooks/PrivateRoutes";
export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Test />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
      <AboutUs />
    </BrowserRouter>
  );
}
