import React from "react";
import { StreamersTable } from "../components/lists/streamers-list";
import { StreamerSubmissionForm } from "../components/form/streamer-submission-form";
import { PageLayout } from "../components/layout/page-layout";

export const MainPage = () => {
  return (
    <PageLayout>
      <div className="mainPage-body">
        <StreamersTable />
        <StreamerSubmissionForm />
      </div>
    </PageLayout>
  );
};
