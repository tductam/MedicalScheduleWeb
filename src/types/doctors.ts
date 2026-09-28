export type Doctor = {
  academicDegree: string;
  id: number | string;
  name: string;
  image?: string;
  specialization: string;
};

export type GroupedDoctorSchedule = Doctor & { price: number[] };
