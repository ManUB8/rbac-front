import * as React from 'react';
import {
  Box, Card, CardActionArea, CardMedia, Typography,
  IconButton, Stack, Tooltip
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';
import { uploadMasterSkuImage } from '../../hook/handleFunction';
import { CircularProgress } from '@mui/material';

type PhotoCardProps = {
  value: string;                 // URL หรือ base64 ของรูป
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

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setHover(false);
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setUploading(true);

    try {
      const uploadedUrl = await uploadMasterSkuImage(file, value);
      console.log("uploadedUrl", uploadedUrl)
      onChange(uploadedUrl);
      URL.revokeObjectURL(tempUrl);
    } catch (err: any) {
      console.error('upload error:', err);

      await Swal.fire({
        title: 'อัปโหลดไฟล์ไม่สำเร็จ',
        text:
          err?.message ||
          err?.response?.data?.status?.description ||
          'เกิดข้อผิดพลาดระหว่างอัปโหลด',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } finally {
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
        <CardActionArea
          onClick={uploading ? undefined : handlePick}
          sx={{ width: '100%', height: '100%' }}
          disabled={uploading}
        >
          {value ? (
            <CardMedia
              component="img"
              image={value}
              alt="master-sku-photo"
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
            opacity: hover && !uploading ? 1 : 0,   // ✅ ซ่อนปุ่มระหว่าง upload
            transition: 'opacity .2s',
            zIndex: 3,
          }}
        >
          <Tooltip title="เปลี่ยนรูป">
            <IconButton
              size="small"
              onClick={handlePick}
              disabled={uploading}
              sx={{ bgcolor: 'rgba(0,0,0,.55)', color: '#fff' }}
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {value && (
            <Tooltip title="ลบรูป">
              <IconButton
                size="small"
                onClick={clear}
                disabled={uploading}
                sx={{ bgcolor: 'rgba(0,0,0,.55)', color: '#fff' }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Card>

    </Box>
  );
};