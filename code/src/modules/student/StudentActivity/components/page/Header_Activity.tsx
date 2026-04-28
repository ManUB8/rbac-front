import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
export interface IHeader_ActivityProps { };
const Header_Activity: React.FunctionComponent<IHeader_ActivityProps> = props => {
    return (<>
        <Box p={3}>
            <Card>
                <CardContent>
                    <Typography variant="h4">หน้ากิจกรรมนิสิต</Typography>
                    <Typography sx={{ mt: 1 }}>Student Activity page</Typography>
                </CardContent>
            </Card>
        </Box>

    </>);
};
export default Header_Activity;