export type ProfileInfo = {
  id: string | number;
  avatar?: string;
  fullName: string;
  mobileNumber: string;
  idNumber: string;
  issueDate: string;
  dateOfBirth: string;
  nation: string;
  job: string;
  gender: "MALE" | "FEMALE";
  address: {};
};
