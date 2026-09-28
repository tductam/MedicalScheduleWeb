import { useCreateBooking } from "@/hooks/useBooking";
import { ROUTES } from "@/routes/routes";
import { useBookingStore } from "@/stores/bookingStore";
import type { CreateBookingPayload } from "@/types/bookings";
import { formatDMY } from "@/utils/formatDate";
import {
  BriefcaseMedical,
  Calendar,
  DoorOpen,
  MapPin,
  NotebookPen,
  NotepadText,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function BookingSummary() {
  const {
    selectedProfileId,
    departmentName,
    selectedDoctor,
    selectedSchedule,
    selectedTimeSlot,
    clearBooking,
  } = useBookingStore();

  const [symptom, setSymptom] = useState("");

  const navigate = useNavigate();
  const createMutate = useCreateBooking();

  async function handleConfirm() {
    if (!selectedProfileId) {
      toast.error("Vui lòng chọn người tới khám!");
      return;
    }

    if (!selectedDoctor || !selectedTimeSlot || !selectedSchedule) {
      toast.error("Vui lòng chọn bác sĩ và thời gian khám!");
      return;
    }

    if (!symptom.trim()) {
      toast.error("Vui lòng mô tả triệu chứng!");
      return;
    }

    const booking: CreateBookingPayload = {
      profileId: selectedProfileId,
      doctorId: selectedDoctor.id,
      scheduleId: selectedTimeSlot.scheduleId,
      departmentId: selectedSchedule.departmentId,
      timeSlotId: selectedTimeSlot.id,
      symptom: symptom.trim(),
    };

    try {
      await createMutate.mutateAsync(booking);
      toast.success("Đặt lịch khám thành công!");
      clearBooking();
      navigate(ROUTES.home);
    } catch {
      toast.error("Đặt lịch khám thất bại, vui lòng thử lại sau!");
    }
  }

  return (
    <>
      <div className="border-b border-b-zinc-200 p-3">
        <h3 className="text-blue-900 text-[18px] p-2 font-bold">
          Tóm tắt lịch khám
        </h3>
      </div>
      {selectedTimeSlot !== null ? (
        <>
          <div className="px-3 overflow-auto max-h-[60vh]">
            <div className="flex gap-3 py-5 items-center">
              <div className="border rounded-full">
                {selectedDoctor?.image ? (
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 m-2 shrink-0" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {selectedDoctor?.academicDegree} {selectedDoctor?.name}
                </span>
                <span className="text-blue-700 text-[14px] ">
                  {selectedDoctor?.specialization}
                </span>
              </div>
            </div>

            <div className="border-t flex flex-col gap-3 border-t-zinc-200 py-5  text-[14px]">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-700 shrink-0" />
                <span>
                  {selectedTimeSlot.time} -
                  {selectedSchedule?.date !== undefined
                    ? formatDMY(selectedSchedule?.date)
                    : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-700 shrink-0" />
                <span>{departmentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <DoorOpen className="text-blue-700 shrink-0" />
                <span>
                  {selectedSchedule?.roomName}
                  <span></span>
                  {selectedSchedule?.roomPlace && (
                    <span> - {selectedSchedule.roomPlace}</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseMedical className="text-blue-700 shrink-0" />
                <span>{selectedSchedule?.medicalService}</span>
              </div>
              {selectedSchedule?.note && (
                <div className="flex items-center gap-2 text-blue-700">
                  <NotebookPen className="shrink-0" />
                  <span>{selectedSchedule.note}</span>
                </div>
              )}
              <div className="flex flex-col">
                <span>Vấn đề sức khỏe gặp phải</span>
                <textarea
                  onChange={(event) => setSymptom(event.target.value)}
                  className="border border-zinc-200 rounded-md h-30 focus:outline-blue-300 p-2"
                  placeholder="Mô tả ngắn gọn triệu chứng..."
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F7F9FC] px-3 py-5 border-t border-t-zinc-200 rounded-b-md">
            <button
              onClick={handleConfirm}
              disabled={createMutate.isPending}
              className="bg-[#F97316] hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold w-full rounded-md p-3"
            >
              {createMutate.isPending ? "Đang xử lý..." : "Xác nhận đặt khám"}
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col text-zinc-400 justify-center min-h-70 items-center p-10">
          <NotepadText className="h-15 w-15" />
          <p className="text-center">
            Vui lòng chọn bác sĩ và giờ khám để xem chi tiết.
          </p>
        </div>
      )}
    </>
  );
}
