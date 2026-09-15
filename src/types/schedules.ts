type TimeSlot = {
  id: number | string;
  scheduleId: string;
  time: string;
  status: "FULL" | "AVAILABLE";
  capacity: number;
};

export type Schedule = {
  id: number | string;
  doctorId: string;
  date: string;
  medicalService: string;
  price: number;
  departmentId: string;
  specializationId: string;
  roomName: string;
  roomPlace: string;
  note?: string;
  timeSlots: TimeSlot[];
};
