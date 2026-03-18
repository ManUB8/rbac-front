import type { IStudentPermissions } from "../../../shared/types/menu";

const PERMISSION_KEY = "student_permissions";

const defaultPermissions: IStudentPermissions = {
  student_card: true,
  student_activity: true,
  student_summary: true,
};

export const usePermission = () => {
  const getStudentPermissions = (): IStudentPermissions => {
    const raw = localStorage.getItem(PERMISSION_KEY);
    if (!raw) return defaultPermissions;

    try {
      return { ...defaultPermissions, ...JSON.parse(raw) };
    } catch {
      return defaultPermissions;
    }
  };

  const setStudentPermissions = (permissions: IStudentPermissions) => {
    localStorage.setItem(PERMISSION_KEY, JSON.stringify(permissions));
  };

  const updateStudentPermission = (
    key: keyof IStudentPermissions,
    value: boolean
  ) => {
    const current = getStudentPermissions();
    const next = {
      ...current,
      [key]: value,
    };
    localStorage.setItem(PERMISSION_KEY, JSON.stringify(next));
  };

  return {
    getStudentPermissions,
    setStudentPermissions,
    updateStudentPermission,
  };
};

export default usePermission;