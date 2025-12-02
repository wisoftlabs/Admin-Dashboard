const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type ApiClientOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown | FormData;
};

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { method = "GET", body } = options;
  const token = "dd";

  const headers: HeadersInit = {};

  // 토큰 주입 로직
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = body instanceof FormData;

  // FormData가 아닐 때만 JSON 헤더 설정
  // (FormData는 브라우저가 자동으로 Content-Type과 boundary를 설정함)
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : (body ? JSON.stringify(body) : undefined),
  });

  if (response.status === 401) throw new Error("Unauthorized");

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  if (response.status === 204 || response.headers.get("Content-Length") === "0") {
    return undefined as T;
  }

  return await response.json() as Promise<T>;
}