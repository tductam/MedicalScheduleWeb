import type { Doctor } from "@/types/doctors";
import type { Schedule, TimeSlot } from "@/types/schedules";
import { create } from "zustand";

interface BookingState {
  selectedProfileId: string | number | null;
  departmentName: string | null;
  selectedDoctor: Doctor | null;
  selectedSchedule: Schedule | null;
  selectedTimeSlot: TimeSlot | null;
  setProfile: (profile: string | number) => void;
  selectTimeSlot: (
    departmentName: string,
    doctor: Doctor,
    schedule: Schedule,
    timeSlot: TimeSlot,
  ) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedDoctor: null,
  departmentName: null,
  selectedProfileId: null,
  selectedSchedule: null,
  selectedTimeSlot: null,
  setProfile: (profileId) => set({ selectedProfileId: profileId }),
  selectTimeSlot: (departmentName, doctor, schedule, timeSlot) =>
    set({
      departmentName,
      selectedDoctor: doctor,
      selectedSchedule: schedule,
      selectedTimeSlot: timeSlot,
    }),
  clearBooking: () =>
    set({
      selectedDoctor: null,
      departmentName: null,
      selectedProfileId: null,
      selectedSchedule: null,
      selectedTimeSlot: null,
    }),
}));
