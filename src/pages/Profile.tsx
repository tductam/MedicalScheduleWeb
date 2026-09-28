import { CreateProfileModal } from "@/components/profile/CreateProfileModal";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Error } from "@/components/ui/Error";
import { Loading } from "@/components/ui/Loading";
import { useProfiles } from "@/hooks/useProfiles";
import type { Profile } from "@/types/profiles";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: profiles = [], isLoading, isError, refetch } = useProfiles();
  const [selectedId, setSelectedId] = useState<string | number>();
  const activeProfile =
    profiles.find((p) => String(p.id) === String(selectedId)) || profiles?.[0];

  return (
    <div className="bg-[#F7F9FC] min-h-[70vh] px-10 py-5">
      <div className="max-w-300 mx-auto flex flex-col sm:flex-row gap-3">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error message="Lỗi khi tải hồ sơ" onRetry={refetch} />
        ) : profiles.length === 0 ? (
          <div className="flex flex-col w-full gap-3 h-80 justify-center items-center">
            <h3 className="uppercase font-semibold text-2xl text-zinc-400">
              Chưa có hồ sơ nào
            </h3>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg w-full shadow-lg hover:text-blue-600"
              >
                <CirclePlus className="h-5 w-5" /> Tạo hồ sơ khám bệnh
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg w-full shadow-lg hover:text-blue-600"
                >
                  <CirclePlus className="h-5 w-5" /> Thêm mới
                </button>
              </div>

              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedId(profile.id)}
                  className={`flex flex-col items-start px-5 py-2 rounded-lg w-full sm:w-40 md:w-50 lg:w-60 shadow-lg ${profile.id === activeProfile?.id ? "bg-blue-200 text-blue-800 border border-blue-600" : "bg-white"}`}
                >
                  <span>{profile.fullName}</span>
                  <span className="text-[14px] text-zinc-500">
                    {profile.relationship === "Owner"
                      ? "Chủ tài khoản"
                      : profile.relationship}
                  </span>
                </button>
              ))}
            </div>
            <ProfileInfo profile={activeProfile} />
          </>
        )}
      </div>
      <CreateProfileModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
