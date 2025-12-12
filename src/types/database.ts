// Supabase Database Types for KrackedDevs

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  provider: string | null;
  github_url: string | null;
  bio: string | null;
  level: number;
  xp: number;
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: string;
  page_path: string;
  visitor_id: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

export interface BountySubmissionRow {
  id: string;
  bounty_slug: string;
  bounty_title: string;
  bounty_reward: number;
  user_id: string;
  pull_request_url: string;
  notes: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      page_views: {
        Row: PageView;
        Insert: Omit<PageView, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<PageView, "id" | "created_at">>;
      };
      bounty_submissions: {
        Row: BountySubmissionRow;
        Insert: Omit<
          BountySubmissionRow,
          "id" | "created_at" | "updated_at"
        > & {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Omit<BountySubmissionRow, "id" | "created_at">>;
      };
    };
  };
}
