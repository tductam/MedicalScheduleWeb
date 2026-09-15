import { ROUTES } from "@/routes/routes";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-[70vh] text-center justify-center items-center gap-5">
      <h3 className="font-bold text-4xl">Rất tiếc, không tìm thấy trang</h3>
      <p>Nội dung không còn tồn tại, vui lòng quay lại trang chủ</p>
      <Link
        to={ROUTES.home}
        className="bg-blue-500 px-5 py-2 rounded-2xl text-white text-[20px]"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
