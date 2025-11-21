"use client";

import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Extend Session type to include token
interface ExtendedSession extends Session {
  token?: string;
}

export async function fetchApi<T = unknown>(
  path: string,
  options: RequestInit = {},
  showErrorToast = true,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add Authorization header if token is provided
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include", // Keep for backward compatibility with local dev
    });

    const contentType = response.headers.get("content-type");
    let data: T;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = (await response.text()) as T;
    }

    if (!response.ok) {
      const errorData = data as { message?: string; error?: string };
      const errorMessage =
        errorData?.message || errorData?.error || response.statusText || "Request failed";

      if (showErrorToast) {
        toast.error("Ops", {
          description: errorMessage,
        });
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (showErrorToast && error.message !== "Request failed") {
        toast.error("Ops", {
          description: error.message,
        });
      }
      throw error;
    }

    const errorMessage = "Conexão falhou. Verifique sua conexão com a internet e tente novamente.";
    if (showErrorToast) {
      toast.error("Ops", {
        description: errorMessage,
      });
    }
    throw new Error(errorMessage);
  }
}

/**
 * Hook to get authenticated fetchApi function with session token
 * Use this when you need to call fetchApi directly with automatic token injection
 *
 * @example
 * ```ts
 * function MyComponent() {
 *   const fetchWithAuth = useAuthenticatedFetch();
 *
 *   const handleSubmit = async () => {
 *     const result = await fetchWithAuth("/quiz", { method: "POST", body: JSON.stringify(data) });
 *   };
 * }
 * ```
 */
export function useAuthenticatedFetch() {
  const { data: session } = useSession();
  const token = (session as ExtendedSession)?.token;

  return <T = unknown>(
    path: string,
    options: RequestInit = {},
    showErrorToast = true
  ): Promise<T> => {
    return fetchApi<T>(path, options, showErrorToast, token);
  };
}

/**
 * Hook para fazer requisições HTTP com SWR
 * Envia o token JWT no header Authorization e trata erros com toast
 *
 * @example
 * ```ts
 * function MyComponent() {
 *   const { data, error, isLoading } = useApi("/user/quota");
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 * ```
 */
export function useApi<T = unknown>(
  path: string | null,
  options?: RequestInit,
  swrConfig?: SWRConfiguration<T>
): SWRResponse<T, Error> {
  const { data: session } = useSession();
  const token = (session as ExtendedSession)?.token;

  const fetcher = async (url: string): Promise<T> => {
    return fetchApi<T>(url, options, true, token);
  };

  return useSWR<T, Error>(path, fetcher, {
    ...swrConfig,
    onError: (error, key, config) => {
      // O toast já é exibido no fetchApi, mas podemos adicionar lógica adicional aqui se necessário
      swrConfig?.onError?.(error, key, config);
    },
  });
}
