import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, meta?: Record<string, string>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  sendPhoneOtp: (phone: string) => Promise<void>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const isMockMode = !isSupabaseConfigured;

  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    if (!supabase) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, meta?: Record<string, string>) => {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: meta },
      });
      if (error) throw error;
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const signInWithFacebook = useCallback(async () => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const sendPhoneOtp = useCallback(async (phone: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
  }, []);

  const verifyPhoneOtp = useCallback(async (phone: string, token: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) {
      setState({ user: null, session: null, loading: false });
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithFacebook,
        sendPhoneOtp,
        verifyPhoneOtp,
        signOut,
        isMockMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
