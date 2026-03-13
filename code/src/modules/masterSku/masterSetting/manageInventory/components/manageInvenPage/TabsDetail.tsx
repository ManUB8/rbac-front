import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import type { ITabSelect } from '../../interface/ManageInventory.interface'; 

export interface ITabsDetailProps {
    tabList: {
        value: number;
        label: string;
    }[];
    tabSelect: ITabSelect;
    handleChangeTab: (value: number) => void;
}

const TabsDetail: React.FunctionComponent<ITabsDetailProps> = (props) => {
    return (
        <Box>
            <Tabs value={props.tabSelect.value} onChange={(_, v) => props.handleChangeTab(v)}>
                {props.tabList.map((t) => (
                    <Tab key={t.value} label={t.label} value={t.value} />
                ))}
            </Tabs>
        </Box>
    );
};

export default TabsDetail;
