import { axiosClient } from "../libs/AxiosClientProvider";

export interface DailyLog {
  id: number;
  time: string;
  content: string;
  log_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "backlog" | "in_progress" | "review" | "done";
  created_at: string;
  updated_at: string;
}

export interface NoteTag {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  note_tags: NoteTag[];
  created_at: string;
  updated_at: string;
}

export interface ExperienceItem {
  id: number;
  description: string;
  order: number;
}

export interface Experience {
  id: number;
  company: string;
  period: string;
  title: string;
  order: number;
  experience_items: ExperienceItem[];
  created_at: string;
  updated_at: string;
}

export interface ProjectRole {
  id: number;
  description: string;
  order: number;
}

export interface ProjectTechnology {
  id: number;
  name: string;
  order: number;
}

export interface Project {
  id: number;
  name: string;
  period: string;
  client: string | null;
  description: string | null;
  team_size: string | null;
  position: string | null;
  order: number;
  project_roles: ProjectRole[];
  project_technologies: ProjectTechnology[];
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  order: number;
}

export interface Education {
  id: number;
  school: string;
  period: string;
  major: string;
  created_at: string;
  updated_at: string;
}

export interface CvProfile {
  id: number;
  full_name: string;
  title: string | null;
  summary: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
  skills?: Skill[];
  experiences?: Experience[];
  projects?: Project[];
  education?: Education | null;
}

export interface CvData {
  profile: CvProfile | null;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  education: Education | null;
}

// Daily Logs API
export const dailyLogsApi = {
  getAll: async (): Promise<DailyLog[]> => {
    const response = await axiosClient.get("/api/v1/daily_logs");
    return response.data.daily_logs || [];
  },
  getById: async (id: number): Promise<DailyLog> => {
    const response = await axiosClient.get(`/api/v1/daily_logs/${id}`);
    return response.data.daily_log;
  },
  create: async (data: {
    time: string;
    content: string;
    log_date?: string;
  }): Promise<DailyLog> => {
    const response = await axiosClient.post("/api/v1/daily_logs", data);
    return response.data.daily_log;
  },
};

// Tasks API
export const tasksApi = {
  getAll: async (searchParams?: URLSearchParams): Promise<Task[]> => {
    const params = searchParams ? `?${searchParams.toString()}` : "";
    const response = await axiosClient.get(`/api/v1/tasks/search${params}`);
    return response.data.tasks || [];
  },
  getById: async (id: number): Promise<Task> => {
    const response = await axiosClient.get(`/api/v1/tasks/${id}`);
    return response.data.task;
  },
  create: async (data: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
  }): Promise<Task> => {
    const response = await axiosClient.post("/api/v1/tasks", data);
    return response.data.task;
  },
  update: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await axiosClient.put(`/api/v1/tasks/${id}`, data);
    return response.data.task;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/v1/tasks/${id}`);
  },
};

// Notes API
export const notesApi = {
  getAll: async (): Promise<Note[]> => {
    const response = await axiosClient.get("/api/v1/notes");
    return response.data.notes || [];
  },
  getById: async (id: number): Promise<Note> => {
    const response = await axiosClient.get(`/api/v1/notes/${id}`);
    return response.data.note;
  },
  create: async (data: {
    title: string;
    content: string;
    tags?: string[];
  }): Promise<Note> => {
    const response = await axiosClient.post("/api/v1/notes", data);
    return response.data.note;
  },
  update: async (
    id: number,
    data: Partial<Note & { tags?: string[] }>,
  ): Promise<Note> => {
    const response = await axiosClient.put(`/api/v1/notes/${id}`, data);
    return response.data.note;
  },
  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/v1/notes/${id}`);
  },
};

// CV API
export const cvApi = {
  getProfile: async (id: number = 1): Promise<CvProfile> => {
    const response = await axiosClient.get(`/api/v1/cv_profiles/${id}`);
    return response.data.cv_profile || response.data;
  },
  getComplete: async (id: number = 1): Promise<CvData> => {
    const cvProfile = await cvApi.getProfile(id);

    return {
      profile: cvProfile,
      skills: cvProfile?.skills || [],
      experiences: cvProfile?.experiences || [],
      projects: cvProfile?.projects || [],
      education: cvProfile?.education || null,
    };
  },
};

// Auth API
export interface SignInRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignInResponse {
  user: {
    id: number;
    email: string;
    name?: string;
  };
  token?: string;
}

export const authApi = {
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await axiosClient.post("/api/v1/auth/sign_in", {
      email: data.email,
      password: data.password,
      remember_me: data.remember_me,
    });
    return response.data;
  },
};
