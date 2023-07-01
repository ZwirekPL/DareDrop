import React from "react";
import { StreamersTable } from "../components/lists/streamersList";
import { StreamerSubmissionForm } from "../components/form/streamerSubmissionForm";
import { PageLayout } from "../components/layout/pageLayout";

export const MainPage = () => {
  return (
    <PageLayout>
      <div className="mainPageBody">
        <StreamersTable />
        <StreamerSubmissionForm />
      </div>
    </PageLayout>
  );
};
