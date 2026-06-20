import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    CircularProgress,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Swal from "sweetalert2";

import {
    UploadImageActivity,
    UploadImageShopProduct,
    UploadImagePatmentSlip,
} from "../UploadImg/service/UploadImgApi";

export type UploadImageType =
    | "activity"
    | "product"
    | "payment";

interface ImageUploaderProps {
    value?: string;
    label?: string;
    width?: number;
    height?: number;

    type: UploadImageType;

    onChange: (url: string | null) => void;
}

const uploadMap = {
    activity: UploadImageActivity,
    product: UploadImageShopProduct,
    payment: UploadImagePatmentSlip,
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    value,
    onChange,
    label = "No Photo",
    width = 600,
    height = 300,
    type,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [hover, setHover] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);

    const handlePick = () => inputRef.current?.click();

    const clear = () => onChange(null);

    const handleFile: React.ChangeEventHandler<HTMLInputElement> =
        async (e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            try {
                const uploader = uploadMap[type];

                const uploadedUrl =
                    await uploader(formData);

                onChange(uploadedUrl.data.file_url);
            } catch (err: any) {
                console.error(err);

                await Swal.fire({
                    title: "อัปโหลดไฟล์ไม่สำเร็จ",
                    text:
                        err?.message ||
                        err?.response?.data?.detail ||
                        "เกิดข้อผิดพลาด",
                    icon: "warning",
                });
            } finally {
                setUploading(false);

                if (e.target) {
                    e.target.value = "";
                }
            }
        };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <input
                hidden
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFile}
            />

            <Card
                sx={{
                    width,
                    height,
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <CardActionArea
                    disabled={uploading}
                    onClick={handlePick}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {value ? (
                        <CardMedia
                            component="img"
                            image={value}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                bgcolor: "#e5e7eb",
                                display: "grid",
                                placeItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                color="white"
                            >
                                {label}
                            </Typography>
                        </Box>
                    )}
                </CardActionArea>

                {uploading && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,.45)",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <Stack spacing={1}>
                            <CircularProgress />
                            <Typography color="white">
                                กำลังอัปโหลด...
                            </Typography>
                        </Stack>
                    </Box>
                )}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        right: 8,
                        bottom: 8,
                        opacity: hover ? 1 : 0,
                        transition: ".2s",
                    }}
                >
                    <Tooltip title="เปลี่ยนรูป">
                        <IconButton
                            size="small"
                            onClick={handlePick}
                            sx={{
                                bgcolor: "rgba(0,0,0,.5)",
                                color: "white",
                            }}
                        >
                            <PhotoCameraIcon />
                        </IconButton>
                    </Tooltip>

                    {value && (
                        <Tooltip title="ลบรูป">
                            <IconButton
                                size="small"
                                onClick={clear}
                                sx={{
                                    bgcolor: "rgba(0,0,0,.5)",
                                    color: "white",
                                }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Card>
        </Box>
    );
};