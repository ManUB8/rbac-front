import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useEffect, useRef, useState } from 'react';
import type { IuseManageInvenCreate } from './useManageInvenCreate';

export const useManageInvenEditImg = (useManageInvenCreateController: IuseManageInvenCreate) => {
    const fileInputRef = useRef<any>(null);
    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(useManageInvenCreateController.imgFile ?? null);

    const [ownedUrl, setOwnedUrl] = useState<string | null>(null);

    const [api, contextHolder] = notification.useNotification();
    const hasImage = Boolean(previewUrl);

    const openNotification = (placement: NotificationPlacement) => {
        api.error({
            message: 'ผิดพลาด',
            description: 'ไฟล์มีขนาดเกิน 10 MB กรุณาเลือกไฟล์ที่เล็กกว่านี้',
            placement
        });
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        if (!f) return;

        if (!f.type.startsWith('image/')) {
            console.warn('ชนิดไฟล์ไม่ใช่รูปภาพ');
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (f.size > maxSize) {
            openNotification('bottomRight');
            return;
        }

        if (ownedUrl) URL.revokeObjectURL(ownedUrl);

        const url = URL.createObjectURL(f);
        setOwnedUrl(url);
        setFile(f);
        setPreviewUrl(url);

        const img = new Image();
        img.onload = () => {
            setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = url;
    };

    const fileToDataUrl = (f: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(f);
        });

    const handleConfirm = async () => {
        console.log('previewurl ', previewUrl);

        if (file) {
            useManageInvenCreateController.setValue('icon', previewUrl?.toString());
            const dataUrl = await fileToDataUrl(file);
            useManageInvenCreateController.setimgFile(dataUrl);
        } else {
            useManageInvenCreateController.setimgFile(previewUrl || undefined);
        }

        useManageInvenCreateController.handleCloseEditImgPopup();
    };

    const handleRemove = () => {
        if (ownedUrl) URL.revokeObjectURL(ownedUrl);
        setOwnedUrl(null);
        setPreviewUrl(null);
        setFile(null);
        setImageSize(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        // ถ้าต้องการเคลียร์ค่าข้างนอกด้วย ให้เปิดบรรทัดนี้
        // setimgFile(undefined);
        // setValue('icon', undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    };

    useEffect(() => {
        setPreviewUrl(useManageInvenCreateController.imgFile ?? null);
        setImageSize(null);
    }, [useManageInvenCreateController.openEditImgPopup, useManageInvenCreateController.imgFile]);

    useEffect(() => {
        return () => {
            if (ownedUrl) URL.revokeObjectURL(ownedUrl);
        };
    }, [ownedUrl]);

    return {
        contextHolder,
        handleConfirm,
        handleRemove,
        previewUrl,
        imageSize,
        handleClick,
        hasImage,
        fileInputRef,
        handleFileChange,
        
    };
};

export type IuseManageInvenEditImg = ReturnType<typeof useManageInvenEditImg>;
