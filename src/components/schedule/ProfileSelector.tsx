import { useEffect, useRef, useState } from "react";
import { useProfiles } from "@/hooks/useProfiles";
import { useBookingStore } from "@/stores/bookingStore";
import type { Profile } from "@/types/profiles";
import { Loading } from "../ui/Loading";
import { Error } from "../ui/Error";
import { CreateProfileModal } from "../profile/CreateProfileModal";
import { CirclePlus } from "lucide-react";

export function ProfileSelector() {
  const { data: profiles = [], isLoading, isError, refetch } = useProfiles();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedProfileId, setProfile } = useBookingStore();

  const selectedProfileName = profiles?.find(
    (p) => String(p.id) === String(selectedProfileId),
  )?.fullName;
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterProfiles = profiles?.filter((item) =>
    item.fullName.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(profile: Profile) {
    setProfile(profile.id);
    setIsOpen(false);
  }

  return (
    <div ref={boxRef} className="relative">
      <h3 className="text-[14px]">Người tới khám</h3>
      <button
        className="w-full text-left border border-zinc-200 rounded-md hover:border-blue-400 p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedProfileName || "Chọn người tới khám"}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 z-10  bg-white border border-zinc-400 rounded-md">
          <input
            className="w-full border-b border-b-zinc-300 p-2"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"Tìm kiếm người khám"}
          ></input>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error message="Lỗi khi tải thông tin" onRetry={refetch} />
          ) : filterProfiles.length === 0 ? (
            <span className="flex items-center gap-2 p-2 text-zinc-500">
              Không tìm thấy hồ sơ phù hợp
            </span>
          ) : (
            <ul className="overflow-auto max-h-100 flex flex-col ">
              {filterProfiles?.map((profile) => (
                <li
                  className="flex items-center gap-2 p-2 hover:bg-blue-200"
                  key={profile.id}
                  onClick={() => handleSelect(profile)}
                >
                  <span>{profile.fullName} </span>
                  <span className="text-[12px] text-zinc-500 bg-zinc-200 rounded-md px-1">
                    {profile.relationship === "Owner"
                      ? "Chủ tài khoản"
                      : profile.relationship}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center justify-center gap-2 p-3 border-t border-t-zinc-200 bg-zinc-100 rounded-b-md w-full shadow-lg text-blue-600"
          >
            <CirclePlus className="h-5 w-5" /> Thêm mới người bệnh
          </button>
        </div>
      )}
      <CreateProfileModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
