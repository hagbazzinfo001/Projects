export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  completedDate: string;
  duration: string;
  technologies?: string[];
  challenges?: string;
  outcome?: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}
