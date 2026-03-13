import { useEffect, useState } from 'react';
import type { ICreatePopupMode, IGetAllStorageTypeRes, IGetAllTemp, ITempItem } from '../interface/manageTemp.interface';
import z from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';
import { useNavigate } from 'react-router';
import { getAllManageTemp } from '../service/ManageTempApi';
import { useQuery } from '@tanstack/react-query';

const getAllMock = {
    total: 20,
    list: [
        { id: 1, name: 'ไม่กำหนด', temp: 'None' },
        { id: 2, name: 'แช่เย็น (ผักสด)', temp: '2–5 °C' },
        { id: 3, name: 'แช่แข็ง (เนื้อสัตว์)', temp: '-18 to -22 °C' },
        { id: 4, name: 'อุณหภูมิห้อง', temp: '25–28 °C' },
        { id: 5, name: 'อุ่นร้อน (พร้อมเสิร์ฟ)', temp: '55–65 °C' },

        { id: 6, name: 'แช่เย็น (นม/ผลิตภัณฑ์นม)', temp: '1–4 °C' },
        { id: 7, name: 'แช่แข็ง (ซีฟู้ด)', temp: '-20 °C' },
        { id: 8, name: 'เก็บแบบชื้น', temp: '18–22 °C / ความชื้น 60%' },
        { id: 9, name: 'แช่เย็น (ผลไม้)', temp: '5–8 °C' },
        { id: 10, name: 'ตู้ร้อน', temp: '60–70 °C' },

        { id: 11, name: 'ไม่กำหนด', temp: 'None' },
        { id: 12, name: 'แช่เย็น (วัตถุดิบสด)', temp: '0–3 °C' },
        { id: 13, name: 'แช่แข็งลึก', temp: '-25 °C' },
        { id: 14, name: 'อุณหภูมิห้อง (ของแห้ง)', temp: '23–27 °C' },
        { id: 15, name: 'ร้อนจัด', temp: '70–85 °C' },

        { id: 16, name: 'แช่เย็น (น้ำปรุง/ซอส)', temp: '3–5 °C' },
        { id: 17, name: 'แช่แข็ง (ของพร้อมปรุง)', temp: '-18 °C' },
        { id: 18, name: 'เก็บในที่มืด', temp: '20–25 °C' },
        { id: 19, name: 'อุณหภูมิร้านหน้าเคาน์เตอร์', temp: '26–30 °C' },
        { id: 20, name: 'ตู้ไอน้ำ / ตู้ติ่มซำ', temp: '75–90 °C' }
    ]
};

export const useManageTemp = () => {
    const [searchText, setsearchText] = useState<string>('');
    // const [getAllData, setgetAllData] = useState<IGetAllTemp>();
    // const [isLoad, setisLoad] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const [openCreatePopup, setopenCreatePopup] = useState<boolean>(false);
    const navigate = useNavigate();
    const [createPopupMode, setcreatePopupMode] = useState<ICreatePopupMode>('create');
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('20');

    const MANAGETEMP_QUERY_KEYS = {
        getAll: [page, limit]
    }

    const handleOpenCreatePopup = (mode: ICreatePopupMode, row?: ITempItem) => {
        if (row && mode === 'view') {
            setcreatePopupMode('view');
            setValue('name', row.name);
            setValue('temp', row.temp);
        } else {
            setcreatePopupMode('create');
        }
        setopenCreatePopup(true);
    };
    const handleCloseCreatePopup = () => {
        reset();
        setopenCreatePopup(false);
    };

    const mapStorageTypeResponseToTempMock = (res: IGetAllStorageTypeRes): IGetAllTemp => {
        return {
            total: Number(res.total_items),
            list: res.storage_types.map((s, index) => ({
                id: index + 1,
                name: s.storage_type_name,
                temp: s.temperature_type
            }))
        };
    };

    const {
        data: getAllData,
        isLoading: isLoad,
        isError,
        refetch
    } = useQuery<IGetAllStorageTypeRes, Error, IGetAllTemp>({
        queryKey: MANAGETEMP_QUERY_KEYS.getAll,
        queryFn: () => getAllManageTemp(page, limit),
        select: mapStorageTypeResponseToTempMock,
        staleTime: 1000 * 60 * 3
    })

    const createTempApi = async () => {
        if (isLoad) return;
        // setisLoad(true);
        try {
            const res = await new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(true), 2000);
            });

            if (res) {
                console.log('success create');
                // setisLoad(false);
                handleCloseCreatePopup();
                openNotificationSuccess('bottom');
                // getAll();
                // navigate(0);
            }
        } catch {
            // setisLoad(false);
        }
    };

    const putTempApi = async () => {
        if (isLoad) return;
        // setisLoad(true);
        try {
            const res = await new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(true), 2000);
            });

            if (res) {
                console.log('success put');
                // setisLoad(false);
                handleCloseCreatePopup();
                openNotificationSuccess('bottom');
                // getAll();
                // navigate(0);
            }
        } catch {
            // setisLoad(false);
        }
    };

    const documentSchema = z.object({
        name: z.string().min(1, 'กรุณากรอก ชื่อการเก็บรักษา	'),
        temp: z.string().min(1, 'กรุณากรอก อุณหภูมิ')
    });

    type FormValues = z.infer<typeof documentSchema>;

    const methods: UseFormReturn<FormValues> = useForm<FormValues>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            name: '',
            temp: ''
        },
        mode: 'all'
    });

    const { control, handleSubmit, setValue, getValues, formState, trigger, watch, reset } = methods;

    const openNotification = (placement: NotificationPlacement) => {
        api.error({
            message: '',
            description: 'กระณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
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
        if (createPopupMode === 'create') {
            createTempApi();
        } else {
            putTempApi();
        }
    };

    const onError = (errors: any) => {
        console.log('❌ ฟอร์มมี error:', errors);
        openNotification('bottom');
    };


    return {
        searchText,
        isLoad,
        getAllData,
        methods,
        onSubmit,
        onError,
        watch,

        openCreatePopup,
        handleOpenCreatePopup,
        handleCloseCreatePopup,
        contextHolder,

        page,
        setPage,
        limit,
        setLimit
    };
};

export type IuseManageTemp = ReturnType<typeof useManageTemp>;
