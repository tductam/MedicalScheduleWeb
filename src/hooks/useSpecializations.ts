import { useQuery } from "@tanstack/react-query";
import { fetchSpecializations } from "@/services/specializationApi";

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
  });
}
