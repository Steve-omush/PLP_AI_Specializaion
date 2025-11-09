/**
 * Protected Route Component
 * 
 * A wrapper component that protects routes from unauthorized access.
 * Only allows authenticated users to view the wrapped content.
 * 
 * Key Features:
 * - Checks user authentication status on mount
 * - Real-time authentication state monitoring
 * - Automatic redirect to /auth if user is not logged in
 * - Shows loading skeleton while checking authentication
 * - Subscribes to auth state changes for immediate updates
 * 
 * Usage:
 * Wrap protected pages/components with this component in the routing configuration.
 * Example: <ProtectedRoute><CourseList /></ProtectedRoute>
 * 
 * Flow:
 * 1. Component mounts → Check authentication status
 * 2. If loading → Show skeleton screen
 * 3. If not authenticated → Redirect to /auth
 * 4. If authenticated → Render children (protected content)
 */

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<any>(null); // Current authenticated user
  const [loading, setLoading] = useState(true); // Loading state for auth check

  /**
   * Effect: Check authentication status and set up real-time listener
   * 
   * This effect:
   * 1. Checks current user authentication status on mount
   * 2. Sets up a listener for authentication state changes
   * 3. Updates user state when auth status changes (login/logout)
   * 
   * The auth listener ensures the UI updates immediately when:
   * - User logs in
   * - User logs out
   * - Session expires
   */
  useEffect(() => {
    // Initial check for authenticated user
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkUser();

    // Set up real-time authentication state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup: Unsubscribe from listener on component unmount
    return () => subscription.unsubscribe();
  }, []);

  // Loading state: Show skeleton screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // Not authenticated: Redirect to login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Authenticated: Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
