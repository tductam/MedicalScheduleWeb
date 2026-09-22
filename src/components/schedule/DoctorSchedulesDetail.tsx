import { useSchedules } from "@/hooks/useSchedules";
import type { ScheduleParams } from "@/services/scheduleApi";
import { formatDate, formatWeekday } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import {
  Banknote,
  BriefcaseMedical,
  Hospital,
  MapPin,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

interface DoctorSchedulesDetailProps {
  doctorId: string | number;
}

export function DoctorSchedulesDetail({
  doctorId,
}: DoctorSchedulesDetailProps) {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const {
    data: schedules,
    isLoading,
    isError,
  } = useSchedules(doctorId, params);

  const [selectedSchedule, setSelectedSchedule] = useState(schedules?.[0]);
  const activeSchedule = selectedSchedule || schedules?.[0];
  return (
    <div className="bg-[#FCFDFF] flex flex-col gap-4 border-t border-t-zinc-300 p-5 rounded-b-2xl">
      <h3>Chọn ngày khám:</h3>
      <div className="flex gap-2 mt-3">
        {schedules?.map((schedule) => (
          <button
            onClick={() => setSelectedSchedule(schedule)}
            className={`border border-zinc-300 px-3 py-1 rounded-md flex flex-col items-center cursor-pointer ${
              schedule === activeSchedule
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-200 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            <span className="font-bold">{formatWeekday(schedule.date)}</span>
            <span className="text-[14px] font-light">
              {formatDate(schedule.date)}
            </span>
          </button>
        ))}
      </div>
      <div className="border-b border-b-zinc-300 pb-2 text-blue-700 font-semibold text-[18px]">
        {activeSchedule?.department?.name}
      </div>

      <div className="flex flex-col gap-4 border border-zinc-300 font-semibold rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-700" /> Địa chỉ:
          {activeSchedule?.department?.description}
        </div>
        <div className="flex items-center gap-2">
          <Hospital className="w-5 h-5 text-blue-700" />
          Phòng: {activeSchedule?.roomName}
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="w-5 h-5  text-blue-700" />
          Dịch vụ: {activeSchedule?.medicalService}
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="w-5 h-5 text-blue-700" />
          Giá khám:
          <span className="text-yellow-600">
            {activeSchedule?.price !== undefined
              ? formatPrice(activeSchedule?.price)
              : ""}
          </span>
        </div>
        {activeSchedule?.note && (
          <div className="flex items-center gap-2 text-blue-700">
            <NotebookPen className="w-5 h-5" />
            Ghi chú: {activeSchedule?.note}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 s">
        {activeSchedule?.timeSlots.map((timeSlot) => (
          <button
            className="border border-zinc-300 rounded-md p-2 hover:bg-blue-200 hover:border-blue-400 hover:text-blue-600"
            disabled={timeSlot.status === "FULL"}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
