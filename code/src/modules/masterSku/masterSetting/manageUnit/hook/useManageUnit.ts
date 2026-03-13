import { useEffect, useState } from 'react';
import type { ICreatePopupMode, IGetAllUnit, IGetAllUnitRes, IUnitItem } from '../interface/manageUnit.interface';
import z from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';
import { useNavigate } from 'react-router';
import { getAllManageUnit } from '../service/ManageUnitApi';
import { useQuery } from '@tanstack/react-query';

const getAllMock = {
    total: 30,
    list: [
        { id: 1, name: 'มิลลิลิตร', unit: 'มล.' },
        { id: 2, name: 'ลิตร', unit: 'ลิตร' },
        { id: 3, name: 'กรัม', unit: 'กรัม' },
        { id: 4, name: 'กิโลกรัม', unit: 'กก.' },
        { id: 5, name: 'ช้อนชา', unit: 'ชช.' },
        { id: 6, name: 'ช้อนโต๊ะ', unit: 'ชต.' },
        { id: 7, name: 'ถ้วยตวง', unit: 'ถ้วย' },
        { id: 8, name: 'กล่อง', unit: 'กล่อง' },
        { id: 9, name: 'แพ็ค', unit: 'แพ็ค' },
        { id: 10, name: 'ชิ้น', unit: 'ชิ้น' },
        { id: 11, name: 'แท่ง', unit: 'แท่ง' },
        { id: 12, name: 'ฝัก', unit: 'ฝัก' },
        { id: 13, name: 'ใบ', unit: 'ใบ' },
        { id: 14, name: 'หัว', unit: 'หัว' },
        { id: 15, name: 'เส้น', unit: 'เส้น' },
        { id: 16, name: 'หยด', unit: 'หยด' },
        { id: 17, name: 'ปี๊บ', unit: 'ปี๊บ' },
        { id: 18, name: 'ลัง', unit: 'ลัง' },
        { id: 19, name: 'โหล', unit: 'โหล' },
        { id: 20, name: 'คู่', unit: 'คู่' },
        { id: 21, name: 'ม้วน', unit: 'ม้วน' },
        { id: 22, name: 'ก้อน', unit: 'ก้อน' },
        { id: 23, name: 'ถุง', unit: 'ถุง' },
        { id: 24, name: 'ห่อ', unit: 'ห่อ' },
        { id: 25, name: 'ปอนด์', unit: 'ปอนด์' },
        { id: 26, name: 'นิ้ว', unit: 'นิ้ว' },
        { id: 27, name: 'เมตร', unit: 'ม.' },
        { id: 28, name: 'เซนติเมตร', unit: 'ซม.' },
        { id: 29, name: 'มิลลิเมตร', unit: 'มม.' },
        { id: 30, name: 'กิโลเมตร', unit: 'กม.' }
    ]
};

export const useManageUnit = () => {
    const [searchText, setsearchText] = useState<string>('');
    // const [getAllData, setgetAllData] = useState<IGetAllUnit>();
    // const [isLoad, setisLoad] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const [openCreatePopup, setopenCreatePopup] = useState<boolean>(false);
    const navigate = useNavigate();
    const [createPopupMode, setcreatePopupMode] = useState<ICreatePopupMode>('create');
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('20');

    const MANAGEUNIT_QUERY_KEYS = {
        getAll: ['manageUnit', page, limit]
    }

    const handleOpenCreatePopup = (mode: ICreatePopupMode, row?: IUnitItem) => {
        if (row && mode === 'view') {
            setcreatePopupMode('view');
            setValue('unitName', row.name);
            setValue('abbUnitName', row.unit);
        } else {
            setcreatePopupMode('create');
        }
        setopenCreatePopup(true);
    };
    const handleCloseCreatePopup = () => {
        reset();
        setopenCreatePopup(false);
    };

    const mapUnitResponseToMock = (res: IGetAllUnitRes): IGetAllUnit => {
        return {
            total: Number(res.total_items),
            list: res.units.map((u, index) => ({
                id: index + 1,
                name: u.unit_name,
                unit: u.unit_short_name // หรือถ้ามี field ตัวย่อ ค่อยมาเปลี่ยน
            }))
        };
    };

    const {
        data: getAllData,
        isLoading: isLoad,
        isError,
        refetch
    } = useQuery<IGetAllUnitRes, Error, IGetAllUnit>({
        queryKey: MANAGEUNIT_QUERY_KEYS.getAll,
        queryFn: () => getAllManageUnit(page, limit),
        select: mapUnitResponseToMock,
        staleTime: 1000 * 60 * 3
    })

    const createUnitApi = async () => {
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

    const putUnitApi = async () => {
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
        unitName: z.string().min(1, 'กรุณากรอก ชื่อหน่วย'),
        abbUnitName: z.string().min(1, 'กรุณากรอก หน่วยย่อย')
    });

    type FormValues = z.infer<typeof documentSchema>;

    const methods: UseFormReturn<FormValues> = useForm<FormValues>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            unitName: '',
            abbUnitName: ''
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
            createUnitApi();
        } else {
            putUnitApi();
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

export type IuseManageUnit = ReturnType<typeof useManageUnit>;
