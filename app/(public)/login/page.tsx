import { LoginForm } from "@/components/(public)/login/form";
import { Brain } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
      >
        <Brain className="h-6 w-6 text-primary" />
        <span>StudyAI</span>
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
