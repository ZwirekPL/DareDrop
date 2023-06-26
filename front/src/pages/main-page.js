import React from "react";
import { NavLink } from "react-router-dom";
import { StreamersTable } from "../components/lists/streamers-list";
import { AddProductModal } from "../components/form/streamer-submission-form";
import { PageLayout } from "../components/layout/page-layout";

export const MainPage = () => {
  return (
    <PageLayout>
      <div className="mainPage-body">
        <StreamersTable />
        <AddProductModal />
      </div>
    </PageLayout>
  );
};
