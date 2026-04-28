import React from "react";
import ActivityFrom from "../components/From/ActivityFrom";
import { useActivityFetch, useMasterFunctionActivityFromFetch } from "../hook/useFetchActivity";
import HeadActivity from "../components/page/HeadActivity";
import ActivityTable from "../components/page/ActivityTable";

export interface IActivityManagePageProps { }

const ActivityManagePage: React.FC<IActivityManagePageProps> = () => {
  const MasterActivity = useActivityFetch();

  const MasterController = useMasterFunctionActivityFromFetch({
    id: 0,
    openModal: MasterActivity.openModal,
    formMode: MasterActivity.formMode,
    activity_id: MasterActivity.selectedId,
    setOpenModal: MasterActivity.setOpenModal,
    reload: MasterActivity.reload

  });
  return (
    <>
      <HeadActivity MasterActivity={MasterActivity} />
      <ActivityTable
        MasterActivity={MasterActivity}
        MasterController={MasterController}
      />
      <ActivityFrom MasterActivity={MasterActivity} />
    </>
  );
};

export default ActivityManagePage;