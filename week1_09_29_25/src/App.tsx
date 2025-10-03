/**
 * Main Application Entry Point
 *
 * This is the root component of the LearnHub application. It sets up all the necessary
 * providers and routing configuration for the entire application.
 *
 * Key Responsibilities:
 * - Configure React Query for server state management
 * - Set up theme provider for dark/light mode
 * - Configure routing with React Router
 * - Provide toast notifications and tooltips
 * - Define protected routes that require authentication
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Initialize React Query client for managing server state
const queryClient = new QueryClient();

/**
 * App Component
 *
 * Sets up the application with multiple provider wrappers:
 * 1. QueryClientProvider - Enables React Query for data fetching
 * 2. ThemeProvider - Manages light/dark theme switching
 * 3. TooltipProvider - Enables tooltips throughout the app
 * 4. BrowserRouter - Enables client-side routing
 *
 * Routes:
 * - / : Landing page (public)
 * - /auth : Login/signup page (public)
 * - /courses : Course list (protected - requires login)
 * - /course/:id : Individual course detail (protected - requires login)
 * - * : 404 Not Found page
 */
const App = () => (
    <QueryClientProvider client={queryClient}>
        {/* Theme Provider: Enables system theme detection and manual theme switching */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Tooltip Provider: Makes tooltips available throughout the app */}
            <TooltipProvider>
                {/* Toast notifications for user feedback */}
                <Toaster />
                <Sonner />

                {/* Browser Router: Enables client-side navigation */}
                <BrowserRouter>
                    <Routes>
                        {/* Public route: Landing page */}
                        <Route path="/" element={<Index />} />

                        {/* Public route: Authentication (login/signup) */}
                        <Route path="/auth" element={<Auth />} />

                        {/* Protected route: Course listing - requires authentication */}
                        <Route
                            path="/courses"
                            element={
                                <ProtectedRoute>
                                    <CourseList />
                                </ProtectedRoute>
                            }
                        />

                        {/* Protected route: Individual course details - requires authentication */}
                        <Route
                            path="/course/:id"
                            element={
                                <ProtectedRoute>
                                    <CourseDetail />
                                </ProtectedRoute>
                            }
                        />

                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

                        {/* Catch-all route: 404 Not Found page */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
