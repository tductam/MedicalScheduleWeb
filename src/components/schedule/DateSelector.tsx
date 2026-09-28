import { today } from "@/utils/formatDate";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function DateSelector() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFrom = searchParams.get("from") || "";
  const dateTo = searchParams.get("to") || "";

  useEffect(() => {
    setSearchParams((prev) => {
      const from = prev.get("from");
      if (!from || from < today) {
        prev.set("from", today);
      }
      return prev;
    });
  }, [today, setSearchParams]);

  function handleChangeDateFrom(date: string) {
    setSearchParams((prev) => {
      if (!date) {
        prev.delete("from");
      } else {
        prev.set("from", date);
      }
      return prev;
    });
  }

  function handleChangeDateTo(date: string) {
    setSearchParams((prev) => {
      if (!date) {
        prev.delete("to");
      } else {
        prev.set("to", date);
      }
      return prev;
    });
  }

  return (
    <div>
      <h3 className="text-[14px]">Chọn ngày khám</h3>
      <div className="flex items-center gap-1 justify-around border border-zinc-200 rounded-md hover:border-blue-400 p-2">
        <input
          type="date"
          value={dateFrom}
          className="focus:outline-none"
          min={today}
          max={dateTo || undefined}
          onChange={(event) => handleChangeDateFrom(event.target.value)}
        />
        <MoveRight className="text-zinc-500 h-4 w-4" />
        <input
          type="date"
          value={dateTo}
          className="focus:outline-none"
          min={dateFrom || undefined}
          onChange={(event) => handleChangeDateTo(event.target.value)}
        />
      </div>
    </div>
  );
}
