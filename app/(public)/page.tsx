import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Zap,
  Brain,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StudyAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="#features">Funcionalidades</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/login">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by Inteligência Artificial</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Transforme seu{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                aprendizado
              </span>{" "}
              com IA
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl">
              Crie provas personalizadas, gere resumos inteligentes e aprofunde seus conhecimentos
              em qualquer matéria com o poder da inteligência artificial.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="/login">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#features">Ver Funcionalidades</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Funcionalidades Principais
            </h2>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa para otimizar seus estudos em um só lugar
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Criar Provas */}
            <div className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Criar Provas</h3>
              <p className="text-muted-foreground">
                Gere provas personalizadas com base no conteúdo que você está estudando. Questões
                variadas e adaptadas ao seu nível de conhecimento.
              </p>
            </div>

            {/* Feature 2: Resumos */}
            <div className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Resumos Inteligentes</h3>
              <p className="text-muted-foreground">
                Transforme textos longos em resumos concisos e organizados. Capture os pontos
                principais de qualquer matéria de forma eficiente.
              </p>
            </div>

            {/* Feature 3: Aprofundar Tópicos */}
            <div className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Aprofundar Tópicos</h3>
              <p className="text-muted-foreground">
                Explore qualquer assunto em profundidade. Receba explicações detalhadas, exemplos
                práticos e conexões entre conceitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-border/40 bg-muted/30 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Por que escolher o StudyAI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Tecnologia de ponta para acelerar seu aprendizado
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Estudo Eficiente</h3>
              <p className="text-muted-foreground">
                Economize horas de estudo com ferramentas que otimizam seu tempo
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Personalizado</h3>
              <p className="text-muted-foreground">
                Conteúdo adaptado ao seu nível e estilo de aprendizado
              </p>
            </div>

            <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Resultados Comprovados</h3>
              <p className="text-muted-foreground">
                Melhore suas notas e compreensão com métodos baseados em ciência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para transformar seus estudos?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Comece hoje mesmo e descubra como a IA pode acelerar seu aprendizado
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="/login">
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#features">Saber Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-semibold">StudyAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StudyAI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
