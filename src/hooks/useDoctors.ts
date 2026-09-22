import { useQuery } from "@tanstack/react-query";
import { fetchDoctorBySchedules } from "@/services/scheduleApi";
import type { ScheduleParams } from "@/services/scheduleApi";

export function useDoctor(params?: ScheduleParams) {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: () => fetchDoctorBySchedules(params),
  });
}
