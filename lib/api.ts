export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  auth?: boolean;
  json?: unknown;
}

function buildHeaders(existing?: HeadersInit, hasBody?: boolean): HeadersInit {
  const headers: Record<string, string> = {};

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return {
    ...headers,
    ...(existing || {}),
  };
}

async function request<T>(path: string, method: HttpMethod, options: RequestOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const hasBody = options.json !== undefined || options.body !== undefined;

  const res = await fetch(url, {
    ...options,
    method,
    headers: buildHeaders(options.headers, hasBody),
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body,
  });

  const contentType = res.headers.get("content-type");
  const data = contentType && contentType.includes("application/json") ? await res.json() : (await res.text() as unknown as T);

  if (!res.ok) {
    const message = (data as any)?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, "GET", options),
  post: <T>(path: string, json?: unknown, options?: RequestOptions) => request<T>(path, "POST", { ...(options || {}), json }),
  put: <T>(path: string, json?: unknown, options?: RequestOptions) => request<T>(path, "PUT", { ...(options || {}), json }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, "DELETE", options),
};

export function saveAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}


