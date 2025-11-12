const API_BASE_URL = "https://hybrid-recommender-api.onrender.com";

export interface Recommendation {
  internship_id: string;
  score: number;
  rank: number;
  title?: string;
  domain?: string;
  stipend?: number;
  location?: string;
  capacity?: number;
  remote?: boolean;
}

export interface RecommendationResponse {
  student_id: string;
  recommendations: Recommendation[];
}

export interface Student {
  student_id: string;
  domain?: string;
  state?: string;
  github_link?: string;
}

export interface Internship {
  internship_id: string;
  title: string;
  domain: string;
  stipend?: number;
  location?: string;
  capacity?: number;
  remote?: boolean;
  skills?: string[];
  description?: string;
}

export const api = {
  async getStudents(): Promise<{ count: number; students: string[] }> {
    const response = await fetch(`${API_BASE_URL}/students`);
    if (!response.ok) throw new Error("Failed to fetch students");
    return response.json();
  },

  async getInternships(): Promise<{ count: number; internships: Internship[] }> {
    const response = await fetch(`${API_BASE_URL}/internships`);
    if (!response.ok) throw new Error("Failed to fetch internships");
    return response.json();
  },

  async getRecommendations(
    studentId: string,
    topK: number = 10
  ): Promise<RecommendationResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recommend/${studentId}?top_k=${topK}`
    );
    if (!response.ok) throw new Error("Failed to fetch recommendations");
    return response.json();
  },

  async storeRecommendations(
    studentId: string,
    topK: number = 10
  ): Promise<RecommendationResponse> {
    const response = await fetch(
      `${API_BASE_URL}/recommend_and_store/${studentId}?top_k=${topK}`,
      { method: "POST" }
    );
    if (!response.ok) throw new Error("Failed to store recommendations");
    return response.json();
  },
};
