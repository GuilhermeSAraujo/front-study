"use client";

import { useQuiz } from "@/contexts/quiz-context";
import { Text } from "@/components/ui/text";

export default function QuizDetailPage() {
  const { quiz, isLoading, error, quizId } = useQuiz();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <Text type="h3">Carregando quiz...</Text>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <Text type="h3">Erro ao carregar quiz</Text>
          <p className="mt-2 text-sm text-muted-foreground">
            {error?.message || "Quiz não encontrado"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <div>
        <Text type="h3">{quiz.topicName}</Text>
        <p className="mt-2 text-sm text-muted-foreground">
          {quiz.courseName} - Quiz ID: {quizId}
        </p>
      </div>
    </div>
  );
}
