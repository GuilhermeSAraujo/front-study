import { useApi } from "@/lib/api-client";
import { QuizList } from "@/lib/types/quiz";

export function useQuizList() {
  const { data: quizzes = [], isLoading: isLoadingQuizzes, error } = useApi<QuizList>("/quiz");

  return {
    quizzes,
    isLoadingQuizzes,
    error,
  };
}
