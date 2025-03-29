export type UserRole = 'researcher' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  provider_id: string;
  estimated_duration: string;
  created_at: string;
}

export interface Order {
  id: string;
  service_id: string;
  researcher_id: string;
  provider_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  payment_status: 'pending' | 'paid' | 'refunded';
  amount: number;
}

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}