import React from "react";
import { Routes, Route } from "react-router-dom";

// import auth layout
import AuthLayout from '@/components/layouts/AuthLayout';
// import authentication
import { Login, Register, Confirm, Forgot, Logout, ChangePassword }  from "@/views/authentication";

export default function Auth() {
  return (
    <AuthLayout>
      <Routes>
        {/* authentication  */}
        <Route exact path="/login/*" element={<Login />} />
        <Route exact path="/register/*" element={<Register />} />
        <Route exact path="/logout/*" element={<Logout />} />
        <Route exact path="/forgot/*" element={<Forgot />} />
        <Route exact path="/confirm/*" element={<Confirm />} />
        <Route exact path="/change-password/*" element={<ChangePassword />} />
      </Routes>
    </AuthLayout>
  );
}