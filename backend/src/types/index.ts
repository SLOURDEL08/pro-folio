
export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface IEducation {
  _id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}