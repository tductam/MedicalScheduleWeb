import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { useDeleteProfile } from "@/hooks/useProfiles";
import type { Profile } from "@/types/profiles";
import { formatDMY } from "@/utils/formatDate";
import { Trash, User } from "lucide-react";
import { toast } from "sonner";
import { InfoItem } from "./InfoItem";

interface ProfileInfoProp {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProp) {
  const deleteMutation = useDeleteProfile();

  async function handleDelete(profileId: string | number) {
    if (confirm("Bạn xác nhận muốn xóa thành viên này")) {
      try {
        await deleteMutation.mutateAsync(profileId, {
          onSuccess: () => toast.success("Xóa thành viên thành công"),
        });
      } catch {
        toast.error("Lỗi khi xóa thành viên, vui lòng thử lại sau!");
      }
    }
  }

  return (
    <div className="bg-white relative rounded-lg px-3 py-3 w-full shadow-lg">
      {profile.relationship !== "Owner" && (
        <button
          className="absolute right-5"
          onClick={() => handleDelete(profile.id)}
        >
          <Trash className="text-red-600 " />
        </button>
      )}
      <div className="border-b border-b-zinc-300 py-2">
        <h3 className="text-blue-800 text-[18px]">Thông tin cá nhân</h3>
      </div>
      <div className="py-3">
        <div className="flex gap-3 flex-col items-center py-3">
          <div className="border-2 rounded-full p-3">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="h-10"
              />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <h3 className="flex items-center  gap-3 uppercase font-semibold">
            {profile.fullName}
            <EditProfileModal profile={profile} />
          </h3>
          <span className="text-[14px] font-light">
            {profile.relationship === "Owner"
              ? "Chủ tài khoản"
              : profile.relationship}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoItem label="Số điện thoại" value={profile.mobileNumber} />
          <InfoItem label="Ngày sinh" value={formatDMY(profile.dateOfBirth)} />
          <InfoItem
            label="Giới tính"
            value={profile?.gender === "MALE" ? "Nam" : "Nữ"}
          />
          <InfoItem label="Căn cước công dân" value={profile.idNumber} />
          <InfoItem label="Ngày cấp" value={formatDMY(profile.issueDate)} />
          <InfoItem label="Nghề nghiệp" value={profile?.job} />
          <InfoItem
            label="Địa chỉ"
            value={`${profile.address.street2}, ${profile.address.street1}, ${profile.address.province}`}
          />
        </div>
      </div>
    </div>
  );
}
