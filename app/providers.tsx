"use client";

import { fetchApi } from "@/lib/api-client";
import { refreshSession } from "@/lib/next-auth/refresh-session";
import { signOut, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const animationDuration = 1500;

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession();
  const [userQuota, setUserQuota] = useState<{ id: string } | undefined>();
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [sessionRefreshed, setSessionRefreshed] = useState(false);

  const userQuotaFetch = useCallback(() => {
    // fetchApi("/user/quota", {})
    //   .then((data) => {
    //     setUserQuota(data);
    //   })
    //   .catch(async (err) => {
    //     console.error(err);
    //     window.localStorage.clear();
    //     await signOut({ callbackUrl: "/" });
    //   });
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
