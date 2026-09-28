export type Profile = {
  id: string | number;
  avatar?: string;
  fullName: string;
  mobileNumber: string;
  gender: "MALE" | "FEMALE";
  relationship: "Owner" | string;
  idNumber: string;
  issueDate: string;
  dateOfBirth: string;
  job: string;
  address: {
    province: string;
    street1: string;
    street2: string;
  };
};

export type CreateProfilePayload = Omit<Profile, "id">;
