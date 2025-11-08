"use client";

import { refreshSession } from "@/lib/next-auth/refresh-session";
import { signOut, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const animationDuration = 1500;

export function Providers({ children }: { children: React.ReactNode }) {
  const [userQuota, setUserQuota] = useState<{ id: string } | undefined>();
  const { data: session, update } = useSession();
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [sessionRefreshed, setSessionRefreshed] = useState(false);

  const userQuotaFetch = useCallback(() => {
    // fetchApi("/app/tenants/settings", "$get", {})
    //   .then((data) => {
    //     setUserQuota(data);
    //   })
    //   .catch(async (err) => {
    //     // Sentry.captureException(err)
    //     console.error(err);
    // Mock request with timeout for testing
    const timeoutMs = 5000; // 5 seconds timeout
    const mockDelay = 2000; // Simulate 2 second network delay

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request timeout"));
      }, timeoutMs);
    });

    const mockRequest = new Promise((resolve, _reject) => {
      setTimeout(() => {
        // Simulate success - change to reject() to test error handling
        resolve({ id: "mock-tenant-id-123" });
        // To test error case, replace resolve above with:
        // _reject(new Error("Failed to fetch"));
      }, mockDelay);
    });

    Promise.race([mockRequest, timeoutPromise])
      .then((data) => {
        setUserQuota(data as { id: string });
      })
      .catch(async (err) => {
        // Sentry.captureException(err)
        console.error(err);

        window.localStorage.clear();
        await signOut({ callbackUrl: "/" });
      });
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      // We cannot use useApi here because it depends on useSession
      userQuotaFetch();
    }
  }, [session?.user.id, userQuotaFetch]);

  useEffect(() => {
    void refreshSession({ update }).then((ok) => {
      setSessionRefreshed(ok);
    });
    setTimeout(() => {
      setInitialAnimation(false);
    }, animationDuration);
  }, []);

  return (
    <>
      {/* context de quota */}
      {children}
    </>
  );
}
