"use client";

import { useParams } from "next/navigation";
import { QuizProvider } from "@/contexts/quiz-context";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const quizId = params.id as string;

  return <QuizProvider quizId={quizId}>{children}</QuizProvider>;
}
