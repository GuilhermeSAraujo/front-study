import { auth } from "@/lib/auth";
import { SessionProvider } from "@/lib/session-provider";
import { Providers } from "@/app/providers";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
}
