import { useDoctor } from "@/hooks/useDoctors";
import { DoctorItem } from "./DoctorItem";
import { useSearchParams } from "react-router";
import type { ScheduleParams } from "@/services/scheduleApi";
import { useState } from "react";
import { Search, UserGroup } from "lucide-react";

export function DoctorList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const departmentId = searchParams.get("departmentId") || undefined;
  const specializationId = searchParams.get("specializationId") || undefined;
  const dateFrom = searchParams.get("from") || undefined;
  const dateTo = searchParams.get("to") || undefined;

  const params: ScheduleParams = {
    date_gte: dateFrom,
    date_lte: dateTo,
    departmentId,
    specializationId,
  };
  const { data: doctors } = useDoctor(params);

  const filterDoctors = doctors?.filter(
    (doctor) =>
      doctor.doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.doctor.specialization.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3 min-h-150">
      <div className="flex flex-wrap gap-3 justify-between items-center p-5 border border-zinc-200 rounded-2xl bg-white shadow-sm ">
        <div className="flex flex-1 gap-2 border border-zinc-300 rounded-lg p-2">
          <Search className="w-5 h-5" />
          <input
            type="text"
            className="focus:outline-none flex-1"
            placeholder="Tìm kiếm..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-[#E6F0FF] border border-blue-200 rounded-lg py-1 px-3">
          <UserGroup className="h-5 w-5" />
          <span className="font-light">
            Tìm thấy{" "}
            <span className="font-bold">{filterDoctors?.length} bác sĩ</span>{" "}
            phù hợp.
          </span>
        </div>
      </div>
      {filterDoctors?.length === 0 ? (
        <div className="flex justify-center mt-5">Không tìm thấy bác sĩ nào phù hợp.</div>
      ) : (
        filterDoctors?.map((doctor) => (
          <DoctorItem
            key={doctor.doctorId}
            doctor={doctor.doctor}
            doctorId={doctor.doctorId}
            price={doctor.price}
          />
        ))
      )}
    </div>
  );
}
