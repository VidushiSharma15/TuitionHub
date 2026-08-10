export type UserRole = "student" | "tutor";

export type Profile = {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
};

export type TutorProfile = {
  id: string;
  user_id: string;
  subject: string;
  bio: string;
  hourly_rate: number;
  rating: number;
  is_available: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  student_id: string;
  tutor_id: string;
  scheduled_at: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes: string | null;
  created_at: string;
};
