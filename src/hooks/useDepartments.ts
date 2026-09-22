import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/services/departmentApi";

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
}
