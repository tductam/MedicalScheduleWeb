import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";
import { Form, type Values } from "./Form";

import { useAddProfile } from "@/hooks/useProfiles";

interface CreateProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateProfileModal({ open, onClose }: CreateProfileModalProps) {
  const createMutation = useAddProfile();

  async function handleCreate(values: Values) {
    try {
      await createMutation.mutateAsync(values);
      toast.success("Thêm thành viên thành công!");
      onClose;
    } catch {
      toast.error("Lỗi khi thêm thành viên, vui lòng thử lại sau!");
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-center uppercase font-bold text-[20px] py-3">
        Thêm thành viên mới
      </h3>
      <Form onSubmit={handleCreate} />
    </Modal>
  );
}
