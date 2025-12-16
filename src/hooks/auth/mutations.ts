import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import * as api from "@/lib/api/auth";
import { useAuthStore } from "@/store/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: api.login,
    onSuccess: () => {
      login();
      toast.success("로그인 성공!");
      navigate("/home");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      logout();
      toast.success("로그아웃되었습니다.");
      navigate("/");
    },
  });
};

export const useLoginExtends = () => {
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: api.loginExtends,
    onSuccess: () => {
      login();
      toast.success("로그인이 연장되었습니다.");
    },
  });
};
