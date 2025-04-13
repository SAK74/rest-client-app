import { toast as sonnerToast, type ExternalToast } from "sonner";

const toastType: ExternalToast = {
  duration: 4000,
  richColors: true,
  closeButton: true,
};

export const dropTost: (
  message: string,
  type: "success" | "error",
  description?: string,
) => void = (message, type, description) => {
  const toast = type === "success" ? sonnerToast.success : sonnerToast.error;
  toast(message, { ...toastType, description });
};
