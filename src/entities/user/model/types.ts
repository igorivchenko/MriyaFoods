import { User, Session } from "@supabase/supabase-js";

export interface UserState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
