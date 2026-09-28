import { X } from "lucide-react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 flex justify-center items-start"
      onClick={onClose}
    >
      <div
        className="w-full relative max-w-160 bg-white p-6 shadow-xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex absolute right-5 justify-between items-center mb-4">
          <button onClick={onClose} className=" hover:opacity-75">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
