"use client";

import { GoogleIcon } from "@/components/(public)/login/google-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookHeart, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Erro ao fazer login com Google. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookHeart className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Bem-vindo ao StudyAI</CardTitle>
          <CardDescription>
            Entre com sua conta Google para começar a transformar seus estudos com IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              size="lg"
              // asChild
              onClick={handleGoogleSignIn}
            >
              {isLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2" />
              )}
              Continuar com Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
