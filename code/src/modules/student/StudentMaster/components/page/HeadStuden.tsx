import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export interface IHeadStudenProps {

};

const HeadStuden: React.FunctionComponent<IHeadStudenProps> = props => {
    return (
        <>
            <Box p={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">หน้าข้อมูลนิสิต</Typography>
                        <Typography sx={{ mt: 1 }}>Student information page</Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
};

export default HeadStuden;