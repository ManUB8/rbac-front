import { Box } from '@mui/material';
import React from 'react';
import popup_error_404 from '../assets/404_error.jpg'
export interface INotFoundPageProps {}

const NotFoundPage: React.FunctionComponent<INotFoundPageProps> = (props) => {
    // return <div>NotFound</div>;
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Box>
                <img
                    src={popup_error_404}
                    alt="Preview"
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                />
            </Box>
        </Box>
    )
};

export default NotFoundPage;
