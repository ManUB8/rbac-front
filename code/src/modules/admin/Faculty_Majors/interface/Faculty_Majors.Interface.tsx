export interface IMajorItem {
    major_id: number;
    major_name: string;

    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;
}

export interface IFaculty_MajorsItem {
    faculty_id: number;
    faculty_name: string;

    majors: IMajorItem[];

    created_by_id: number;
    created_by_name: string;
    updated_by_id: number;
    updated_by_name: string;
}


export interface IFacultyBody {
    faculty_id?: number | string ;
    faculty_name?: string;
    major_id?: number;
    major_name?: string;
    created_by_name?: string;
    updated_by_name?: string;
    
}

export const IFacultyDataDefule:IFacultyBody ={
    faculty_id: 0,
    faculty_name: "",
    created_by_name: "",
    updated_by_name: "",
    major_id: 0,
    major_name: ""
}

export interface IMajorsBody {
    major_id: number;
    major_name: string;
    created_by_name: string;
    updated_by_name: string;
}

