import React from "react";
import { Routes, Route } from "react-router-dom";

// import auth ilustration layout
import AuthIlustrationLayout from "@/components/layouts/AuthIlustrationLayout";
// import authentication
import { Login, Register, Confirm, Forgot, Logout, ChangePassword }  from "@/views/authentication";

export default function AuthIlustration() {
  return (
    <AuthIlustrationLayout>
      <Routes>
        {/* authentication  */}
        <Route exact path="/login/*" element={<Login />} />
        <Route exact path="/register/*" element={<Register />} />
        <Route exact path="/logout/*" element={<Logout />} />
        <Route exact path="/forgot/*" element={<Forgot />} />
        <Route exact path="/confirm/*" element={<Confirm />} />
        <Route exact path="/change-password/*" element={<ChangePassword />} />
      </Routes>
    </AuthIlustrationLayout>
  );
}