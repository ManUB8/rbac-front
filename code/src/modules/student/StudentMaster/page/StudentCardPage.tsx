import React from "react";
import { useStudentFetch } from "../hook/useFetchStudent";
import Header_Student from "../components/page/Header_Student";
import Info_Student from "../components/page/Info_Student";

export interface IStudentCardPageProps {}

const StudentCardPage: React.FunctionComponent<IStudentCardPageProps> = () => {
  const Master_Student = useStudentFetch()
  return (
    <>
  <Header_Student/>
  <Info_Student Master_Student={Master_Student}/>
    </>
  );
};

export default StudentCardPage;
