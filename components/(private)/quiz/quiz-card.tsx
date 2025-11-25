"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Quiz } from "@/lib/types/quiz";
import { cn, getScoreColor } from "@/lib/utils";
import { Eye, Hammer, MessageCircleReply, MoreVertical, Trash2 } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  onClick: (quizId: string) => void;
  onAction: (e: React.MouseEvent, action: "view" | "reset" | "delete", quizId: string) => void;
}

function getDifficultyColor(difficulty: Quiz["difficulty"]) {
  switch (difficulty) {
    case "iniciante":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "medio":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    case "dificil":
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    default:
      return "";
  }
}

function getDifficultyLabel(difficulty: Quiz["difficulty"]) {
  switch (difficulty) {
    case "iniciante":
      return "Iniciante";
    case "medio":
      return "Médio";
    case "dificil":
      return "Difícil";
    default:
      return difficulty;
  }
}

export function QuizCard({ quiz, onClick, onAction }: QuizCardProps) {
  const isInCreation = !!quiz.status;

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        isInCreation ? "cursor-default bg-muted/40" : "cursor-pointer"
      )}
      onClick={() => !isInCreation && onClick(quiz.id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="line-clamp-2">{quiz.topicName}</CardTitle>
            <CardDescription className="mt-1 line-clamp-1">{quiz.courseName}</CardDescription>
            {isInCreation && (
              <div className="mt-2 flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <Hammer className="h-4 w-4" />
                <span className="text-xs font-medium">{quiz.status}</span>
              </div>
            )}
          </div>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={(e) => e.stopPropagation()}
                  className="h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Ações do quiz</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => onAction(e, "view", quiz.id)}>
                  <Eye className="h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => onAction(e, "reset", quiz.id)}>
                  <MessageCircleReply className="h-4 w-4" />
                  Resetar respostas
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={(e) => onAction(e, "delete", quiz.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn(getDifficultyColor(quiz.difficulty))}>
              {getDifficultyLabel(quiz.difficulty)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {quiz.questions.length} {quiz.questions.length === 1 ? "pergunta" : "perguntas"}
            </span>
          </div>
          {!isInCreation && quiz.totalQuestions !== null && quiz.correctAnswers !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {quiz.correctAnswers}/{quiz.totalQuestions} acertos
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  getScoreColor(Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100))
                )}
              >
                ({Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}
                %)
              </span>
            </div>
          )}
          {quiz.additionalInfo && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{quiz.additionalInfo}</p>
          )}
          <div className="text-xs text-muted-foreground">
            Criado em {new Date(quiz.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
