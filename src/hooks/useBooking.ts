import { createBooking, fetchBooking } from "@/services/bookingApi";
import { queryClient } from "@/services/queryClient";
import type { CreateBookingPayload } from "@/types/bookings";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBooking,
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
}
