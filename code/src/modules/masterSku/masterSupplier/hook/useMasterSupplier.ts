import { useEffect, useMemo, useState } from 'react';
import type { DropDownOption, IGetAllProduct, IGetAllSupplier, IGetAllSupplierProductsRes, IGetAllSupplierRes, IGroupFilter, ITabSelect, SortGroup } from '../interface/MasterSupplier.interface';
import { notification } from 'antd';
import z from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { getAllMasterSupplier, getAllMasterSupplierProduct } from '../service/MasterSupplierApi';
import { useDebouncedEffect } from '../../../../shared/components/hooks/useDebound';
import { useQuery } from '@tanstack/react-query';

const tabList = [
    { value: 0, label: 'รายชื่อ Supplier' },
    { value: 1, label: 'สินค้า Supplier' }
];

const sortFilterList: SortGroup[] = [
    {
        title: 'วันที่สร้าง',
        options: [
            { label: 'ใหม่ไปเก่า', value: 2 },
            { label: 'เก่าไปใหม่', value: 1 }
        ]
    },
    {
        title: 'ชื่อ',
        options: [
            { label: 'A → Z (น้อยไปมาก)', value: 3 },
            { label: 'Z → A (มากไปน้อย)', value: 4 }
        ]
    }
];

const groupFilterList: IGroupFilter[] = [
    {
        groupname: 'วัตถุดิบ',
        grouplist: [
            { label: 'หมู', value: 0 },
            { label: 'ไก่', value: 1 }
        ]
    },
    {
        groupname: 'เครื่องดื่ม',
        grouplist: [
            { label: 'เครื่องดื่มสีแดง', value: 3 },
            { label: 'เครื่องดื่มสีดำ', value: 4 }
        ]
    }
];

const statusFilterList: DropDownOption[] = [
    { label: 'เปิดใช้งาน', value: 0 },
    { label: 'ปิดใช้งาน', value: 1 }
];

const salerFilterList: DropDownOption[] = [
    { label: 'แม็คโคร สาขา เสนานิคม', value: 0 },
    { label: 'โลตัส สาขา เสนานิคม', value: 1 },
    { label: 'Freshket', value: 2 }
];

const mappingFilterList: DropDownOption[] = [
    { label: 'ผูกสินค้า', value: 0 },
    { label: 'ยังไม่ผูกสินค้า', value: 1 }
];

