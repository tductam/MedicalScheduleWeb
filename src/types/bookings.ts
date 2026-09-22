export type Booking = {
  id: string | number;
  userId: string;
  doctorId: string;
  scheduleId: string;
  timeSlotId: string;
  symptom: string;
  images: string[];
};
