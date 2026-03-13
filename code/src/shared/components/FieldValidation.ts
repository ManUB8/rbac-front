import { z, ZodType } from 'zod';


//===========Owner===============
export const OwnerZod = z.object({
    owner_name: z.string().min(1, { message: 'กรุณาใส่เจ้าของร้าน' }),
    branch_name: z.string().min(1, { message: 'กรุณาเลือกสาขาหลัก' }),
    email: z.string().min(1, { message: 'กรุณากรอก E-mail' }),
    phone: z.string().min(1, { message: 'กรุณากรอกเบอร์โทรศัพท์' }),
    user_type_id: z.string().min(1, { message: 'กรุณาเลือกประเภทผู้ใช้งาน' }),
    owner_type_names: z.array(z.string()).min(1, { message: "กรุณาเลือกประเภทร้านค้าอย่างน้อย 1 อย่าง" }),
    food_type_names: z.array(z.string()).min(1, { message: "กรุณาเลือกประเภทอาหารอย่างน้อย 1 อย่าง" }),
    branches: z.array(z.object({
        id: z.string(),  // กำหนดรูปแบบข้อมูลของ branch แต่ละตัว
        branch_name: z.string()
    })).min(1, { message: 'กรุณาเพิ่มอย่างน้อย 1 สาขา' }),
    password: z.string().optional().or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
    actype: z.enum(['create', 'edit']).optional(),
}).superRefine((data, ctx) => {
    if (data.actype === 'create') {
        // ต้องใส่รหัสผ่าน และยาว >= 8
        if (!data.password || data.password.trim().length < 8) {
            ctx.addIssue({
                code: "custom",
                path: ['password'],
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
            });
        }
        // ต้องใส่ยืนยันรหัสผ่าน
        if (!data.confirm_password || data.confirm_password.trim().length < 8) {
            ctx.addIssue({
                code: "custom", // ✅ ใช้ string literal แทน
                path: ["password"],
                message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
            });
        }
        // ต้องตรงกัน
        if ((data.password ?? '') !== (data.confirm_password ?? '')) {
            ctx.addIssue({
                code: "custom",
                path: ['confirm_password'],
                message: 'รหัสผ่านไม่ตรงกัน',
            });
        }
    }
})

export const BranchTypeZod = z.object({
    id: z.string().min(1, { message: 'กรุณาเลือกประเภทสาขา' }),
});
export const BranchZod = z.object({
    branch_name: z.string().min(1, { message: 'กรุณาใส่ชื่อสาขา' }),
    // branch_type: (BranchTypeZod),
    branch_type: z.object({
        id: z.string().min(1, { message: "กรุณาเลือกประเภทสาขา" }),
    }),
    username: z.string().min(1, { message: 'กรุณาระบุชื่อบัญชีผู้ใช้ (Username)' }),
    // package_id: z.string().min(1, { message: 'กรุณาเลือกแพ็คเกจ' }),
    password: z.string().optional().or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
    actype: z.enum(['create', 'edit']).optional(),
}).superRefine((data, ctx) => {
    if (data.actype === 'create') {
        // ต้องใส่รหัสผ่าน และยาว >= 8
        if (!data.password || data.password.trim().length < 8) {
            ctx.addIssue({
                code: "custom",
                path: ['password'],
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
            });
        }
        // ต้องใส่ยืนยันรหัสผ่าน
        if (!data.confirm_password || data.confirm_password.trim().length < 8) {
            ctx.addIssue({
                code: "custom", // ✅ ใช้ string literal แทน
                path: ["password"],
                message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
            });
        }
        // ต้องตรงกัน
        if ((data.password ?? '') !== (data.confirm_password ?? '')) {
            ctx.addIssue({
                code: "custom",
                path: ['confirm_password'],
                message: 'รหัสผ่านไม่ตรงกัน',
            });
        }
    }
});

const PriceObj = z.object({
    is_selected: z.boolean(),
    price: z.number(),
});

export const PackageZod = z.object({
    package_name: z.string().min(1, { message: "กรุณาใส่ชื่อแพ็คเกจ" }),
    package_code: z.string().min(1, { message: "กรุณาใส่ชื่อรหัสแพ็คเกจ" }),
    package_tier: z.object({
        code: z.coerce.string().min(1, { message: "กรุณาเลือกรูปแบบแพ็คเกจ" }),
        name: z.string().min(1, { message: "กรุณาเลือกรูปแบบแพ็คเกจ" }),
    }),
    package_type: z.object({
        code: z.coerce.string().min(1, { message: "กรุณาเลือกประเภทแพ็คเกจ" }),
        name: z.string().min(1, { message: "กรุณาเลือกประเภทแพ็คเกจ" }),
    }),
    billing: z.array(z.object({
        code: z.coerce.string().min(1),
        name: z.string().min(1),
    })).min(1, { message: "กรุณาเลือกรายละเอียดการเรียกเก็บเงิน 1 อย่าง" }),
    price_daily: PriceObj,
    price_monthly: PriceObj,
    price_yearly: PriceObj,
}).superRefine((data, ctx) => {
    const selectedCount = [
        data.price_daily.is_selected,
        data.price_monthly.is_selected,
        data.price_yearly.is_selected,
    ].filter(Boolean).length;

    if (selectedCount === 0) {
        ctx.addIssue({
            code: "custom",
            message: "กรุณาเลือกราคาขั้นต่ำ 1 รายการ",
            path: ["price_daily", "is_selected"],
        });
    }
});


export const MasterSkuUnitZod = z.object({
    priority: z.string().optional(),
    small_unit_id: z.string().trim().min(1, { message: "กรุณาเลือกหน่วย" }),
    small_unit_name: z.string().optional(),
});

export const MasterSkuZod = z.object({
    master_item_name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้ากลาง" }),
    category_id: z.string().min(1, { message: "กรุณากรอกหมวดหมู่สินค้า" }),
    group_id: z.string().min(1, { message: "กรุณากรอกกลุ่มสินค้า" }),
    warehouse_storage_type_id: z.string().min(1, { message: "กรุณาเลือกอุณหภูมิการจัดเก็บ Warehouse" }),
    branch_storage_type_id: z.string().min(1, { message: "กรุณาเลือกอุณหภูมิการจัดเก็บ Branch" }),
    branch_shelf_life: z.string().min(1, { message: "กรุณาระบุอายุการเก็บรักษา Branch" }),
    warehouse_shelf_life: z.string().min(1, { message: "กรุณาระบุอายุการเก็บรักษา Warehouse" }),
    // stock_unit_id: z.string().min(1, { message: "กรุณาเลือกหน่วย" }),
    // small_units: z.array(MasterSkuUnitZod),
    stock_unit_id: z.string().min(1, { message: "กรุณาระบุหน่วย" }),
    small_units: z.array(MasterSkuUnitZod).min(1, { message: "กรุณาเพิ่มหน่วยใช้" }),
});