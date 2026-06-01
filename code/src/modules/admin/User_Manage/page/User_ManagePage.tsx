import React from "react";

import { useMasterFunctionUser } from "../hook/useFetchUser";

import HeadUser from "../components/page/HeadUser";
import FilterUser from "../components/page/FilterUser";
import TableUser from "../components/page/TableUser";
import UserFrom from "../components/form/UserForm";

export interface IUser_ManagePageProps {}

const User_ManagePage: React.FC<IUser_ManagePageProps> = () => {
    const masterController = useMasterFunctionUser();

    return (
        <>
            <HeadUser masterController={masterController} />
            <FilterUser masterController={masterController} />
            <TableUser masterController={masterController} />
            <UserFrom
                open={masterController.openUserModal}
                id={masterController.selectedUserId}
                onClose={() => masterController.setOpenUserModal(false)}
                reload={masterController.reload}
            />
        </>
    );
};

export default User_ManagePage;