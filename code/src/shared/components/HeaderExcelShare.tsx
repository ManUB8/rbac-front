import type { Column } from "exceljs";


export const HeaderExcelOwner: Partial<Column>[] = [
    { header: 'ลำดับ', key: 'no', width: 5 },
    { header: 'Owner Name', key: 'owner_name', width: 30 },
    { header: 'รหัสร้านค้า', key: 'owner_code', width: 20 },
    { header: 'ประเภทร้านค้า', key: 'owner_type', width: 15 },
    { header: 'เบอร์โทร', key: 'owner_phone', width: 15 },
    { header: 'สาขาหลัก', key: 'branch_name_main', width: 30 },
    { header: 'Email', key: 'owner_email', width: 40 },
    { header: 'Username', key: 'owner_username', width: 25 },
    { header: 'LEAD ID', key: 'lead_id', width: 20 },
    { header: 'Customer ID', key: 'customer_id', width: 20 },
    { header: 'สถานะ', key: 'owner_status', width: 20 },
    { header: 'ชื่อสาขา', key: 'branch_name', width: 30 },
    { header: 'รหัสสาขา', key: 'branch_code', width: 20 },
    { header: 'ประเภทสาขา', key: 'branch_type', width: 20 },
    { header: 'ที่อยู่', key: 'branch_address', width: 20 },
    { header: 'Merchant ID', key: 'merchant_id', width: 20 },
    { header: 'เบอร์โทร', key: 'branch_phone', width: 20 },
    { header: 'Username', key: 'branch_username', width: 20 },
    { header: 'แพ็คเกจ', key: 'package_name', width: 20 },
    { header: 'วันที่เริ่มใช้งาน', key: 'branch_start_date', width: 20 },
    { header: 'วันที่สิ้นสุด', key: 'branch_end_date', width: 20 },
    { header: 'สถานะ', key: 'branch_status', width: 20 },
]
