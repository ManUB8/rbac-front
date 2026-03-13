export interface FormValueCreate {
    icon?: string;
    groupMainName: string;
    groupMainCode: string;
    groupSubList: {
        groupSubName?: string | undefined;
        groupSubCode?: string | undefined;
    }[];
}
