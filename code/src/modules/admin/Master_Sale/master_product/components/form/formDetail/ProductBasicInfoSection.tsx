import React from "react";
import {
    Autocomplete,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { IuseFetchProductFrom } from "../../../hook/useFetchMasterProduct";
import { useFetchMasterCategoryList, useFetchMasterCategoryListActive } from "../../../../master_categories/hook/useFetchMasterCategories";
import { useFetchFacultyMajors } from "../../../../../Faculty_Majors/hook/useFetchFaculty_Majors";

interface Props {
    controller: IuseFetchProductFrom;
}

const ProductBasicInfoSection: React.FC<Props> = ({ controller }) => {
    // const master_categories = useFetchMasterCategoryList()
    const { category_data, loading_category } = useFetchMasterCategoryListActive()
    const { faculty_majors, faculty_loading, } = useFetchFacultyMajors()
    const ownerType = controller.watch("owner_type");
    const facultyOptions = faculty_majors ?? [];

    const selectedFaculty = facultyOptions.find(
        (item) => String(item.faculty_id) === controller.watch('faculty_id')
    );

    const majorOptions = selectedFaculty?.majors ?? [];

    return (
        <>
            <Typography sx={{ fontWeight: 700 }}>
                {"ข้อมูลสินค้า"}
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                    label="ชื่อสินค้า"
                    fullWidth
                    value={controller.getValues('product_name')}
                    onChange={(e) => {
                        controller.setValue('product_name', e.target.value);
                    }}
                />

                <Autocomplete
                    fullWidth
                    loading={loading_category}
                    options={category_data}
                    getOptionLabel={(option) => option.category_name}
                    value={
                        category_data.find(
                            (item) => item.category_id === controller.getValues('category_id')
                        ) ?? null
                    }
                    onChange={(_, v) => {
                        controller.setValue('category_id', v?.category_id ?? '')

                    }}
                    renderInput={(p) => (
                        <TextField {...p} label="หมวดหมู่" variant="outlined" />
                    )}
                />
            </Stack>

            <TextField
                label="รายละเอียดสินค้า"
                multiline
                minRows={3}
                fullWidth
                value={controller.getValues('description')}
                onChange={(e) => {
                    controller.setValue('description', e.target.value);
                }}
            />

            <Stack spacing={2}>
                <TextField
                    select
                    label="ประเภทเจ้าของสินค้า"
                    fullWidth
                    value={ownerType ?? ""}
                    onChange={(e) => {
                        const value = e.target.value;

                        controller.setValue("owner_type", value as any);

                        controller.setValue("club_name" as any, "");
                        controller.setValue("external_name", "");
                        controller.setValue("faculty_id", null as any);
                        controller.setValue("major_id", null as any);
                    }}
                >
                    <MenuItem value="club">ชมรม</MenuItem>
                    <MenuItem value="faculty">คณะ</MenuItem>
                    <MenuItem value="major">สาขา</MenuItem>
                    <MenuItem value="external">ภายนอก</MenuItem>
                </TextField>

                {ownerType === "club" && (
                    <TextField
                        label="ชื่อชมรม"
                        fullWidth
                        value={controller.watch("club_name" as any) ?? ""}
                        onChange={(e) =>
                            controller.setValue("club_name" as any, e.target.value)
                        }
                    />
                )}

                {ownerType === "external" && (
                    <TextField
                        label="ชื่อภายนอก"
                        fullWidth
                        value={controller.watch("external_name") ?? ""}
                        onChange={(e) =>
                            controller.setValue("external_name", e.target.value)
                        }
                    />
                )}

                {ownerType === "faculty" && (
                    <Autocomplete
                        fullWidth
                        options={facultyOptions}
                        getOptionLabel={(option) => option.faculty_name}
                        value={
                            facultyOptions.find(
                                (item) =>
                                    String(item.faculty_id) === controller.watch('faculty_id')
                            ) ?? null
                        }
                        onChange={(_, v) => {
                            const name = v?.faculty_id
                            controller.setValue("faculty_id", String(name))
                        }}
                        renderInput={(p) => (
                            <TextField {...p} label="คณะ" variant="outlined" />
                        )}
                    />
                )}

                {ownerType === "major" && (
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Autocomplete
                            fullWidth
                            options={facultyOptions}
                            getOptionLabel={(option) => option.faculty_name}
                            value={
                                facultyOptions.find(
                                    (item) =>
                                        String(item.faculty_id) === controller.watch('faculty_id')
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                const name = v?.faculty_id
                                controller.setValue("faculty_id", String(name))
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="คณะ" variant="outlined" />
                            )}
                        />

                        <Autocomplete
                            fullWidth
                            options={majorOptions}
                            getOptionLabel={(option) => option.major_name}
                            value={
                                majorOptions.find(
                                    (item) =>
                                        String(item.major_id) ===
                                        controller.watch('major_id')
                                ) ?? null
                            }
                           onChange={(_, v) => {
                                const name = v?.major_id
                                controller.setValue("major_id", String(name))
                            }}
                            disabled={!controller.watch('faculty_id')}
                            renderInput={(p) => (
                                <TextField {...p} label="สาขา" variant="outlined" />
                            )}
                        />
                    </Stack>
                )}
            </Stack>

            <Divider />
        </>
    );
};

export default ProductBasicInfoSection;