import { Box } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import SearchOrder from '../../../../../shared/components/search/SearchOrder';
import { useAtom } from 'jotai';
// import { useHandleChangeSearch } from '../../../../product&services/package_services/hook/handleFunction';
import DropDownFilter from './DropDowndFilter';
import type { DropDownOption, IGroupFilter, ITabSelect, SortGroup } from '../../interface/MasterSupplier.interface';
import DropDownGroupFilter from './DropDownGroupFilter';
import SortFilter from './SortFilter';
import type { IuseMasterSupplier } from '../../hook/useMasterSupplier';

export interface IFilterProps {
    useMasterSupplierController: IuseMasterSupplier;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
    return (
        <Box display={'flex'} gap={2}>
            <Box width={'360px'}>
                <SearchOrder
                    searchValue={props.useMasterSupplierController.searchText}
                    handleChangeSearch={(e: any) => {
                        props.useMasterSupplierController.setPage('1');

                        const sear = e.target.value;
                        console.log('SearchOrder', sear);
                        props.useMasterSupplierController.setsearchText(sear);
                        
                    }}
                />
            </Box>
            {props.useMasterSupplierController.tabSelect.value === 0 && (
                <SortFilter
                    onChangeSort={props.useMasterSupplierController.onChangeSort}
                    sortFilter={{ title: '', label: props.useMasterSupplierController.currentSortLabel, value: props.useMasterSupplierController.selectedSort }}
                    sortFilterList={props.useMasterSupplierController.sortFilterList}
                />
            )}
            {/* {props.useMasterSupplierController.tabSelect.value === 1 && (
                <DropDownGroupFilter
                    label="หมวดหมู่สินค้า"
                    groupFilterList={props.useMasterSupplierController.groupFilterList}
                    selectGroup={props.useMasterSupplierController.selectGroup}
                    onChange={props.useMasterSupplierController.onChangeGroup}
                />
            )} */}

            {props.useMasterSupplierController.tabSelect.value === 0 && (
                <DropDownFilter
                    label="สถานะ"
                    groupFilterList={props.useMasterSupplierController.statusFilterList}
                    selectGroup={props.useMasterSupplierController.selectedStatus}
                    onChange={props.useMasterSupplierController.onChangeStatus}
                />
            )}

            {/* {props.useMasterSupplierController.tabSelect.value === 1 && (
                <>
                    <DropDownFilter
                        label="ผู้ขาย"
                        groupFilterList={props.useMasterSupplierController.salerFilterList}
                        selectGroup={props.useMasterSupplierController.selectedSaler}
                        onChange={props.useMasterSupplierController.onChangeSaler}
                    />
                    <DropDownFilter
                        label="Mapping"
                        groupFilterList={props.useMasterSupplierController.mappingFilterList}
                        selectGroup={props.useMasterSupplierController.selectedMapping}
                        onChange={props.useMasterSupplierController.onChangeMapping}
                    />
                </>
            )} */}
        </Box>
    );
};

export default Filter;
