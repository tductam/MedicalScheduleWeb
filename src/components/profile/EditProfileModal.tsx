import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Form, type Values } from "./Form";

import type { Profile } from "@/types/profiles";
import { useUpdateProfile } from "@/hooks/useProfiles";
import { toast } from "sonner";
import { SquarePen } from "lucide-react";

interface ProfileModalProps {
  profile: Profile;
}

export function EditProfileModal({ profile }: ProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const editMutation = useUpdateProfile();

  async function handleEdit(values: Values) {
    try {
      await editMutation.mutateAsync({ id: profile.id, ...values });
      toast.success("Sửa thông tin thành viên thành công!");
      setIsOpen(false);
    } catch {
      toast.error("Lỗi khi sửa thông tin, vui lòng thử lại sau!");
    }
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <SquarePen className="h-5 w-5 text-zinc-300" />
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="text-center uppercase font-bold text-[20px] py-3 ">
          Chỉnh sửa thành viên
        </h3>
        <Form onSubmit={handleEdit} initialData={profile} />
      </Modal>
    </div>
  );
}
