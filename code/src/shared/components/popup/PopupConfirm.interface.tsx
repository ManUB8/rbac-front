export interface ITextPopup {
    title: string;
    type: "warning" | "normal" | "loading" | "complete" | "receive" | "reject",
    content: string;
    onClose: () => void;
    onConfirm?: () => Promise<void> | void;
    onConfirm2?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const TextPopupDefault: ITextPopup = {
    title: "",
    type: "normal",
    content: "",
    onClose: () => console.log(""),
    onConfirm: () => console.log(""),
}