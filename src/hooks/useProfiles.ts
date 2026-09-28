import {
  createProfile,
  deleteProfile,
  fetchProfiles,
  updateProfile,
} from "@/services/profileApi";
import { queryClient } from "@/services/queryClient";
import type { CreateProfilePayload, Profile } from "@/types/profiles";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
  });
}

export function useAddProfile() {
  return useMutation({
    mutationFn: (payload: CreateProfilePayload) => createProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: Profile) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useDeleteProfile() {
  return useMutation({
    mutationFn: (id: string | number) => deleteProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
