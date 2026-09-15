export type Schedule = {
  id: number;
  doctorId: number;
  date: string;
  time: string;
  status: "FULL" | "AVAILABLE";
  medicalServiceName: string;
  price: number;
  departmentName: string;
  departmentDescription: string;
  specializationName: string;
  roomName: string;
  roomPlace: string;
  capacity: number;
  blockTime: number;
  note?: string;
};

export type Doctor = {
  academicDegree: string;
  id: number;
  name: string;
  image?: string;
  price: number[];
  specialization: string;
};
