import { useQuery } from "@tanstack/react-query";
import { fetchDoctorSchedules } from "@/services/scheduleApi";
import type { ScheduleParams } from "@/services/scheduleApi";

export function useSchedules(
  doctorId: string | number,
  params?: ScheduleParams,
) {
  return useQuery({
    queryKey: ["schedules", doctorId, params],
    queryFn: () => fetchDoctorSchedules(doctorId, params),
  });
}
