// ============================================
// Core Application Types
// ============================================

// User & Authentication
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  verified: boolean;
  points: number;
  walletBalance: number;
}

// Navigation
export interface NavItem {
  path: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}

// Services
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  category: ServiceCategory;
  path: string;
  popular?: boolean;
}

export type ServiceCategory = 
  | 'civil'
  | 'property'
  | 'business'
  | 'environment'
  | 'mobility'
  | 'social'
  | 'education'
  | 'health'
  | 'culture'
  | 'utilities'
  | 'animals'
  | 'participation'
  | 'payments';

// Requests
export interface Request {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  category: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}

export type RequestStatus = 
  | 'pending'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'cancelled';

// News
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author?: string;
}

// Ideas (Citizen Participation)
export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  status: IdeaStatus;
  hasLiked?: boolean;
}

export type IdeaStatus = 
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'implemented';

// Forms
export interface IdeaFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
}

export interface RequestFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

// Team Members (for the icon feature)
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

// Modal State
export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

// API Response
export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      data: null;
      error: string;
      message?: string;
    };

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
