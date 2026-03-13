import React from 'react';
import { useMasterFunctionOwner } from '../hook/useFetchOwner';
import OwnerFilterDrawer from '../components/Filter/OwnerFilterDrawer';
import HeaderOwner from '../components/Ownerpage/HeaderOwner';
import FilterOwner from '../components/Ownerpage/FilterOwner';
import TabsOwner from '../components/Ownerpage/TabsOwner';
export interface IOwnerListPageProps { };

const OwnerListPage: React.FunctionComponent<IOwnerListPageProps> = props => {
    const masterController = useMasterFunctionOwner();

    return (
        <>
            <OwnerFilterDrawer
                open={masterController.openFilter}
                onClose={() => masterController.setOpenFilter(false)}
                onApply={() => masterController.reload()}
            />
            <HeaderOwner masterController={masterController} />
            <FilterOwner masterController={masterController} />
            <TabsOwner masterController={masterController} />
        </>
    )
};

export default OwnerListPage;