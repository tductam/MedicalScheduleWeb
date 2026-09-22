import { apiClient } from "./apiClient";
import type { Department } from "@/types/departments";

export async function fetchDepartments(): Promise<Department[]> {
  const { data } = await apiClient.get<Department[]>("/departments");
  return data;
}
