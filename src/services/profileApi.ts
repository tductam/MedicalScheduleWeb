import { apiClient } from "./apiClient";
import type { CreateProfilePayload, Profile } from "@/types/profiles";

export async function fetchProfiles(): Promise<Profile[]> {
  const { data } = await apiClient.get<Profile[]>("/profiles");
  return data;
}

export async function createProfile(
  payload: CreateProfilePayload,
): Promise<Profile> {
  const { data } = await apiClient.post<Profile>("/profiles", payload);
  return data;
}

export async function updateProfile(payload: Profile): Promise<Profile> {
  const { data } = await apiClient.patch<Profile>(
    `/profiles/${payload.id}`,
    payload,
  );
  return data;
}

export async function deleteProfile(id: string | number): Promise<void> {
  await apiClient.delete<Profile>(`/profiles/${id}`);
}
