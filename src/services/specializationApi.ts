import { apiClient } from "./apiClient";
import type { Specialization } from "@/types/specializations";

export async function fetchSpecializations(): Promise<Specialization[]> {
  const { data } = await apiClient.get<Specialization[]>("/specializations");
  return data;
}
