import { Link } from "react-router";

import { homeImage, installQR } from "@/assets";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routes";
import { NAV } from "@/configs/nav";

export function Home() {
  return (
    <div className="bg-[url('https://benhviendaihocyhanoi.isofhcare.vn/image/bg-dhy.png')] bg-bottom bg-cover min-h-svh flex flex-col flex-1">
      <div className="max-w-340 mx-auto px-4 py-5 flex flex-col flex-1">
        <div className="flex justify-end">
          <Link to={ROUTES.profile}>Cá nhân</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 items-center gap-10 mt-10 ">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-blue-600 font-semibold text-3xl sm:text-5xl mb-3">
              Đặt lịch và xem kết quả khám online
            </h1>
            <p className="">
              Giờ đây bạn có thể đặt lịch trước khi tới khám và xem được kết quả
              khám online nhanh chóng mọi lúc mọi nơi
            </p>

            <div className="grid grid-cols-2 justify-between gap-5 py-5">
              {NAV.map((nav) => (
                <Button
                  key={nav.text1}
                  icon={nav.icon}
                  text1={nav.text1}
                  text2={nav.text2}
                  link={nav.to}
                />
              ))}
            </div>

            <span>
              Tải ngay ứng dụng{" "}
              <span className="font-bold">BV Đại học Y Hà Nội</span>
            </span>
            <span>
              Ứng dụng đặt lịch hẹn khám dành cho người dùng có nhu cầu thăm
              khám với các bác sĩ tại bệnh viện Đại học Y Hà Nội
            </span>

            <img src={installQR} alt="" className="h-40 my-3" />
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={homeImage}
              alt=""
              className="rounded-2xl w-120 lg:w-140"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
