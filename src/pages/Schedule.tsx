import { BookingSummaryResponsive } from "@/components/schedule/BookingSummaryResponsive";
import { DateSelector } from "@/components/schedule/DateSelector";
import { DepartmentSelector } from "@/components/schedule/DepartmentSelector";
import { DoctorList } from "@/components/schedule/DoctorList";
import { ProfileSelector } from "@/components/schedule/ProfileSelector";
import { SpecializationSelector } from "@/components/schedule/SpecializationSelector";
import { CalendarSearch } from "lucide-react";

export function Schedule() {
  return (
    <div className="bg-[#F7F9FC] min-h-[70vh] py-10 px-5">
      <div className="max-w-400 mx-auto">
        <div className="relative flex flex-col gap-5 lg:flex-row">
          <div>
            <div className="relative lg:sticky lg:top-30 flex flex-col gap-3 bg-white rounded-md shadow-md p-2">
              <h3 className="flex gap-2 text-blue-900 p-3 text-[18px] font-bold">
                <CalendarSearch /> Thông tin đặt khám
              </h3>
              <hr className="text-zinc-200 mb-3" />
              <ProfileSelector />
              <SpecializationSelector />
              <DepartmentSelector />
              <DateSelector />
            </div>
          </div>

          <DoctorList />
          <BookingSummaryResponsive />
        </div>
      </div>
    </div>
  );
}
