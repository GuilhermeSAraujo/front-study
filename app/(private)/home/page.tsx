import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Olá! {session?.user.name}</h1>
    </div>
  );
}
