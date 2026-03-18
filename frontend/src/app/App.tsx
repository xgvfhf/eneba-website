// src/app/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/app/components/HomePage";
import SavedPage from "@/app/components/SavedPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
