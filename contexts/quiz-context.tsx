"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { Quiz } from "@/lib/types/quiz";
import { useQuizList } from "@/hooks/quiz/list";

interface QuizContextValue {
  quiz: Quiz | undefined;
  isLoading: boolean;
  error: Error | undefined;
  quizId: string;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
  quizId: string;
}

export function QuizProvider({ children, quizId }: QuizProviderProps) {
  const { quizzes, isLoadingQuizzes, error } = useQuizList();

  const quiz = useMemo(() => {
    if (!quizzes || !quizId) return undefined;
    return quizzes.find((q) => q.id === quizId);
  }, [quizzes, quizId]);

  const value: QuizContextValue = {
    quiz,
    isLoading: isLoadingQuizzes,
    error: error || (quizzes && !quiz ? new Error("Quiz não encontrado") : undefined),
    quizId,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
