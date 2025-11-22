export interface QuizQuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizQuestionOptions;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface Quiz {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  topicId: string;
  topicName: string;
  difficulty: "iniciante" | "medio" | "dificil";
  questions: QuizQuestion[];
  additionalInfo: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  totalQuestions: number | null;
  correctAnswers: number | null;
  status?: string | null;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  answers: Array<{ questionId: number; selectedAnswer: "A" | "B" | "C" | "D" }>;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // Porcentagem (0-100)
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type QuizWithResult = Quiz & Partial<QuizResult>;

export type QuizList = Quiz[];
