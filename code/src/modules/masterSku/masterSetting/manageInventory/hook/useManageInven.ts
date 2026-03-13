import { useEffect, useState } from 'react';
import type { IGetAllGroupMock, IGetAllInven, ITabSelect } from '../interface/ManageInventory.interface';
import { getAllManageInven } from '../service/ManageInvenApi';
import { useQuery } from '@tanstack/react-query';

const tabList = [
    { value: 2, label: 'อาหารและเครื่องปรุง' },
    { value: 1, label: 'ห้องครัวและสินค้าทั่วไป' }
];

export const useManageInven = () => {
    const [tabSelect, settabSelect] = useState<ITabSelect>(tabList[0]);
    const [searchText, setsearchText] = useState<string>('');
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('20');

    const MANAGEINVEN_QUERY_KEYS = {
        getAll: ['manageInven', tabSelect.value, page, limit] //เทียบแทน useeffect
    };

    const handleChangeTab = (value: number) => {
        const found = tabList.find((item) => item.value === value);
        if (found) {
            settabSelect(found);
            clearAll();
        }
    };

    const mapCategoryToGroupMock = (res: IGetAllInven): IGetAllGroupMock => {
        return {
            total: res.total_items, // หรือจาก field อื่นถ้า API มี total ให้มา
            list: res.category.map((cat, catIndex) => ({
                id: catIndex + 1, // หรือ parseInt(cat.category_code) ถ้าอยากผูกกับ code
                goupName: cat.category_name,
                code: cat.category_code,
                subList: cat.sub_category.map((sub, subIndex) => ({
                    id: subIndex + 1, // หรือ parseInt(sub.sub_category_code) ก็ได้
                    name: sub.sub_category_name,
                    code: sub.sub_category_code
                }))
            }))
        };
    };

    const {
        data: masterInvenList,
        isLoading: isLoad,
        isError,
        refetch
    } = useQuery<IGetAllInven, Error, IGetAllGroupMock>({ //interfaceรับApi, error, interfaceReturn 
        queryKey: MANAGEINVEN_QUERY_KEYS.getAll,
        queryFn: () => getAllManageInven(tabSelect.value?.toString(), page, limit),
        select: mapCategoryToGroupMock, // ถ้าไม่ต้อง map หลังบ้านกับหน้าบ้านใช้ data ข้างบนเลย ไม่ต้องมีบรรทัดนี้
        staleTime: 1000 * 60 * 3 //ถ้าไม่ได้มีข้อมูลจากที่อื่น (3min.) หรือ (3s.)
    });

    const clearAll = () => {
        setPage('1');
    };

    return {
        tabSelect,
        handleChangeTab,
        tabList,
        masterInvenList,

        searchText,
        isLoad,
        isError,
        refetch,
        page,
        setPage,
        limit,
        setLimit
    };
};

export type IuseManageInven = ReturnType<typeof useManageInven>;
