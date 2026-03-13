import Swal from 'sweetalert2';

export const alertSuccess = (message = 'ทำรายการสำเร็จ 🎉') => {
  Swal.fire('สำเร็จ', message, 'success');
};

export const alertError = (message = 'เกิดข้อผิดพลาด ❌') => {
  Swal.fire('ผิดพลาด', message, 'error');
};

export const alertInfo = (message = 'ข้อมูล') => {
  Swal.fire('แจ้งเตือน', message, 'info');
};

export const alertConfirm = async (
  text = 'คุณแน่ใจหรือไม่?',
  confirmText = 'ใช่, ดำเนินการเลย',
  cancelText = 'ยกเลิก'
): Promise<boolean> => {
  const result = await Swal.fire({
    title: 'ยืนยันการทำรายการ',
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return result.isConfirmed;
};