"use client";

import { useSession } from "@/lib/auth-client";
import React, { useCallback, useEffect } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const userQuotaFetch = useCallback(() => {
    // fetchApi("/user/quota", {})
    //   .then((data) => {
    //     // setUserQuota(data);
    //   })
    //   .catch(async (err) => {
    //     console.error(err);
    //     window.localStorage.clear();
    //     // await signOut({ callbackUrl: "/" });
    //   });
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      // We cannot use useApi here because it depends on useSession
      userQuotaFetch();
    }
  }, [session?.user.id, userQuotaFetch]);

  return (
    <>
      <Toaster />
      {/* context de quota */}
      {children}
    </>
  );
}
