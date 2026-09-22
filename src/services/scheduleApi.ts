import type { Doctor } from "@/types/doctors";
import { apiClient } from "./apiClient";
import type { Schedule, TimeSlot } from "@/types/schedules";
import type { Department } from "@/types/departments";

export interface ScheduleParams {
  date_gte?: string;
  date_lte?: string;
  specializationId?: string;
  departmentId?: string;
}

export type GroupedDoctorSchedule = {
  doctorId: string;
  doctor: Doctor;
  price: number[];
};

export type DoctorBySchedule = Schedule & { doctor: Doctor };

export async function fetchDoctorBySchedules(
  filters?: ScheduleParams,
): Promise<GroupedDoctorSchedule[]> {
  const { data: schedules } = await apiClient.get<DoctorBySchedule[]>(
    "/schedules",
    {
      params: {
        _expand: "doctor",
        ...filters,
      },
    },
  );

  const map = new Map<string, GroupedDoctorSchedule>();

  for (const item of schedules) {
    const existing = map.get(item.doctorId);

    if (existing) {
      if (!existing.price.includes(item.price)) {
        existing.price.push(item.price);
      }
    } else {
      map.set(item.doctorId, {
        doctorId: item.doctorId,
        doctor: item.doctor,
        price: [item.price],
      });
    }
  }
  const doctors = Array.from(map.values());

  return doctors;
}

export type DoctorSchedule = Schedule & {
  department: Department;
  timeSlots: TimeSlot[];
};

export async function fetchDoctorSchedules(
  doctorId: string | number,
  filters?: ScheduleParams,
): Promise<DoctorSchedule[]> {
  const { data: schedules } = await apiClient.get<DoctorSchedule[]>(
    "/schedules",
    {
      params: {
        doctorId,
        _expand: "department",
        _embed: "timeSlots",
        ...filters,
      },
    },
  );
  return schedules;
}
