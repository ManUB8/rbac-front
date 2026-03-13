import React from 'react';
// import { useFetchUsers } from '../hook/useFetchUsers';
import { Box } from '@mui/material';

export interface IUserListPageProps {}

const UserListPage: React.FunctionComponent<IUserListPageProps> = (props) => {
    // const { users, loading } = useFetchUsers();
    // if (loading) return <div>Loading...</div>;
    return (
        <div>
            User
            {/* {users?.map((e) => {
                return <li key={e.id}>{e.name}</li>;
            })} */}
        </div>
    );
};

export default UserListPage;
