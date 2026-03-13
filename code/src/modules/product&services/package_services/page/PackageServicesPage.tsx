import React, { useEffect, useMemo, useState } from 'react';
import { useMasterFunctionPackage } from '../hook/useFetchMasterPackage';
import HeaderPackage from '../components/packagepage/HeaderPackage';
import FilterPackage from '../components/packagepage/FilterPackage';
import TablePackage from '../components/packagepage/TablePackage';
export interface IPackageServicesPageProps { };

const PackageServicesPage: React.FunctionComponent<IPackageServicesPageProps> = props => {
    const masterController = useMasterFunctionPackage();
    return (
        <>
            <HeaderPackage masterController={masterController} />
            <FilterPackage masterController={masterController} />
            <TablePackage masterController={masterController} />
        </>
    )
};

export default PackageServicesPage;