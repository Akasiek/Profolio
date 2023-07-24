export interface IBlogPost {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  creationDate: string;
  content?: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  technologies?: string[];
}
