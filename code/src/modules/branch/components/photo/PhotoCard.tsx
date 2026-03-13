import * as React from 'react';
import {
  Box, Card, CardActionArea, CardMedia, Typography,
  IconButton, Stack, Tooltip,
  CircularProgress
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { CreatePhoto } from '../../service/BranchApi';
import { ApiConfig } from '../../../../shared/service/ApiConfig';
import { HOST_SERVER } from '../../../../shared/service/axiosInstance';

type PhotoCardProps = {
  value?: string | null;                 // URL หรือ base64 ของรูป
  onChange: (url: string | null) => void;
  size?: number;                         // px (สี่เหลี่ยมจัตุรัส)
  label?: string;
};

export const PhotoCard: React.FC<PhotoCardProps> = ({
  value,
  onChange,
  size = 240,
  label = 'No Photo',
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [hover, setHover] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handlePick = () => inputRef.current?.click();

  // ✅ ใช้แทนทั้ง handleFile และ handleUpload
  const handleFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setHover(false);
    setUploading(true)
    try {
      const imgFile = e.target.files?.[0];
      console.log('imgFile', imgFile);
      if (!imgFile) return;

      // (ถ้าต้องการ preview ชั่วคราวระหว่างอัปโหลด ก็ปลดคอมเมนต์)
      // onChange(URL.createObjectURL(imgFile));

      const startUnix = dayjs().startOf('day').unix().toString();
      const data = await CreatePhoto(imgFile, startUnix);
      console.log("data", data)
      // กรณี backend คืน image_name ให้ประกอบเป็น URL เอง
      if (data.image_name) {
        const fileName = String(data.image_name).split('/').pop() || '';
        const uploadedImageUrl = `${HOST_SERVER}` + ApiConfig.UPLOAD_API + `/image-file/` + fileName;
        console.log('uploadedImageUrl', uploadedImageUrl)
        onChange(uploadedImageUrl);
        return;
      }

      // ไม่เจอทั้ง url และ image_name → ถือว่าไม่สำเร็จ
      throw new Error(data.message || 'ไม่พบ URL ของรูปที่อัปโหลด');
    } catch (error: any) {
      await Swal.fire({
        title: 'อัปโหลดไฟล์ไม่สำเร็จ',
        text: error?.message || 'เกิดข้อผิดพลาดระหว่างอัปโหลด',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      // ถ้ามีการ set preview ไปก่อนหน้า อาจอยากล้างกลับ: onChange(null);
    } finally {
      // reset ค่า input ให้สามารถเลือกไฟล์เดิมซ้ำได้
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };
  const clear = () => onChange(null);

  return (
    <Box display="flex" justifyContent="center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />

      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          width: size,
          height: size,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardActionArea onClick={handlePick} sx={{ width: '100%', height: '100%' }}>
          {value ? (
            <CardMedia
              component="img"
              image={value}
              alt="branch-photo"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#e5e7eb',
                display: 'grid',
                placeItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(0px) brightness(0.6)',
                position: 'relative',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  position: 'absolute',
                  color: '#fff',
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                {label}
              </Typography>
            </Box>
          )}
        </CardActionArea>

        {/* ✅ Loading overlay ตอน upload */}
        {uploading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.45)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 2,
            }}
          >
            <Stack spacing={1} alignItems="center">
              <CircularProgress size={50} sx={{ color: "secondaryContainer" }} />
              <Typography variant="body2" sx={{ color: "secondaryContainer", fontWeight: 500 }}>
                {"กำลังอัปโหลด..."}
              </Typography>
            </Stack>
          </Box>
        )}

        {/* overlay ปุ่มตอน hover */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            opacity: hover ? 1 : 0,
            transition: 'opacity .2s',
          }}
        >
          <Tooltip title="เปลี่ยนรูป">
            <IconButton size="small" onClick={handlePick} sx={{ bgcolor: 'rgba(0,0,0,.55)', color: '#fff' }}>
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {value && (
            <Tooltip title="ลบรูป">
              <IconButton size="small" onClick={clear} sx={{ bgcolor: 'rgba(0,0,0,.55)', color: '#fff' }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Card>
    </Box>
  );
};