import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { StreamerPage } from "./pages/streamerPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/streamer" element={<StreamerPage />} />
    </Routes>
  );
};
