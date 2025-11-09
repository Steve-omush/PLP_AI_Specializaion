/**
 * Navbar Component
 * 
 * Global navigation bar that appears at the top of every page.
 * Provides app branding, theme toggle, and authentication controls.
 * 
 * Key Features:
 * - App logo and name with link to homepage
 * - Dark/light theme toggle button
 * - Conditional rendering based on authentication status:
 *   - Shows user email and logout button when authenticated
 *   - Shows login button when not authenticated (if showAuthButton is true)
 * - Sticky positioning for always-visible navigation
 * - Responsive design with mobile-friendly layout
 * 
 * Props:
 * @param user - Current authenticated user object (null if not logged in)
 * @param showAuthButton - Whether to show login button for unauthenticated users (optional)
 */

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, Moon, Sun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

interface NavbarProps {
  user: any;
  showAuthButton?: boolean;
}

const Navbar = ({ user, showAuthButton }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme(); // Theme management hook

  /**
   * Handler: User logout
   * 
   * Signs out the current user using Supabase Auth
   * and redirects to homepage on success.
   * Shows error toast if logout fails.
   */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/"); // Redirect to homepage after logout
    }
  };

  /**
   * Handler: Toggle theme between light and dark mode
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    /* Sticky navbar with backdrop blur effect */
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: App logo and name (links to homepage) */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LearnHub
            </span>
          </Link>

          {/* Right side: Theme toggle and authentication controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Conditional rendering based on authentication status */}
            {user ? (
              /* Authenticated user: Show email and logout button */
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.email}
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : showAuthButton ? (
              /* Not authenticated: Show login button if prop is true */
              <Button onClick={() => navigate("/auth")} variant="default" className="ml-2">
                Login
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;