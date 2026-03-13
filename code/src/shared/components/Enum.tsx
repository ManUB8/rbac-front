export const ENUM: any = {
    METHOD_TYPE: {
        GET: "get",
        POST: "post",
        PATCH: "patch",
        PUT: "put",
        DELETE: "delete",
    },
    OPTION_ACTIVE: [
        {
            label: "เปิดการใช้งาน",
            value: 1,
        },
        {
            label: "ปิดการใช้งาน",
            value: 2,
        },
        {
            label: "ระงับการใช้งาน",
            value: 3,
        },
    ],
}

export const EnumFileNameExcel = {
  owner_name: 'Web Account',
} as const;

export const EnumSheetNameExcel = {
  free_emenu_owner: "รายชื่อ Free Emenu",
  owner_name_sheet: 'Account Owner',
} as const;


export const ENUM_VERSION = import.meta.env.VITE_IMAGE_VERSION