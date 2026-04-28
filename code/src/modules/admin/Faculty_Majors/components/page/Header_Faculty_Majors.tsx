import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import React from 'react';
import { useFacultyFormFetch, type IuseFaculty_MajorsFetch } from '../../hook/useFetchFaculty_Majors';
export interface IHeader_Faculty_MajorsProps {
    Master_Faculty_Majors: IuseFaculty_MajorsFetch
};
const Header_Faculty_Majors: React.FunctionComponent<IHeader_Faculty_MajorsProps> = ({
    Master_Faculty_Majors
}) => {

    return (<>
        <Box p={1}>
            <Card>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Box>
                        <Typography variant="h4">หน้าจัดการคณะสาขา</Typography>
                        <Typography sx={{ mt: 1 }}>
                            เพิ่ม แก้ไข และลบข้อมูลคณะสาขา
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={Master_Faculty_Majors.handleOpenCreateFaculty}
                    >
                        เพิ่มคณะ
                    </Button>
                </CardContent>
            </Card>
        </Box>
        


    </>);
};
export default Header_Faculty_Majors;