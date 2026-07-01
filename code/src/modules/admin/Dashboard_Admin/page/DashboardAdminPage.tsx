import React from 'react';
import { useFetchDashboardAdmin } from '../hook/useFetchDashboardAdmin';
import HeadDashboard from '../components/page/HeadDashboard';
import FilterDashboard from '../components/page/FilterDashboard';
import DetailDashboard from '../components/page/DetailDashboard';

export interface IDashboardAdminPageProps {};

const DashboardAdminPage: React.FunctionComponent<IDashboardAdminPageProps> = () => {
    const mastercontroller = useFetchDashboardAdmin ()
    return (
        <>
        <HeadDashboard mastercontroller={mastercontroller} />
        <FilterDashboard mastercontroller={mastercontroller} />
        <DetailDashboard mastercontroller={mastercontroller} />
        </>
    )
};

export default DashboardAdminPage;
