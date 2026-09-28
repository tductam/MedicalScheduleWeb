import type {
  Booking,
  BookingDetail,
  CreateBookingPayload,
} from "@/types/bookings";
import { apiClient } from "./apiClient";

export async function fetchBooking(): Promise<BookingDetail[]> {
  const { data } = await apiClient.get<BookingDetail[]>("/bookings", {
    params: {
      _expand: ["doctor", "profile", "timeSlot", "schedule", "department"],
    },
  });
  return data;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  const { data } = await apiClient.post<Booking>("/bookings", payload);
  return data;
}
