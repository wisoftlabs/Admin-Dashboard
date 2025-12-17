import { apiClient } from "@/lib/api-client";
import { type LoginFormValues } from "@/lib/schemas/login";

export const login = async (data: LoginFormValues) => {
  return apiClient("login", {
    method: "POST",
    data,
  });
};

export const logout = async () => {
  return apiClient("auth/logout", {
    method: "DELETE",
  });
};

export const loginExtends = async () => {
  return apiClient("extend", {
    method: "POST",
  });
};
