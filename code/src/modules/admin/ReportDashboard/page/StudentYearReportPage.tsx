import React from 'react';
import { useFetchMasterStudentYearReport } from '../hook/useFetchStudentYearReport';
import HeadStudentYearReport from '../components/page/HedeStudentYearReport';
import FilterStudentYearReport from '../components/page/FilterStudentYearReport';
import TableStudentYearReport from '../components/page/TableStudentYearReport';

export interface IStudentYearReportPageProps { };

const StudentYearReportPage: React.FunctionComponent<IStudentYearReportPageProps> = props => {
    const mastercontroller = useFetchMasterStudentYearReport()
    return (
        <>
            <HeadStudentYearReport mastercontroller={mastercontroller} />
            <FilterStudentYearReport mastercontroller={mastercontroller} />
            <TableStudentYearReport mastercontroller={mastercontroller} />
        </>
    )
};

export default StudentYearReportPage;