export const useMasterSupplier = () => {
    const [tabSelect, settabSelect] = useState<ITabSelect>(tabList[0]);
    const [searchText, setsearchText] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<number>(sortFilterList[0].options[0].value);
    const [selectGroup, setselectGroup] = useState<number[]>([]);
    const [selectedStatus, setselectedStatus] = useState<number[]>([]);
    const [selectedSaler, setselectedSaler] = useState<number[]>([]);
    const [selectedMapping, setselectedMapping] = useState<number[]>([]);
    // const [masterSupplier, setmasterSupplier] = useState<IGetAllSupplier>();
    // const [masterProductSupplier, setmasterProductSupplier] = useState<IGetAllProduct>();
    // const [isLoad, setisLoad] = useState<boolean>(false);
    const [openConfirmPopup, setopenConfirmPopup] = useState<boolean>(false);
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('20');

    const MASTERSUPPLIER_QUERY_KEYS = {
        getAll: ['masterSupplier', tabSelect.value, page, limit, selectedStatus, selectedSort],
        getAllProduct: ['masterProduct', tabSelect.value, page, limit, selectedStatus, selectedSort]
    };

    const handleOpenConfirmPopup = () => setopenConfirmPopup(true);
    const handleCloseConfirmPopup = () => setopenConfirmPopup(false);

    const handleChangeTab = (value: number) => {
        const found = tabList.find((item) => item.value === value);
        if (found) {
            settabSelect(found);
            clearAll();
        }
    };

    const currentSort = useMemo(() => {
        for (const g of sortFilterList) {
            const f = g.options.find((o) => o.value === selectedSort);
            if (f) return { ...f, groupTitle: g.title };
        }
        return { label: '', value: selectedSort, groupTitle: '' };
    }, [selectedSort]);

    const onChangeSort = (val: number) => setSelectedSort(val);
    const onChangeGroup = (next: number[]) => setselectGroup(next);
    const onChangeStatus = (next: number[]) => setselectedStatus(next);
    const onChangeSaler = (next: number[]) => setselectedSaler(next);
    const onChangeMapping = (next: number[]) => setselectedMapping(next);

    const mapSupplierResponseToMock = (res: IGetAllSupplierRes): IGetAllSupplier => {
        return {
            total: Number(res.total_items),
            list: res.items.map((item, index) => ({
                id: index + 1,
                code: item.supplier_code,
                name: item.company_name,
                TypeOfBusiness: item.business_structure_name,
                businessType: item.business_type_name,
                total: item.supplier_product_amount,
                status: item.is_active.is_active
                    ? statusFilterList[0] // เปิดใช้งาน
                    : statusFilterList[1] // ปิดใช้งาน
            }))
        };
    };

    const mapSupplierProductResponseToMock = (res: IGetAllSupplierProductsRes): IGetAllProduct => {
        return {
            total: Number(res.total_items),
            list: res.supplier_products.map((p, index) => ({
                id: index + 1,
                name: p.supplier_product_name, // ชื่อสินค้า
                saler: p.company_name, // ใช้เป็นชื่อผู้ขาย (saler)
                unit: p.purchase_unit_per_stock_unit, // หน่วย + ปริมาณ
                mapping: p.mapping, // "ผูกสินค้า"
                status:
                    p.status.status === '1'
                        ? statusFilterList[0] // เปิดใช้งาน
                        : statusFilterList[1] // ปิดใช้งาน (ถ้ามีในอนาคต)
            }))
        };
    };

    const status = useMemo(() => {
        if (selectedStatus.length > 1) return '0';
        if (selectedStatus.length === 1) return (selectedStatus[0] + 1).toString();
        return '0';
    }, [selectedStatus]);

    const {
        data: masterSupplier,
        isLoading: isLoadSupplier,
        isError: isErrorSupplier,
        refetch: refetchSupplier
    } = useQuery<IGetAllSupplierRes, Error, IGetAllSupplier>({
        queryKey: MASTERSUPPLIER_QUERY_KEYS.getAll,

        queryFn: () => getAllMasterSupplier(searchText, page, limit, status, selectedSort?.toString()),
        select: mapSupplierResponseToMock,
        // staleTime: 1000 * 60 * 3,
        enabled: tabSelect.value === 0
    });

    const {
        data: masterProductSupplier,
        isLoading: isLoadProduct,
        isError: isErrorProduct,
        refetch: refetchProduct
    } = useQuery<IGetAllSupplierProductsRes, Error, IGetAllProduct>({
        queryKey: MASTERSUPPLIER_QUERY_KEYS.getAllProduct,
        queryFn: () => getAllMasterSupplierProduct(searchText, page, limit),
        select: mapSupplierProductResponseToMock,
        // staleTime: 1000 * 60 * 3,
        enabled: tabSelect.value === 1
    });

    const isLoad = isLoadSupplier || isLoadProduct;
    const isError = isErrorSupplier || isErrorProduct;

    const [api, contextHolder] = notification.useNotification();

    const importMasterSupplier = async () => {
        if (isLoad) return;
        // setisLoad(true);
        try {
            const res = await new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(true), 2000);
            });

            if (res) {
                console.log('success create');
                // setisLoad(false);
                handleCloseConfirmPopup();
                openNotificationSuccess('bottom');
            }
        } catch {
            // setisLoad(false);
        }
    };

    const documentSchema = z.object({
        url: z.string().min(1, 'กรุณากรอก URL')
    });

    type FormValues = z.infer<typeof documentSchema>;

    const methods: UseFormReturn<FormValues> = useForm<FormValues>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            url: ''
        },
        mode: 'all'
    });
    const { control, handleSubmit, setValue, getValues, formState, trigger, watch } = methods;

    const openNotification = (placement: NotificationPlacement) => {
        api.error({
            message: '',
            description: 'กรุณากรอกข้อมูลที่จำเป็น',
            placement: 'bottom',
            className: 'my-noti-wrapper my-noti-error'
        });
    };

    const openNotificationSuccess = (placement: NotificationPlacement) => {
        api.success({
            message: '',
            description: 'บันทึกสำเร็จ',
            placement: 'bottom',
            className: 'my-noti-wrapper my-noti-success'
        });
    };

    const onSubmit = (data: FormValues) => {
        console.log('✅ ส่งข้อมูล:', data);
        importMasterSupplier();
    };

    const onError = (errors: any) => {
        console.log('❌ ฟอร์มมี error:', errors);
        openNotification('bottom');
    };

    const clearAll = () => {
        setsearchText('');
        setPage('1');
        setLimit('20');
    };


    useDebouncedEffect(() => {
        console.log('search ', searchText);
        if (tabSelect.value === 0) {
            refetchSupplier();
        } else {
            refetchProduct();
        }
    }, [searchText]);

    return {
        isLoad,
        tabSelect,
        settabSelect,
        tabList,
        handleChangeTab,

        searchText,
        setsearchText,
        currentSortLabel: currentSort.label,
        sortFilterList,
        selectedSort,
        onChangeSort,
        selectedStatus,
        onChangeStatus,
        statusFilterList,
        selectedSaler,
        onChangeSaler,
        salerFilterList,
        selectedMapping,
        onChangeMapping,
        mappingFilterList,

        masterSupplier,
        masterProductSupplier,

        groupFilterList,
        selectGroup,
        onChangeGroup,

        openConfirmPopup,
        handleOpenConfirmPopup,
        handleCloseConfirmPopup,

        control,
        onError,
        methods,
        onSubmit,
        contextHolder,

        page,
        setPage,
        limit,
        setLimit
    };
};

export type IuseMasterSupplier = ReturnType<typeof useMasterSupplier>;
