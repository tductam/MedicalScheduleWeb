import { useSchedules } from "@/hooks/useSchedules";
import type { DoctorSchedule, ScheduleParams } from "@/services/scheduleApi";
import { useBookingStore } from "@/stores/bookingStore";
import type { Doctor } from "@/types/doctors";
import type { TimeSlot } from "@/types/schedules";
import { formatDate, formatWeekday, today } from "@/utils/formatDate";
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
import { toast } from "sonner";
import { Loading } from "../ui/Loading";
import { Error } from "../ui/Error";

interface DoctorSchedulesDetailProps {
  doctor: Doctor;
}

export function DoctorSchedulesDetail({ doctor }: DoctorSchedulesDetailProps) {
  const [searchParams] = useSearchParams();

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
    data: schedules = [],
    isLoading,
    isError,
    refetch,
  } = useSchedules(doctor.id, params);

  const uniqueDates = Array.from(new Set(schedules.map((s) => s.date)));
  const [selectedDate, setSelectedDate] = useState<string>();
  const activeDate = selectedDate || uniqueDates?.[0];
  const schedulesInDate = schedules.filter((s) => s.date === activeDate);

  const uniqueDepartments = Array.from(
    new Set(schedulesInDate.map((s) => s.departmentId)),
  );
  const [selectedDeptId, setSelectedDeptId] = useState<string | number>();
  const activeDeptId = selectedDeptId || uniqueDepartments[0];

  const activeSchedule = schedulesInDate.filter(
    (s) => s.departmentId === activeDeptId,
  );

  const { selectedProfileId, selectTimeSlot, selectedTimeSlot } =
    useBookingStore();

  function handleSelect(
    doctor: Doctor,
    schedule: DoctorSchedule,
    timeSlot: TimeSlot,
  ) {
    if (selectedProfileId === null) {
      toast.error("Vui lòng chọn người tới khám!");
    } else if (schedule.date < today) {
      toast.error("Quá hạn thời gian đặt khám");
    } else {
      selectTimeSlot(
        schedule.department?.name || "",
        doctor,
        schedule,
        timeSlot,
      );
    }
  }

  if (isLoading) return <Loading />;
  if (isError)
    return <Error message="Lỗi khi tải lịch khám" onRetry={refetch} />;
  return (
    <div className="bg-[#FCFDFF] flex flex-col gap-6 p-5 rounded-b-2xl">
      <h3>Chọn ngày khám:</h3>
      <div className="flex flex-wrap gap-3">
        {uniqueDates?.map((date) => (
          <button
            key={date}
            onClick={() => {
              setSelectedDate(date);
              setSelectedDeptId(undefined);
            }}
            className={`border border-zinc-300 px-3 py-1 rounded-md flex flex-col items-center cursor-pointer ${
              date === activeDate
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-200 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            <span className="font-bold">{formatWeekday(date)}</span>
            <span className="text-[14px] font-light">{formatDate(date)}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-5 border-b border-b-zinc-300 text-blue-700 font-semibold text-[18px]">
        {uniqueDepartments.map((deptId) => {
          const dept = schedulesInDate.find(
            (s) => s.departmentId === deptId,
          )?.department;
          return (
            <button
              key={deptId}
              onClick={() => setSelectedDeptId(deptId)}
              className={`${deptId === activeDeptId ? " py-2 border-b-2 border-b-blue-700" : ""}`}
            >
              {dept?.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border border-zinc-300 font-semibold rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-700" /> Địa chỉ:
          {activeSchedule[0]?.department?.description}
        </div>
        <div className="flex items-center gap-2">
          <Hospital className="w-5 h-5 text-blue-700" />
          Phòng: {activeSchedule[0]?.roomName}
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="w-5 h-5  text-blue-700" />
          Dịch vụ: {activeSchedule[0]?.medicalService}
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="w-5 h-5 text-blue-700" />
          Giá khám:
          <span className="text-yellow-600">
            {activeSchedule[0]?.price !== undefined
              ? formatPrice(activeSchedule[0]?.price)
              : ""}
          </span>
        </div>
        {activeSchedule[0]?.note && (
          <div className="flex items-center gap-2 text-blue-700">
            <NotebookPen className="w-5 h-5" />
            Ghi chú: {activeSchedule[0]?.note}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {activeSchedule.map((schedule) => (
          <div className="flex flex-wrap gap-3" key={schedule.id}>
            {schedule?.timeSlots.map((timeSlot) => (
              <button
                onClick={() => handleSelect(doctor, schedule, timeSlot)}
                key={timeSlot.id}
                className={`rounded-md p-2 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-200 disabled:cursor-not-allowed 
                   ${
                     String(selectedTimeSlot?.id) === String(timeSlot.id)
                       ? "bg-blue-600 text-white font-semibold shadow-sm"
                       : "border border-zinc-300 hover:bg-blue-200 hover:border-blue-400 hover:text-blue-600"
                   }`}
                disabled={timeSlot.status === "FULL"}
              >
                {timeSlot.time}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
