import React from "react";
import { Routes, Route } from "react-router-dom";

// import layout admin
import AuthCoverLayout from "@/components/layouts/AuthCoverLayout";
// import authentication
import { Confirm, Forgot, Logout, ChangePassword, Register, Login }  from "@/views/authentication";

export default function AuthCover() {
  return (
    <AuthCoverLayout>
      <Routes>
        {/* authentication  */}
        <Route exact path="/login/*" element={<Login />} />
        <Route exact path="/register/*" element={<Register />} />
        <Route exact path="/logout/*" element={<Logout />} />
        <Route exact path="/forgot/*" element={<Forgot />} />
        <Route exact path="/confirm/*" element={<Confirm />} />
        <Route exact path="/change-password/*" element={<ChangePassword />} />
      </Routes>
    </AuthCoverLayout>
  );
}