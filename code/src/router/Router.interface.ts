// router.types.ts
export interface IRouterConfig {
    name: string;
    path: string;
    code: string;
    element?: React.ReactNode | null;
    icon?: React.ReactNode;
    modal?: boolean;
    children?: IChildrenRouter[];
    childrens?: IChildrenRouter[]; 
}

export interface IChildrenRouter extends IRouterConfig {
    subpath?: boolean;
    modal?: boolean;
    childrens?: IChildrenRouter[]; 
}