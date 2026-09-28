import { Error } from "@/components/ui/Error";
import { Loading } from "@/components/ui/Loading";
import { useBookings } from "@/hooks/useBooking";
import { formatDMY } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

export function Booking() {
  const { data: bookings = [], isLoading, isError, refetch } = useBookings();

  return (
    <div className="bg-[#F7F9FC] min-h-[70vh] px-5 md:px-10 py-5">
      <div className="max-w-200 mx-auto">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error message="Lỗi khi tải lịch khám" onRetry={refetch} />
        ) : bookings.length === 0 ? (
          <div>Bạn chưa có lịch khám nào</div>
        ) : (
          <div className="flex flex-1 flex-col gap-3">
            {bookings?.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-md p-4 items-center justify-between"
              >
                <div className="flex flex-col relative  border-b border-b-zinc-400 py-2">
                  <span className="font-semibold text-[18px]">
                    {booking.profile.fullName}
                  </span>
                  <span>SĐT: {booking.profile.mobileNumber}</span>

                  <span className="absolute right-0 text-[12px] bg-zinc-300 rounded-sm px-1">
                    {booking.profile.relationship === "Owner"
                      ? "Chủ tài khoản"
                      : booking.profile.relationship}
                  </span>
                </div>
                <div className="flex flex-col py-2">
                  <span className="font-medium">
                    Bác sĩ: {booking.doctor.academicDegree}{" "}
                    {booking.doctor.name}
                  </span>
                  <span className="text-blue-700">
                    Chuyên khoa: {booking.doctor.specialization}
                  </span>
                </div>

                <div className="text-[14px] flex flex-col border rounded-md p-1 border-zinc-500">
                  <div>
                    <span className="text-blue-700 font-medium">
                      Thời gian:{" "}
                    </span>
                    {booking.timeSlot.time} -
                    {booking.schedule.date !== undefined
                      ? formatDMY(booking.schedule.date)
                      : ""}
                  </div>

                  <div>
                    <span className="text-blue-700 font-medium">Địa chỉ: </span>
                    {booking.department.description}
                  </div>

                  <div>
                    <span className="text-blue-700 font-medium">
                      Phòng khám:{" "}
                    </span>
                    {booking.schedule.roomName}
                    {booking.schedule.roomPlace && (
                      <span> - {booking.schedule.roomPlace}</span>
                    )}
                  </div>

                  <div>
                    <span className="text-blue-700 font-medium">
                      Dịch vụ khám:{" "}
                    </span>
                    {booking.schedule.medicalService}
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">
                      Giá khám:{" "}
                    </span>
                    <span className="text-[#F57C00] font-medium">
                      {formatPrice(booking.schedule.price)}
                    </span>
                  </div>
                  {booking.schedule.note && (
                    <div>
                      <span className="text-blue-700 font-medium">
                        Ghi chú:{" "}
                      </span>
                      {booking.schedule.note}
                    </div>
                  )}
                  <div className="">
                    <span className="text-blue-700 font-medium">
                      Triệu chứng:{" "}
                    </span>
                    <span>{booking.symptom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
