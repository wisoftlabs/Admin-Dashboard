import axios, { type AxiosRequestConfig } from "axios";

import { API_BASE_URL, API_PREFIX } from "@/lib/constants";

const client = axios.create({
  baseURL: API_BASE_URL.replace(/\/+$/, "") + API_PREFIX,
  withCredentials: true,
});

function normalizeEndpoint(endpoint: string) {
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
}

export async function apiClient<T = unknown>(
  endpoint: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  console.log("[API Client] EndPoint: ", endpoint);

  const res = await client.request<T>({
    url: normalizeEndpoint(endpoint),
    method: config.method ?? "GET",
    ...config,
  });

  console.log("[API Client] Response: ", res);
  return res.data;
}
