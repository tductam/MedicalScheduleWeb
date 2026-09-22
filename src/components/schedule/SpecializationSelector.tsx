import { useSpecializations } from "@/hooks/useSpecializations";
import type { Specialization } from "@/types/specializations";
import { useEffect, useRef, useState } from "react";
import { CircleQuestionMark } from "lucide-react";
import { useSearchParams } from "react-router";

export function SpecializationSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: specializations, isLoading, isError } = useSpecializations();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const specializationName = specializations?.find(
    (item) => item.id === Number(searchParams.get("specializationId")),
  )?.name;

  const filterSpecialization = specializations?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(specialization: Specialization) {
    setIsOpen(false);
    setQuery("");
    setSearchParams((prev) => {
      prev.set("specializationId", String(specialization.id));
      return prev;
    });
  }

  function handleSelectAll() {
    setIsOpen(false);
    setSearchParams((prev) => {
      prev.delete("specializationId");
      return prev;
    });
  }

  return (
    <div ref={boxRef} className="relative">
      <h3 className="text-[14px]">Chọn chuyên khoa</h3>
      <button
        className="w-full text-left border border-zinc-200 rounded-md hover:border-blue-400 p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {specializationName || "Tất cả các chuyên khoa"}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 z-10  bg-white border border-zinc-400 rounded-md">
          <input
            className="w-full border-b border-b-zinc-300 p-2"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"Tìm kiếm các chuyên khoa"}
          ></input>
          <ul className="overflow-auto max-h-80 flex flex-col ">
            <li onClick={handleSelectAll} className="hover:bg-blue-200 p-2">
              Tất cả các chuyên khoa
            </li>
            {filterSpecialization?.map((specialization) => (
              <li
                className="flex items-center gap-2 p-2 hover:bg-blue-200"
                key={specialization.id}
                onClick={() => handleSelect(specialization)}
              >
                <span>{specialization.name} </span>
                {specialization.description && (
                  <span className="relative group">
                    <CircleQuestionMark className="h-4 w-4" />
                    <div className="absolute p-2 bg-black text-white rounded-md w-60 hidden group-hover:block text-[14px]">
                      {specialization.description}
                    </div>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
