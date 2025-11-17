import { useApi } from "@/lib/api-client";
import { QuizWithResult } from "@/lib/types/quiz";

export function useQuizDetails({ id }: { id: string }) {
  const {
    data: quiz,
    isLoading: isLoadingQuiz,
    error,
  } = useApi<QuizWithResult>(id ? `/quiz/${id}` : null);

  return {
    quiz,
    isLoadingQuiz,
    error,
  };
}
