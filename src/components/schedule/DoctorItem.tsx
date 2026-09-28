import type { Doctor } from "@/types/doctors";
import { User } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { DoctorSchedulesDetail } from "./DoctorSchedulesDetail";
import { useState } from "react";

type DoctorItemProps = {
  doctor: Doctor;
  price: number[];
};

export function DoctorItem({ doctor, price }: DoctorItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="border border-zinc-200 rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div className="flex items-center p-4 gap-2 border-b border-b-zinc-300">
        <div className="border rounded-full">
          {doctor?.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 m-2" />
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
          <div className="flex flex-col">
            <span className="font-semibold text-[18px]">
              {doctor.academicDegree} {doctor.name}
            </span>
            <span className="text-blue-700">
              Chuyên khoa: {doctor.specialization}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-baseline sm:flex-col sm:items-end">
              <span>Giá khám:</span>

              <span className="text-amber-600 text-[22px] font-semibold">
                {price.length >= 2 ? (
                  <div>
                    <span>{formatPrice(Math.min(...price))}</span>
                    <span> - </span>
                    <span>{formatPrice(Math.max(...price))}</span>
                  </div>
                ) : (
                  formatPrice(price[0])
                )}
              </span>
            </div>

            <button
              onClick={handleClick}
              className="border bg-blue-700 rounded-md font-semibold text-white h-12 w-30 shrink-0"
            >
              {isOpen ? "Ẩn lịch" : "Chọn"}
            </button>
          </div>
        </div>
      </div>
      {isOpen && <DoctorSchedulesDetail doctor={doctor} />}
    </div>
  );
}
