import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    console.log("AuthProvider: useEffect - Setting up listener. isLoading=true");

    // Set up the listener immediately. It handles auth changes AND initial state.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        console.log("AuthProvider: onAuthStateChange event.", { _event, sessionUserId: currentSession?.user?.id });
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false); // <<< Loading finishes when listener provides the state
        console.log("AuthProvider: State updated via listener. isLoading=false");
      }
    );

     // Also check the session once initially to potentially speed up the first load,
     // but the listener above is the ultimate source of truth for isLoading=false.
     supabase.auth.getSession().then(({ error }) => {
         if(error) {
             console.error("AuthProvider: Error during initial getSession check:", error);
             // Don't set loading false here. Listener will handle it.
         } else {
            console.log("AuthProvider: Initial getSession check successful (state will be confirmed by listener).");
         }
     }).catch(error => {
         console.error("AuthProvider: Promise error during initial getSession check:", error);
         // Don't set loading false here. Listener will handle it.
     });


    // Cleanup function
    return () => {
      console.log("AuthProvider: Unsubscribing auth listener.");
      if (subscription) {
         subscription.unsubscribe();
      }
    };
  }, []); // Runs once on mount

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // The onAuthStateChange listener will handle navigation/state updates
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in. Please try again.",
        variant: "destructive"
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      if (error) throw error;
      toast({
        title: "Registration Successful",
        description: "Please check your email for the confirmation link.",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // The onAuthStateChange listener will handle navigation/state updates
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateProfile = async (data: { name: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
        }
      });

      if (error) throw error;

      // Update local user state
      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            name: data.name,
          }
        });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
