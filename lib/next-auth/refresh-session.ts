import { withRetry } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

type UpdateSession = ReturnType<typeof useSession>["update"];

export enum SessionUpdateAction {
  REFRESH = "refresh",
}

export function refreshSession(sessionState: { update: UpdateSession }) {
  return withRetry(
    async () => {
      const updatedSession = await sessionState.update({
        [SessionUpdateAction.REFRESH]: true,
      });
      if (!updatedSession?.user.email) {
        await signOut({ callbackUrl: "/" });
        return false;
      }
      //   else {
      //     Sentry.setUser({
      //       ...updatedSession.user,
      //       username: updatedSession.user.name,
      //     });
      //   }
      return true;
    },
    {
      expectedErrors: [{ instance: TypeError, message: "Failed to fetch" }],
      exponentialBackoff: true,
    }
  ).catch((err) => {
    console.error(err);
    // Sentry.captureException(err);
    return false;
  });
}
