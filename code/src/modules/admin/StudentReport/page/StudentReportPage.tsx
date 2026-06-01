import React from "react";
import { useFetchStudentReport } from "../hook/useFetchStudentReport";
import FilterStudentReport from "../components/page/FilterStudentReport";
import HeadStudentReport from "../components/page/HeadStudentReport";
import DetailStudentReport from "../components/page/DetailStudentReport";
import StudentReport from "../components/page/StudentReport";
import StudentReportPrint from "../components/page/StudentReportPrint";

export interface IStudentReportPageProps { }

const StudentReportPage: React.FC<IStudentReportPageProps> = () => {
    const mastercontroller = useFetchStudentReport();

    const handlePrintPdf = () => {
        window.print();
    };

    return (
        <>
            <HeadStudentReport onPrintPdf={handlePrintPdf} />

            <FilterStudentReport mastercontroller={mastercontroller} />
            <StudentReport mastercontroller={mastercontroller} />
            <DetailStudentReport mastercontroller={mastercontroller} />

            <StudentReportPrint student={mastercontroller.report_data} />
        </>
    );
};

export default StudentReportPage;