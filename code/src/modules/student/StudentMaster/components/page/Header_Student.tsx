import { Box, Card, CardContent, Typography,  } from '@mui/material';
import React from 'react';
export interface IHeader_StudentProps { };
const Header_Student: React.FunctionComponent<IHeader_StudentProps> = props => {
  return (<>
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h4">หน้าข้อมูลนิสิต</Typography>
          <Typography sx={{ mt: 1 }}>Student information page</Typography>
        </CardContent>
      </Card>
    </Box>

  </>
  );
};
export default Header_Student;