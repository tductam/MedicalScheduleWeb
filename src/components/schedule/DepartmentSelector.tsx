import type { Department } from "@/types/departments";
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router";
import { useDepartments } from "@/hooks/useDepartments";

export function DepartmentSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: departments, isLoading, isError } = useDepartments();
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

  const departmentName = departments?.find(
    (item) => item.id === Number(searchParams.get("departmentId")),
  )?.name;

  const filterDepartment = departments?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(department: Department) {
    setIsOpen(false);
    setQuery("");
    setSearchParams((prev) => {
      prev.set("departmentId", String(department.id));
      return prev;
    });
  }

  function handleSelectAll() {
    setIsOpen(false);
    setSearchParams((prev) => {
      prev.delete("departmentId");
      return prev;
    });
  }

  return (
    <div ref={boxRef} className="relative">
      <h3 className="text-[14px]">Chọn cơ sở khám</h3>
      <button
        className="w-full text-left border border-zinc-200 rounded-md hover:border-blue-400  p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {departmentName || "Tất cả các cơ sở"}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-zinc-400 rounded-md">
          <input
            className="w-full border-b border-b-zinc-300 p-2"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={"Tìm kiếm cơ sở"}
          ></input>
          <ul className="overflow-auto max-h-80  flex flex-col ">
            <li onClick={handleSelectAll} className="hover:bg-blue-200 p-2">
              Tất cả các cơ sở
            </li>
            {filterDepartment?.map((department) => (
              <li
                className="flex items-center gap-2 p-2 hover:bg-blue-200"
                key={department.id}
                onClick={() => handleSelect(department)}
              >
                <span>{department.name} </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
