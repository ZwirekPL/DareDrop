import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
