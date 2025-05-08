import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import Admin from "@/views/Admin";
import Auth from "@/views/Auth";
import AuthCover from "@/views/AuthCover";
import AuthIlustration from "@/views/AuthIlustration";
import Landing from "@/views/Landing";
import Maintenance from "@/views/Maintenance";
import AdminCompact from '@/views/AdminCompact';
import Sidedark from '@/views/Sidedark';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route path="/*" element={<Admin />} />
        <Route path="/compact/*" element={<AdminCompact />} />
        <Route path="/side-dark/*" element={<Sidedark />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/auth2/*" element={<AuthCover />} />
        <Route path="/auth3/*" element={<AuthIlustration />} />
        <Route path="/landing-page/*" element={<Landing />} />
        <Route path="/maintenance/*" element={<Maintenance />} />
      </Routes>
    </BrowserRouter>
  )
}