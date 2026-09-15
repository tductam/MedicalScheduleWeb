import { ROUTES } from "@/routes/routes";
import {
  BriefcaseMedical,
  FlaskConical,
  FileUser,
  CalendarClock,
} from "lucide-react";

export const NAV = [
  {
    icon: BriefcaseMedical,
    text1: "Đặt lịch khám",
    text2: "Đặt lịch khám sức khỏe online trước khi tới viện",
    to: ROUTES.schedule,
  },
  {
    icon: FlaskConical,
    text1: "Truyền hóa chất",
    text2: "Đăng ký hẹn khám lại",
    to: "#",
  },
  {
    icon: FileUser,
    text1: "Hồ sơ sức khỏe",
    text2: "Xem và lưu trữ kết quả khám trực tuyến",
    to: "#",
  },
  {
    icon: CalendarClock,
    text1: "Lịch khám",
    text2: "Quản lý các lịch khám đã đặt",
    to: "#",
  },
];
