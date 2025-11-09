"use client";

import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchApi<T = unknown>(
  path: string,
  options: RequestInit = {},
  showErrorToast = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: "include", // Envia cookies automaticamente
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
 * Hook para fazer requisições HTTP com SWR
 * Envia cookies automaticamente e trata erros com toast
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
  const fetcher = async (url: string): Promise<T> => {
    return fetchApi<T>(url, options, true);
  };

  return useSWR<T, Error>(path, fetcher, {
    ...swrConfig,
    onError: (error, key, config) => {
      // O toast já é exibido no fetchApi, mas podemos adicionar lógica adicional aqui se necessário
      swrConfig?.onError?.(error, key, config);
    },
  });
}
