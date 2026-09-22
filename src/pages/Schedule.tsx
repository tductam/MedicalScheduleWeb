import { DateSelector } from "@/components/schedule/DateSelector";
import { DepartmentSelector } from "@/components/schedule/DepartmentSelector";
import { DoctorList } from "@/components/schedule/DoctorList";
import { SpecializationSelector } from "@/components/schedule/SpecializationSelector";
import { CalendarSearch } from "lucide-react";

export function Schedule() {
  return (
    <div className="bg-[#F7F9FC] min-h-[70vh] ">
      <div className="max-w-400 mx-auto">
        <div className="relative flex flex-col gap-5 md:flex-row">
          <div>
            <div className="relative md:sticky md:top-30 flex flex-col gap-3 bg-white rounded-md shadow-md p-2">
              <h3 className="flex gap-2 text-blue-900  font-bold">
                <CalendarSearch /> Thông tin đặt khám
              </h3>
              <hr className="text-zinc-200 my-3" />
              <SpecializationSelector />
              <DepartmentSelector />
              <DateSelector />
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <DoctorList />
          </div>
          <div className="hidden lg:block w-100">
            <div className="sticky top-30 bg-white rounded-md shadow-md">
              <h3>Tóm tắt lịch khám</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
