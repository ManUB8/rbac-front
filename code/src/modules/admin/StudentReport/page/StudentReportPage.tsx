import React from 'react';
import { useFetchStudentReport } from '../hook/useFetchStudentReport';
import FilterStudentReport from '../components/page/FilterStudentReport';
import HeadStudentReport from '../components/page/HeadStudentReport';
import DetailStudentReport from '../components/page/DetailStudentReport';
import StudentReport from '../components/page/StudentReport';

export interface IStudentReportPageProps { };

const StudentReportPage: React.FunctionComponent<IStudentReportPageProps> = props => {
    const mastercontroller = useFetchStudentReport()
    return (
        <>
            <HeadStudentReport />
            <FilterStudentReport mastercontroller={mastercontroller} />
            <StudentReport mastercontroller={mastercontroller} />
            <DetailStudentReport mastercontroller={mastercontroller} />
        </>
    )
};

export default StudentReportPage;