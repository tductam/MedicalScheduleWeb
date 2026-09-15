import { MapPin, Mails, Phone } from "lucide-react";

import { logoFooter } from "@/assets/index";

export function Footer() {
  return (
    <footer className="bg-[#363946] w-full">
      <div className="max-w-340 mx-auto flex flex-col gap-3 md:flex-row md:gap-15 md:items-center px-3 py-3">
        <div>
          <img
            src={logoFooter}
            alt="BỆNH VIỆN ĐH Y HÀ NỘI"
            className="h-15 md:h-20"
          />
        </div>
        <div className="text-white">
          <h3>BỆNH VIỆN ĐH Y HÀ NỘI</h3>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-1">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Cơ sở Tôn Thất Tùng:
              </span>
              <span>
                Số 1 Tôn Thất Tùng, Phường Trung Tự, Quận Đống Đa, Hà Nội
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Cơ sở Cầu Giấy:
              </span>
              <span>Số 10 Trương Công Giai, Cầu Giấy, Hà Nội</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Cơ sở Hoàng Mai:
              </span>
              <span>Số 587, Tam Trinh, Yên Sở, Hoàng Mai, Hà Nội</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="flex items-center gap-2">
                <Mails className="h-5 w-5" /> Email:
              </span>
              <span>benhviendaihocyhanoi@hmuh.vn</span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <span className="flex items-center gap-2">
                <Phone className="h-5 w-5" /> Tổng đài:
              </span>
              <span>1900 6422</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
