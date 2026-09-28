import type { Department } from "./departments";
import type { Doctor } from "./doctors";
import type { Profile } from "./profiles";
import type { Schedule, TimeSlot } from "./schedules";

export type Booking = {
  id: string | number;
  profileId: string | number;
  doctorId: string | number;
  scheduleId: string | number;
  departmentId: string | number;
  timeSlotId: string | number;
  symptom: string;
};

export type CreateBookingPayload = Omit<Booking, "id">;

export type BookingDetail = Booking & {
  doctor: Doctor;
  profile: Profile;
  schedule: Schedule;
  department: Department;
  timeSlot: TimeSlot;
};
