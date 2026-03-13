import { zodResolver } from '@hookform/resolvers/zod';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useEffect, useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';
import { useParams } from 'react-router-dom';
import type { FormValueCreate } from '../interface/ManageInventoryCreate.interface';

const getOneMock = {
    icon: 'https://www.nutritionsc.co.th/wp-content/uploads/2024/05/crop-1702372023279.jpg',
    groupMainName: 'ผลิตภัณฑ์เนื้อสัตว์และนม',
    groupMainCode: 'BP',
    groupSubList: [
        {
            groupSubName: 'ผลิตภัณฑ์เนื้อสัตว์และสัตว์ปีก',
            groupSubCode: '101'
        },
        {
            groupSubName: 'ผลิตภัณฑ์อาหารทะเลและน้ำจืด',
            groupSubCode: '102'
        },
        {
            groupSubName: 'ผลิตภัณฑ์เนื้อสัตว์แปรรูป',
            groupSubCode: '103'
        },
        {
            groupSubName: 'ผลิตภัณฑ์นมและไข่',
            groupSubCode: '104'
        }
    ]
};

export const useManageInvenCreate = () => {
    const { id } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const [openEditImgPopup, setopenEditImgPopup] = useState<boolean>(false);
    const [imgFile, setimgFile] = useState<string>();
    const [isLoad, setisLoad] = useState<boolean>(false);
    const [getOneData, setgetOneData] = useState<FormValueCreate>();
    const [openConfirmPopup, setopenConfirmPopup] = useState<boolean>(false);
    const [openConfirmPutPopup, setopenConfirmPutPopup] = useState<boolean>(false);

    const handleOpenConfirmPopup = () => setopenConfirmPopup(true);
    const handleCloseConfirmPopup = () => setopenConfirmPopup(false);

    const handleOpenConfirmPutPopup = () => setopenConfirmPutPopup(true);
    const handleCloseConfirmPutPopup = () => setopenConfirmPutPopup(false);

    const navigate = useNavigate();

    const handleOpenEditImgPopup = () => setopenEditImgPopup(true);
    const handleCloseEditImgPopup = () => setopenEditImgPopup(false);

    const createInvenApi = async () => {
        if (isLoad) return;
        setisLoad(true);
        try {
            const res = await new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(true), 2000);
            });

            if (res) {
                console.log('success create');
                setisLoad(false);
                navigate(-1);
            }
        } catch {
            setisLoad(false);
        }
    };

    const putInvenApi = async () => {
        if (isLoad) return;
        setisLoad(true);
        try {
            const res = await new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(true), 2000);
            });

            if (res) {
                console.log('success put');
                setisLoad(false);
                navigate(-1);
            }
        } catch {
            setisLoad(false);
        }
    };

    const documentSchema = z.object({
        icon: z.string().optional(),
        groupMainName: z.string().min(1, 'กรุณากรอก ชื่อหมวดหมู่หลัก'),
        groupMainCode: z.string().min(1, 'กรุณากรอก รหัสหมวดหมู่หลัก'),

        groupSubList: z.array(
            z.object({
                groupSubName: z.string().optional(),
                groupSubCode: z.string().optional()
            })
        )
    });

    type FormValues = z.infer<typeof documentSchema>;

    const methods: UseFormReturn<FormValues> = useForm<FormValues>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            icon: '',
            groupMainName: '',
            groupMainCode: '',
            groupSubList: [] // ⬅️ เริ่มต้น 0 รายการ
        },
        mode: 'all'
    });

    const { control, handleSubmit, setValue, getValues, formState, trigger, watch } = methods;

    const openNotification = (placement: NotificationPlacement) => {
        api.error({
            message: '',
            description: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
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
        if (id === '0') {
            // createInvenApi();
            handleOpenConfirmPopup();
        } else {
            // putInvenApi();
            handleOpenConfirmPutPopup();
        }
    };

    const onError = (errors: any) => {
        console.log('❌ ฟอร์มมี error:', errors);
        openNotification('bottom');
    };

    const getOne = async () => {
        if (isLoad) return;
        setisLoad(true);

        try {
            const res = await getOneMock;
            if (res) {
                setgetOneData(res);
                setisLoad(false);
            }
        } catch {
            setisLoad(false);
        }
    };

    useEffect(() => {
        if (id !== '0') {
            getOne();
        }
    }, []);

    useEffect(() => {
        if (id !== '0') {
            console.log('id ', id);
            if (getOneData) {
                setimgFile(getOneData.icon);
                setValue('icon', getOneData?.icon);
                setValue('groupMainName', getOneData?.groupMainName);
                setValue('groupMainCode', getOneData?.groupMainCode);
                setValue('groupSubList', getOneData.groupSubList ?? []);
            }
        }
    }, [getOneData]);

    return {
        methods,
        control,
        onSubmit,
        onError,
        contextHolder,
        watch,
        getValues,

        openEditImgPopup,
        setopenEditImgPopup,
        handleOpenEditImgPopup,
        handleCloseEditImgPopup,
        imgFile,
        setimgFile,
        isLoad,
        setisLoad,
        setValue,

        openConfirmPopup,
        setopenConfirmPopup,
        handleOpenConfirmPopup,
        handleCloseConfirmPopup,
        createInvenApi,

        openConfirmPutPopup,
        handleCloseConfirmPutPopup,
        putInvenApi
    };
};

export type IuseManageInvenCreate = ReturnType<typeof useManageInvenCreate>;
