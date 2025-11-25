"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/lib/api-client";
import { IconPlus, IconTrendingUp } from "@tabler/icons-react";
import Link from "next/link";

interface DashboardData {
  quizzes: {
    total: number;
    growth: number;
  };
  accuracy: {
    value: number;
    growth: number;
  };
  topics: {
    count: number;
    growth: number;
  };
  mostStudiedCourse: string;
}

export function SectionCards() {
  const { data, isLoading } = useApi<DashboardData>("/dashboard");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 mt-auto">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Quizzes Realizados</CardDescription>
          {data?.quizzes.total ? (
            <>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.quizzes.total}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {data.quizzes.growth}%
                </Badge>
              </CardAction>
            </>
          ) : (
            <EmptyCardState message="Nenhum quiz realizado ainda" showButton />
          )}
        </CardHeader>
        {!!data?.quizzes.total && (
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Aumento este mês <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Total de quizzes nos últimos 30 dias</div>
          </CardFooter>
        )}
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Taxa de Acerto</CardDescription>
          {data?.accuracy.value ? (
            <>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.accuracy.value}%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {data.accuracy.growth}%
                </Badge>
              </CardAction>
            </>
          ) : (
            <EmptyCardState message="Sem dados de precisão até o momento" />
          )}
        </CardHeader>
        {!!data?.accuracy.value && (
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Melhorando continuamente <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Média geral de acertos</div>
          </CardFooter>
        )}
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tópicos Estudados</CardDescription>
          {data?.topics.count ? (
            <>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.topics.count}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {data.topics.growth}%
                </Badge>
              </CardAction>
            </>
          ) : (
            <EmptyCardState message="Nenhum tópico estudado na plataforma" />
          )}
        </CardHeader>
        {!!data?.topics.count && (
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Expandindo conhecimento <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Tópicos diferentes estudados</div>
          </CardFooter>
        )}
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Mais Estudado</CardDescription>
          {data?.mostStudiedCourse ? (
            <>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.mostStudiedCourse}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {data.topics.growth}
                </Badge>
              </CardAction>
            </>
          ) : (
            <EmptyCardState message="Nenhum curso destaque" />
          )}
        </CardHeader>
        {!!data?.mostStudiedCourse && (
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Mais estudado <IconTrendingUp className="size-4" />
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

function EmptyCardState({
  message,
  showButton = false,
}: {
  message: string;
  showButton?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 mt-1">
      <span className="text-sm text-muted-foreground">{message}</span>
      {showButton && (
        <Button asChild variant="secondary" size="sm" className="w-fit h-8 text-xs">
          <Link href="/quiz/new">
            <IconPlus className="size-3.5" />
            Criar novo quiz
          </Link>
        </Button>
      )}
    </div>
  );
}
