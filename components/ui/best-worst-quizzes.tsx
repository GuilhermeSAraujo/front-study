"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Calendar, CheckCircle, Trophy } from "lucide-react";
import Link from "next/link";

// Mock Data matching the schema structure roughly
interface QuizResult {
  id: string;
  courseName: string;
  topicName: string;
  difficulty: "iniciante" | "medio" | "dificil";
  score: number;
  completedAt: string; // ISO date string
}

export function BestWorstQuizzes() {
  const { data, isLoading } = useApi<{ bestResults: QuizResult[]; worstResults: QuizResult[] }>(
    "/dashboard/best-worst"
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6 mt-6">
        {/* Best Results Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Melhores Resultados</h2>
              <p className="text-sm text-muted-foreground">Seus destaques de aprendizado</p>
            </div>
          </div>

          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-l-4 border-l-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Worst Results Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Precisam de Atenção</h2>
              <p className="text-sm text-muted-foreground">Tópicos para revisar</p>
            </div>
          </div>

          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-l-4 border-l-orange-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasBestResults = data?.bestResults && data.bestResults.length > 0;
  const hasWorstResults = data?.worstResults && data.worstResults.length > 0;

  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-2 lg:px-6 mt-6">
      {/* Best Results Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Melhores Resultados</h2>
            <p className="text-sm text-muted-foreground">Seus destaques de aprendizado</p>
          </div>
        </div>

        <div className="grid gap-3">
          {hasBestResults ? (
            data.bestResults.map((quiz) => <QuizResultCard key={quiz.id} quiz={quiz} type="best" />)
          ) : (
            <EmptyState
              message="Nenhum resultado ainda"
              description="Complete alguns quizzes para ver seus melhores resultados aqui"
            />
          )}
        </div>
      </div>

      {/* Needs Attention Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Precisam de Atenção</h2>
            <p className="text-sm text-muted-foreground">Tópicos para revisar</p>
          </div>
        </div>

        <div className="grid gap-3">
          {hasWorstResults ? (
            data.worstResults.map((quiz) => (
              <QuizResultCard key={quiz.id} quiz={quiz} type="worst" />
            ))
          ) : (
            <EmptyState
              message="Nenhum tópico precisa de atenção"
              description="Continue praticando para identificar áreas que precisam de revisão"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message, description }: { message: string; description: string }) {
  return (
    <Card className="border-dashed max-h-32">
      <CardContent className="p-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-medium text-muted-foreground">{message}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
          <Button asChild variant="secondary" size="sm" className="mt-1">
            <Link href="/quiz/new">Criar novo quiz</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function QuizResultCard({ quiz, type }: { quiz: QuizResult; type: "best" | "worst" }) {
  const isBest = type === "best";

  return (
    <Card
      className="group relative overflow-hidden transition-all hover:shadow-md border-l-4"
      style={{
        borderLeftColor: isBest
          ? "hsl(var(--success, 142 76% 36%))"
          : "hsl(var(--destructive, 0 84% 60%))",
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium leading-none">{quiz.topicName}</h3>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                {quiz.courseName}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-[10px] capitalize font-normal">
                {quiz.difficulty}
              </Badge>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(quiz.completedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-end gap-1",
              isBest ? "text-green-600 dark:text-green-500" : "text-orange-600 dark:text-orange-500"
            )}
          >
            <span className="text-2xl font-bold tabular-nums leading-none">{quiz.score}%</span>
            {isBest ? (
              <CheckCircle className="h-4 w-4 opacity-50" />
            ) : (
              <AlertCircle className="h-4 w-4 opacity-50" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
