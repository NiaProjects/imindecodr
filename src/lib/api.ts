// API service functions for the IMIC application

const API_BASE_URL = "https://www.test.nia.com.eg/imic/public/api";

// Types for API responses
export interface ServiceData {
  id: number;
  name_ar: string;
  name_en: string;
  img: string;
  desc_ar: string;
  desc_en: string;
  created_at: string;
  updated_at: string;
}

export interface WhyChooseUsData {
  id: number;
  icon: string;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  created_at: string;
  updated_at: string;
}

export interface ClientData {
  id: number;
  name_ar: string;
  name_en: string;
  img: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: number;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectData {
  id: number;
  category_id: number;
  cover: string;
  images: string[];
  title_ar: string;
  title_en: string;
  video: string;
  created_at: string;
  updated_at: string;
  category: ProjectCategory;
}

export interface AboutData {
  id: number;
  desc_ar: string;
  desc_en: string;
  img: string;
  vision_en: string;
  mission_en: string;
  vision_ar: string;
  mission_ar: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewData {
  id: number;
  name: string;
  text: string;
  num_star: number;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  msg: string;
  location: string;
  type_unit: string;
}

export interface NewsData {
  id: number;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  content_ar: string;
  content_en: string;
  keyword_ar: string;
  keyword_en: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}

// Generic API fetch function with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.status) {
      throw new Error("API request failed");
    }

    return result;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Services API functions
export const servicesApi = {
  // Get all services
  getAll: (): Promise<ApiResponse<ServiceData[]>> => {
    return fetchApi<ApiResponse<ServiceData[]>>("/services");
  },

  // Get service by ID
  getById: (id: number): Promise<ApiResponse<ServiceData>> => {
    return fetchApi<ApiResponse<ServiceData>>(`/services/${id}`);
  },
};

// Why Choose Us API functions
export const whyChooseUsApi = {
  // Get all why choose us features
  getAll: (): Promise<ApiResponse<WhyChooseUsData[]>> => {
    return fetchApi<ApiResponse<WhyChooseUsData[]>>("/whyus");
  },

  // Get feature by ID
  getById: (id: number): Promise<ApiResponse<WhyChooseUsData>> => {
    return fetchApi<ApiResponse<WhyChooseUsData>>(`/whyus/${id}`);
  },
};

// Clients API functions
export const clientsApi = {
  // Get all clients
  getAll: (): Promise<ApiResponse<ClientData[]>> => {
    return fetchApi<ApiResponse<ClientData[]>>("/clients");
  },

  // Get client by ID
  getById: (id: number): Promise<ApiResponse<ClientData>> => {
    return fetchApi<ApiResponse<ClientData>>(`/clients/${id}`);
  },
};

// Projects API functions
export const projectsApi = {
  // Get all projects
  getAll: (): Promise<ApiResponse<ProjectData[]>> => {
    return fetchApi<ApiResponse<ProjectData[]>>("/projects");
  },

  // Get project by ID
  getById: (id: number): Promise<ApiResponse<ProjectData>> => {
    return fetchApi<ApiResponse<ProjectData>>(`/projects/${id}`);
  },
};

// About API functions
export const aboutApi = {
  // Get about information
  getAbout: (): Promise<ApiResponse<AboutData[]>> => {
    return fetchApi<ApiResponse<AboutData[]>>("/aboutus");
  },
};

// Reviews API functions
export const reviewsApi = {
  // Get all reviews
  getAll: (): Promise<ApiResponse<ReviewData[]>> => {
    return fetchApi<ApiResponse<ReviewData[]>>("/reviews");
  },
};

// News API functions
export const newsApi = {
  // Get all news
  getAll: (): Promise<ApiResponse<NewsData[]>> => {
    return fetchApi<ApiResponse<NewsData[]>>("/news");
  },

  // Get news by ID
  getById: (id: number): Promise<ApiResponse<NewsData>> => {
    return fetchApi<ApiResponse<NewsData>>(`/news/${id}`);
  },
};

// Contact API functions
export const contactApi = {
  // Submit contact form
  submit: (
    data: ContactFormData
  ): Promise<ApiResponse<{ message: string }>> => {
    return fetch(`${API_BASE_URL}/contactus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (!result.status) {
          throw new Error("API request failed");
        }
        return result;
      })
      .catch((error) => {
        console.error("Contact API Error:", error);
        throw error;
      });
  },
};

// Export the base URL for other uses
export { API_BASE_URL };
