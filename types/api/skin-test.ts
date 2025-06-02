// Types for individual quiz questions
export type QuizQuestionType = {
  id: string;
  question: string;
  options: string[];
};

// Type for the quiz page content
export type QuizPageType = {
  title: string;
  description: string;
  hero_image_link: string;
  quizzes: {
    question: string;
    answers: string[];
  }[];
};

// Transformed data type
export type TransformedQuizType = {
  id: string;
  question: string;
  options: string[];
}[];

// API response type
export type QuizPageAPIResponseType = {
  data: QuizPageType;
};
