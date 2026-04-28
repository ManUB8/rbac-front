import React from "react";
import Header_Activity from "../components/page/Header_Activity";
import Info_Activity from "../components/page/Info_Activity";
import { useActivityFetch } from "../hook/useActivityFetch";

export interface IActivityPageProps {}

const StudentActivityPage: React.FunctionComponent<IActivityPageProps> = () => { 
  const Master_Activity = useActivityFetch()
    
  return (
    <>
      <Header_Activity/>
      <Info_Activity Master_Activity = {Master_Activity}/>
    </>
  );
};

export default StudentActivityPage;
