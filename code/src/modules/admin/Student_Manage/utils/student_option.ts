import type { IYearType } from "../interface/Student_Manage.interface";

export const Year_type: IYearType[] = [
    {
        label: "ปี 1",
        id: "ปี 1"
    },
    {
        label: "ปี 2",
        id: "ปี 2"
    },
    {
        label: "ปี 3",
        id: "ปี 3"
    },
    {
        label: "ปี 4",
        id: "ปี 4"
    },
]

export interface IStudentOption {
    id: string;
    label: string;
}

export const Prefix_type: IStudentOption[] = [
    { id: "นาย", label: "นาย" },
    { id: "นางสาว", label: "นางสาว" },
];

export const Gender_type: IStudentOption[] = [
    { id: "ชาย", label: "ชาย" },
    { id: "หญิง", label: "หญิง" },
    { id: "LGBTQ+", label: "LGBTQ+" },
];