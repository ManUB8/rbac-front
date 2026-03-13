import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {
  Box,
  CircularProgress,
  DialogContentText,
  Grid,
  TextField
} from '@mui/material'
import type { ITextPopup } from './PopupConfirm.interface'
import CloseIcon from '../../../assets/svg/icon/close.svg'

export interface IPopupConfirmProps {
  open: boolean
  popupValue: ITextPopup
}

const PopupConfirm: React.FunctionComponent<IPopupConfirmProps> = ({
  open,
  popupValue,
}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const handleConfirmClick = async () => {
    if (!popupValue.onConfirm) return;
    try {
      setConfirmLoading(true);
      await popupValue.onConfirm();         // ✅ รองรับ async
    } finally {
      setConfirmLoading(false);
    }
  };

  const canClose = !confirmLoading;
  return (
    // <Dialog
    //   fullWidth
    //   maxWidth="sm"
    //   open={open}
    //   onClose={canClose ? popupValue.onClose : undefined}   // ล็อคไม่ให้ปิดขณะโหลด
    //   PaperProps={{ sx: { borderRadius: 2.5, p: 3 } }}
    //   disableEscapeKeyDown={confirmLoading}
    // >
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={canClose ? popupValue.onClose : undefined} // ← มีแล้ว ok
      slotProps={{
        paper: {
          sx: { borderRadius: 2.5, p: 3 }
        }
      }}
      disableEscapeKeyDown={confirmLoading}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton
          onClick={popupValue.onClose}
          disabled={confirmLoading}
          sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#F3F5F7', '&:hover': { bgcolor: '#E9ECEF' } }}
        >
          <img src={CloseIcon} alt="close" />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={popupValue.onClose}
            disabled={confirmLoading}
          >
            {popupValue.cancelText ?? 'ยกเลิก'}
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmClick}
            disabled={confirmLoading}
          >
            {confirmLoading ? (
              <>
                <CircularProgress size={18} sx={{ mr: 1 }} />
                กำลังดำเนินการ…
              </>
            ) : (
              popupValue.confirmText ?? 'ยืนยัน'
            )}
          </Button>
        </Box>
      </Box>

      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: '28px',
            fontWeight: 500,
            textAlign: 'left',
            color: popupValue?.type === 'warning' || popupValue?.type === 'reject' ? '#FE3C22' : '#525252',
          }}
          dangerouslySetInnerHTML={{ __html: popupValue.title }}
        />
        <Typography variant="body2" sx={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: popupValue.content }} />
      </DialogContent>
    </Dialog >
  );
};


export default PopupConfirm
