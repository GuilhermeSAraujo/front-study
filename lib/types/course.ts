export interface CourseTopic {
  id: string;
  name: string;
  description?: string;
}

export interface Course {
  id: string;
  name: string;
  topics: CourseTopic[];
}
