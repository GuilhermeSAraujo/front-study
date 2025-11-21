"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconSchool,
  IconList,
  IconChartBar,
  IconNotes,
  IconSparkles,
  IconLoader2,
} from "@tabler/icons-react";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi, useAuthenticatedFetch } from "@/lib/api-client";
import type { Course } from "@/lib/types/course";

const difficultyOptions = [
  {
    value: "iniciante",
    label: "📗 Iniciante",
    description: "Estou conhecendo o conteúdo agora",
  },
  {
    value: "medio",
    label: "🟨 Médio",
    description: "Já tenho algum conhecimento",
  },
  {
    value: "dificil",
    label: "🧠 Difícil",
    description: "Considero que tenho conhecimento avançado",
  },
] as const;

const quizFormSchema = z.object({
  course: z.string().min(1, "Selecione um curso"),
  topic: z.string().min(1, "Selecione um tópico"),
  difficulty: z.enum(["iniciante", "medio", "dificil"], {
    message: "Selecione uma dificuldade",
  }),
  additionalInfo: z.string().optional(),
});

type QuizFormData = z.infer<typeof quizFormSchema>;

export default function NewQuiz() {
  const session = useSession();
  const router = useRouter();
  const { data: courses = [], isLoading: isLoadingCourses } = useApi<Course[]>("/course");
  const fetchWithAuth = useAuthenticatedFetch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      course: "",
      topic: "",
      difficulty: undefined,
      additionalInfo: "",
    },
  });

  const watchedCourse = watch("course");
  const availableTopics = useMemo(() => {
    if (!watchedCourse) return [];
    const selectedCourse = courses.find((c) => c.id === watchedCourse);
    return selectedCourse?.topics || [];
  }, [watchedCourse, courses]);

  const handleCourseChange = (courseId: string) => {
    setValue("course", courseId);
    setValue("topic", ""); // Reset topic when course changes
  };

  const onSubmit = async (data: QuizFormData) => {
    const response = await fetchWithAuth<{ id: string; status: string; message: string }>("/quiz", {
      method: "POST",
      body: JSON.stringify(data),
    });

    toast.success("Quiz criado com sucesso!", {
      description: response.message || "Seu quiz está sendo gerado. Aguarde um momento...",
    });

    router.push(`/quiz`);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <div>
        <Text type="h3">
          O que deseja estudar hoje, {session.data?.user.name?.split(" ")?.[0]}?
        </Text>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha os campos abaixo para criar um quiz personalizado
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconSparkles className="size-5 text-primary" />
            <CardTitle>Criar Novo Quiz</CardTitle>
          </div>
          <CardDescription>
            Selecione o curso, tópico e nível de dificuldade para gerar seu quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field>
              <FieldLabel htmlFor="course" className="flex items-center gap-2">
                <IconSchool className="size-4" />
                Curso *
              </FieldLabel>
              <FieldContent>
                <Select value={watchedCourse} onValueChange={handleCourseChange}>
                  <SelectTrigger id="course" className="w-full">
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingCourses ? (
                      <SelectItem value="loading" disabled>
                        Carregando cursos...
                      </SelectItem>
                    ) : courses.length === 0 ? (
                      <SelectItem value="empty" disabled>
                        Nenhum curso disponível
                      </SelectItem>
                    ) : (
                      courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.course]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="topic" className="flex items-center gap-2">
                <IconList className="size-4" />
                Tópico *
              </FieldLabel>
              <FieldContent>
                <Select
                  value={watch("topic")}
                  onValueChange={(value) => setValue("topic", value)}
                  disabled={!watchedCourse || availableTopics.length === 0}
                >
                  <SelectTrigger id="topic" className="w-full">
                    <SelectValue
                      placeholder={
                        !watchedCourse ? "Selecione um curso primeiro" : "Selecione um tópico"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTopics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.topic]} />
                {watchedCourse && availableTopics.length === 0 && (
                  <FieldDescription>Nenhum tópico disponível para este curso</FieldDescription>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="difficulty" className="flex items-center gap-2">
                <IconChartBar className="size-4" />
                Dificuldade *
              </FieldLabel>
              <FieldContent>
                <Select
                  value={watch("difficulty")}
                  onValueChange={(value) =>
                    setValue("difficulty", value as "iniciante" | "medio" | "dificil")
                  }
                >
                  <SelectTrigger id="difficulty" className="w-full">
                    <SelectValue placeholder="Selecione a dificuldade" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex gap-2 items-center">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">
                            - {option.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.difficulty]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="additionalInfo" className="flex items-center gap-2">
                <IconNotes className="size-4" />
                Informações Adicionais
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="additionalInfo"
                  placeholder="Adicione informações extras sobre o que você gostaria de focar no quiz (opcional)"
                  rows={4}
                  {...register("additionalInfo")}
                />
                <FieldDescription>
                  Ex: &quot;Focar em casos práticos&quot;, &quot;Incluir questões sobre X tema&quot;
                </FieldDescription>
                <FieldError errors={[errors.additionalInfo]} />
              </FieldContent>
            </Field>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <IconLoader2 className="mr-2 size-4 animate-spin" />
                    Criando quiz...
                  </>
                ) : (
                  <>
                    <IconSparkles className="mr-2 size-4" />
                    Criar Quiz
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
