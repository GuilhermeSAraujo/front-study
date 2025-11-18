"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Edit, Trash2, Copy, Eye } from "lucide-react";
import { Text } from "@/components/ui/text";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizList } from "@/hooks/quiz/list";
import { Quiz } from "@/lib/types/quiz";
import { Badge } from "@/components/ui/badge";
import { cn, getScoreColor } from "@/lib/utils";

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

export default function QuizList() {
  const router = useRouter();
  const { quizzes, isLoadingQuizzes } = useQuizList();

  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: string, quizId: string) => {
    e.stopPropagation();
    // Ações serão implementadas posteriormente
    console.log(`Action: ${action}, Quiz ID: ${quizId}`);
  };

  if (isLoadingQuizzes) {
    return (
      <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div>
          <Text type="h3">Esses são seus quizes:</Text>
          <p className="mt-2 text-sm text-muted-foreground">
            Listagem com seus quizes criados, clique para ver detalhes
          </p>
        </div>
        <div className="text-sm text-muted-foreground">Carregando...</div>
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
      <div>
        <Text type="h3">Esses são seus quizes:</Text>
        <p className="mt-2 text-sm text-muted-foreground">
          Listagem com seus quizes criados, clique para ver detalhes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => handleQuizClick(quiz.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="line-clamp-2">{quiz.topicName}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-1">{quiz.courseName}</CardDescription>
                </div>
                <CardAction>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Ações do quiz</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => handleActionClick(e, "view", quiz.id)}>
                        <Eye className="h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleActionClick(e, "edit", quiz.id)}>
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleActionClick(e, "duplicate", quiz.id)}>
                        <Copy className="h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={(e) => handleActionClick(e, "delete", quiz.id)}
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
                {quiz.totalQuestions !== null && quiz.correctAnswers !== null && (
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
                      ({Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)}%)
                    </span>
                  </div>
                )}
                {quiz.additionalInfo && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {quiz.additionalInfo}
                  </p>
                )}
                <div className="text-xs text-muted-foreground">
                  Criado em {new Date(quiz.createdAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
