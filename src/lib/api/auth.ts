import { apiClient } from "@/lib/api-client";
import { type LoginFormValues } from "@/lib/schemas/login";

export const login = async (data: LoginFormValues) => {
  return apiClient("login", {
    method: "POST",
    data,
  });
};

export const logout = async () => {
  return apiClient("logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginExtends = async () => {
  return apiClient("extends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
