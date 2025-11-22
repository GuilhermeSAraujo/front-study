"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useQuizDetails } from "@/hooks/quiz/details";
import { fetchApi } from "@/lib/api-client";
import { useSession } from "@/lib/auth-client";
import { getScoreColor } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Answer = "A" | "B" | "C" | "D";

export default function QuizDetailPage() {
  const params = useParams();
  const quizId = params.id as string;
  const { quiz, isLoadingQuiz, error, mutateQuizDetails } = useQuizDetails({ id: quizId });
  const { data: session } = useSession();

  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const isInitialized = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      !isInitialized.current &&
      quiz?.answers &&
      Array.isArray(quiz.answers) &&
      quiz.answers.length > 0
    ) {
      const savedAnswers: Record<number, Answer> = {};
      quiz.answers.forEach((answer) => {
        savedAnswers[answer.questionId] = answer.selectedAnswer;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(savedAnswers);
      isInitialized.current = true;
    }
  }, [quiz?.answers]);

  const isQuizCompleted = quiz?.answers && Array.isArray(quiz.answers) && quiz.answers.length > 0;

  if (isLoadingQuiz) {
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

  const handleAnswerChange = (questionId: number, answer: Answer) => {
    if (isQuizCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const allQuestionsAnswered = quiz.questions.every(
    (question) => answers[question.id] !== undefined
  );

  const handleSubmit = async () => {
    if (!allQuestionsAnswered || isSubmitting || isQuizCompleted) return;

    setIsSubmitting(true);

    const correctAnswers = quiz.questions.filter(
      (question) => answers[question.id] === question.correctAnswer
    ).length;

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    await fetchApi(
      `/quiz/${quiz.id}`,
      {
        method: "POST",
        body: JSON.stringify({ answers }),
      },
      true,
      session?.session.token
    );

    toast.success("Quiz enviado com sucesso!", {
      description: `Você acertou ${correctAnswers} de ${totalQuestions} questões (${score}%)`,
    });

    mutateQuizDetails();

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <div>
        <Text type="h3">{quiz.topicName}</Text>
        <p className="mt-2 text-sm text-muted-foreground">{quiz.courseName}</p>
        {isQuizCompleted && quiz.score !== undefined && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              Quiz já respondido -{" "}
              <span className="font-bold">
                Pontuação: {quiz.correctAnswers}/{quiz.totalQuestions}
              </span>{" "}
              <span className={getScoreColor(quiz.score)}>({quiz.score}%)</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {quiz.questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {index + 1}. {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {(["A", "B", "C", "D"] as const).map((option) => {
                  const isSelected = answers[question.id] === option;
                  const isCorrect = question.correctAnswer === option;
                  const isSelectedAndWrong = isSelected && !isCorrect;

                  return (
                    <Label
                      key={option}
                      htmlFor={`question-${question.id}-${option}`}
                      className={`flex items-center gap-3 rounded-md border p-4 transition-colors ${
                        isQuizCompleted
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer hover:bg-accent"
                      } ${
                        isQuizCompleted && isCorrect
                          ? "bg-green-50 border-green-300"
                          : isQuizCompleted && isSelectedAndWrong
                          ? "bg-red-50 border-red-300"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={`question-${question.id}-${option}`}
                        name={`question-${question.id}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(question.id, option)}
                        disabled={isQuizCompleted}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary disabled:cursor-not-allowed"
                      />
                      <span className="font-medium min-w-[24px]">{option}.</span>
                      <span className="flex-1">{question.options[option]}</span>
                      {isQuizCompleted && isCorrect && (
                        <span className="text-green-600 font-medium">✓ Correto</span>
                      )}
                      {isQuizCompleted && isSelectedAndWrong && (
                        <span className="text-red-600 font-medium">✗ Incorreto</span>
                      )}
                    </Label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isQuizCompleted && (
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!allQuestionsAnswered || isSubmitting} size="lg">
            {isSubmitting ? "Enviando..." : "Enviar Respostas"}
          </Button>
        </div>
      )}
    </div>
  );
}
