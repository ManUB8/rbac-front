import React from "react";
import ActivityFrom from "../components/From/ActivityFrom";
import { useActivityFetch } from "../hook/useFetchActivity";
import HeadActivity from "../components/page/HeadActivity";
import ActivityTable from "../components/page/ActivityTable";

export interface IActivityManagePageProps {}

const ActivityManagePage: React.FunctionComponent<IActivityManagePageProps> = () => {
  const master = useActivityFetch();

  return (
    <>
      <HeadActivity master={master} />
      <ActivityTable master={master} />
      <ActivityFrom master={master} />
    </>
  );
};

export default ActivityManagePage;