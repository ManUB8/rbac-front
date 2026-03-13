export interface IFilterBranchType {
    id: string
    name: string
    code: string
}

export interface CheckUsernameResponse {
  is_duplicate: boolean;
}

export interface UploadResponse {
  image_name?: string;
  url?: string;
  message?: string;
}
