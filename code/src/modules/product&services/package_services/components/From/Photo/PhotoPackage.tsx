import React, { useEffect, useRef, useState } from 'react';
import type {
    FieldErrors,
    UseFormClearErrors,
    UseFormGetValues,
    UseFormSetError,
    UseFormSetValue,
    UseFormWatch
} from 'react-hook-form';
import type { IPackageItem } from '../../../interface/PackageServices.interface';
import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Swal from 'sweetalert2';

import PackageImg from '../../../../../../assets/image/gift-box.png';
import { uploadPackageImage } from '../../../hook/handleFunction';

export interface IPhotoPackageProps {
    getValues: UseFormGetValues<IPackageItem>;
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>;
    clearErrors: UseFormClearErrors<IPackageItem>;
    actype: string;
}

const PhotoPackage: React.FC<IPhotoPackageProps> = ({
    getValues,
    setValue,
}) => {
    // เริ่มต้นพรีวิวจากค่าที่มีในฟอร์ม หากว่างใช้รูป default
    const initial = getValues('package_img');
    const [preview, setPreview] = useState<string>(initial || PackageImg);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // อัปโหลด + อัปเดตฟอร์ม ทันทีที่มีการเลือกไฟล์
    const handleFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // ทำพรีวิวทันทีระหว่างอัปโหลด
        const tempUrl = URL.createObjectURL(file);
        setPreview(tempUrl);
        setUploading(true);

        try {
            const uploadedUrl = await uploadPackageImage(file);

            // เซ็ตค่า URL ลงฟอร์ม (ไม่ต้องรอปุ่มบันทึกในส่วนรูปภาพ)
            setValue('package_img', uploadedUrl, { shouldDirty: true, shouldValidate: true });

            // เอาพรีวิวให้ชี้ไปที่ URL จริง (และลบ temp)
            setPreview(uploadedUrl);
            URL.revokeObjectURL(tempUrl);
        } catch (err: any) {
            // ย้อนกลับพรีวิวเดิมกรณีล้มเหลว
            setPreview(initial || PackageImg);
            await Swal.fire({
                title: 'อัปโหลดไฟล์ไม่สำเร็จ',
                text: err?.error || 'เกิดข้อผิดพลาดระหว่างอัปโหลด',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        } finally {
            setUploading(false);
            // reset เพื่อให้เลือกไฟล์เดิมซ้ำได้
            if (e.target) e.target.value = '';
        }
    };

    const handleClearImage = () => {
        setPreview(PackageImg);
        setValue('package_img', '', { shouldDirty: true, shouldValidate: true });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // ล้าง objectURL ถ้ายังเหลือ blob พรีวิวอยู่ (กัน memory leak)
    useEffect(() => {
        return () => {
            if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Box
                onClick={() => !uploading && fileInputRef.current?.click()}
                sx={{
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    width: 180,
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: uploading ? 1 : 0.85 },
                }}
            >
                <Box
                    component="img"
                    src={preview || PackageImg}
                    alt="package"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />

                {/* ปุ่มลบ (ซ่อนเมื่อกำลังอัปโหลด หรือเป็นรูป default) */}
                {!uploading && preview !== PackageImg && (
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); handleClearImage(); }}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255,255,255,0.9)',
                            '&:hover': { bgcolor: '#fff' },
                        }}
                    >
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                )}

                {/* สถานะกำลังอัปโหลด */}
                {uploading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(255,255,255,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress size={50} sx={{ color: "secondaryContainer" }} />
                    </Box>
                )}
            </Box>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1, fontSize: 14 }}>
                {"แตะเพื่อแก้ไข"}
            </Typography>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFile}
            />
        </Box>
    );
};

export default PhotoPackage;