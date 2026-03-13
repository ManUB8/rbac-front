import {
    Card,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputAdornment,
    IconButton,
    OutlinedInput
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SearchIcon from '../../../assets/svg/icon/search.svg'
export interface ISearchorderProps {
    searchValue: string
    handleChangeSearch: any
    isLoad?: boolean
}

const SearchOrder: React.FunctionComponent<ISearchorderProps> = ({
    handleChangeSearch,
    searchValue,
    isLoad = false
}) => {
    return (
        // <Card
        // // sx={{
        // //     display: 'flex',
        // //     flexDirection: 'column',
        // //     height: '48px',
        // //     width: '100%',
        // //     justifyContent: 'center',
        // //     borderRadius: '8px',
        // //     boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.04)'
        // // }}
        // >
            <TextField
                disabled={isLoad}
                fullWidth
                color='primary'
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                 <img src={SearchIcon} />
                            </InputAdornment>
                        ),
                    }
                }}
                type={'text'}
                placeholder="ค้นหา"
                size="small"
                // defaultValue={searchValue}
                value={searchValue}
                onChange={handleChangeSearch}
            />
        // </Card>
    )
}
export default SearchOrder
