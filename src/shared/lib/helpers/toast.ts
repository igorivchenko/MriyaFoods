import { toast } from "react-hot-toast";

// Безпечна перевірка ширини екрану на стороні клієнта
const getToastPosition = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 767.98 ? "top-center" : "top-right";
  }
  return "top-right"; // значення за замовчуванням для сервера
};

export const successToast = (message: string) =>
  toast.success(message, {
    position: getToastPosition(),
  });

export const errorToast = (err: unknown) => {
  let message = "An unexpected error occurred";

  if (typeof err === "string") {
    message = err;
  } else if (err instanceof Error) {
    message = err.message;
  } else if (err && typeof err === "object" && "message" in err) {
    message = String((err as { message: unknown }).message);
  }

  toast.error(message, {
    position: getToastPosition(),
  });
};
