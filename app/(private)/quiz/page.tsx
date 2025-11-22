"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Text } from "@/components/ui/text";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { Button } from "@/components/ui/button";
import { useQuizList } from "@/hooks/quiz/list";
import { QuizCard } from "@/components/(private)/quiz/quiz-card";

export default function QuizList() {
  const router = useRouter();
  const { quizzes, isLoadingQuizzes, mutateQuizList } = useQuizList();

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: string, quizId: string) => {
    e.stopPropagation();
    // Ações serão implementadas posteriormente
    console.log(`Action: ${action}, Quiz ID: ${quizId}`);
  };

  // add skeleton
  if (isLoadingQuizzes) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <Text type="h3">Esses são seus quizes:</Text>
          <p className="mt-2 text-sm text-muted-foreground">
            Listagem com seus quizes criados, clique para ver detalhes
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <Text type="h3">Esses são seus quizes:</Text>
          <p className="mt-2 text-sm text-muted-foreground">
            Listagem com seus quizes criados, clique para ver detalhes
          </p>
        </div>
        <div className="text-sm text-muted-foreground">Nenhum quiz encontrado.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <div>
          <Text type="h3">Esses são seus quizes:</Text>
          <p className="mt-2 text-sm text-muted-foreground">
            Listagem com seus quizes criados, clique para ver detalhes
          </p>
        </div>
        <Button
          variant="outline"
          className="cursor-pointer"
          size="icon"
          onClick={() => mutateQuizList()}
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Atualizar lista</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onClick={handleQuizClick}
            onAction={handleActionClick}
          />
        ))}
      </div>
    </div>
  );
}
