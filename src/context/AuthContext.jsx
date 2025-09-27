import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

// Create Supabase client only if we have valid credentials
let supabase = null;
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-url.supabase.co' && supabaseAnonKey !== 'your-anon-key-here') {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not configured. Authentication features will be disabled.');
}

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellBikeAuth, setSellBikeAuth] = useState(false);

  // Check active session on app load
  useEffect(() => {
    // If Supabase is not configured, simulate logged in state for development
    if (!supabase) {
      console.log('Supabase not configured, using mock user for development');
      setUser({ id: 'mock-user-id', email: 'demo@example.com' });
      setLoading(false);
      return;
    }
    
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        setUser(session?.user || null);
        setLoading(false);
        
        // Listen for auth changes
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log('Auth state changed:', _event, session?.user);
            setUser(session?.user || null);
            setLoading(false);
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in checkSession:', error);
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const signIn = async (email, password) => {
    // If Supabase is not configured, use mock authentication
    if (!supabase) {
      console.log('Using mock authentication');
      const mockUser = { id: 'mock-user-id', email };
      setUser(mockUser);
      return { user: mockUser };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email, password, name) => {
    // If Supabase is not configured, use mock authentication
    if (!supabase) {
      console.log('Using mock sign up');
      const mockUser = { id: 'mock-user-id', email };
      setUser(mockUser);
      return { user: mockUser };
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      return data;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    // If Supabase is not configured, use mock authentication
    if (!supabase) {
      console.log('Using mock Google sign in');
      const mockUser = { id: 'mock-user-id', email: 'google-user@example.com' };
      setUser(mockUser);
      return { user: mockUser };
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        throw error;
      }
      
      console.log('Google sign in successful:', data);
      return data;
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    // If Supabase is not configured, use mock sign out
    if (!supabase) {
      console.log('Using mock sign out');
      setUser(null);
      setSellBikeAuth(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      console.log('Sign out successful');
      setUser(null);
      setSellBikeAuth(false);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  // Special authentication for Sell Your Bike page
  const authenticateSellBike = async (email, password) => {
    // If Supabase is not configured, allow access for development
    if (!supabase) {
      console.log('Supabase not configured, allowing Sell Your Bike access for development');
      setSellBikeAuth(true);
      return { success: true };
    }
    
    // Fixed credentials for Sell Your Bike page
    if (email === 'mannamganeshbabu8@gmail.com' && password === 'Ganeshbabu@123') {
      setSellBikeAuth(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    sellBikeAuth,
    authenticateSellBike,
    supabase: supabase || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};