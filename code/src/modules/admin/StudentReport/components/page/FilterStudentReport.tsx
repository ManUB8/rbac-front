import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Grid,
    Stack,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { IuseFetchStudentReport } from '../../hook/useFetchStudentReport';
import { useFetchActivityFilterAll } from '../../../ActivityManage/hook/useFetchActivity';

export interface IFilterStudentReportProps {
    mastercontroller: IuseFetchStudentReport;
}

const FilterStudentReport: React.FC<IFilterStudentReportProps> = ({
    mastercontroller,
}) => {
    const { hour_type, check_type, activity_status, require_registration, activity_all_Loading } = useFetchActivityFilterAll()

    const [searchhour_type, setSearchhour_type] = useState('');

    const [searchName, setSearchName] = useState(
        mastercontroller.searchInput ?? ""
    );

    const [searchCode, setSearchCode] = useState(
        mastercontroller.searchInputCode ?? ""
    );

    // const handleSearch = () => {
    //     console.log('searchName',searchName)
    //     mastercontroller.handleChangeSearch(searchName);
    //     mastercontroller.handleChangeSearchCode(searchCode);

    //     mastercontroller.reload();
    // };

    const handleSearch = () => {
        mastercontroller.setSearchStateStudentReport((prev) => ({
            ...prev,
            search: searchName.trim(),
            student_code: searchCode.trim(),
            hour_type: searchhour_type.trim()
        }));
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ width: "100%" }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            label="ค้นหา (ชื่อ)"
                            value={searchName}
                            onChange={(e) => {
                                setSearchName(e.target.value);
                            }}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            label="ค้นหา (รหัสนิสิต)"
                            value={searchCode}
                            onChange={(e) => {
                                setSearchCode(e.target.value);
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Autocomplete
                            fullWidth
                            loading={activity_all_Loading}
                            options={hour_type}
                            getOptionLabel={(option) => option.label}
                            value={
                                hour_type.find(
                                    (item) => item.id === searchhour_type
                                ) ?? null
                            }
                            onChange={(_, v) => {
                                setSearchhour_type(v?.id ?? "")
                            }}
                            renderInput={(p) => (
                                <TextField {...p} label="ประเภทชั่วโมง" variant="outlined" />
                            )}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                        sx={{
                            minWidth: 140,
                            height: 56,
                            borderRadius: "12px",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                        }}
                    >
                        ค้นหา
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default FilterStudentReport;