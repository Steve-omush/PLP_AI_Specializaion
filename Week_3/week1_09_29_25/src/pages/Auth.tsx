/**
 * Authentication Page Component
 *
 * This page handles both user login and signup functionality.
 * It provides a tab-based interface to switch between login and signup forms.
 *
 * Key Features:
 * - Email/password authentication using Supabase Auth
 * - Input validation using Zod schemas
 * - Automatic redirect if user is already logged in
 * - Form validation with user-friendly error messages
 * - "Continue as guest" option to browse without authentication
 * - Toast notifications for success/error feedback
 *
 * Security:
 * - Email validation ensures proper format
 * - Password must be at least 6 characters
 * - Email redirect URL configured for security
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schemas using Zod for type-safe validation
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    // State management
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const [email, setEmail] = useState(""); // Email input value
    const [password, setPassword] = useState(""); // Password input value

    /**
     * Effect: Check if user is already authenticated on component mount
     * If user is logged in, redirect them to the homepage
     */
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                navigate("/"); // Redirect authenticated users
            }
        };
        checkUser();
    }, [navigate]);

    /**
     * Helper function: Validate email and password inputs
     *
     * Uses Zod schemas to validate:
     * - Email must be valid format
     * - Password must be at least 6 characters
     *
     * @returns true if validation passes, false otherwise
     * Shows toast notification on validation errors
     */
    const validateInputs = () => {
        try {
            emailSchema.parse(email);
            passwordSchema.parse(password);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast({
                    title: "Validation Error",
                    description: error.errors[0].message,
                    variant: "destructive",
                });
            }
            return false;
        }
    };

    /**
     * Handler: User sign-up
     *
     * Process:
     * 1. Validate email and password inputs
     * 2. Call Supabase signUp with email and password
     * 3. Configure email redirect URL for verification emails
     * 4. Show success/error toast notifications
     *
     * @param e - Form submit event
     *
     * Supabase Auth: Creates new user account
     */
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            // Create new user account with Supabase Auth
            const { error } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/` // Redirect after email verification
                }
            });

            if (error) throw error;

            // Show success message
            toast({
                title: "Success!",
                description: "Account created successfully. You can now log in.",
            });
        } catch (error: any) {
            // Show error message if signup fails
            toast({
                title: "Sign up failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handler: User login
     *
     * Process:
     * 1. Validate email and password inputs
     * 2. Call Supabase signInWithPassword
     * 3. Redirect to courses page on success
     * 4. Show error toast on failure
     *
     * @param e - Form submit event
     *
     * Supabase Auth: Signs in existing user
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            // Sign in user with email and password
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) throw error;

            // Redirect to courses page on successful login
            navigate("/courses");
        } catch (error: any) {
            // Show error message if login fails
            toast({
                title: "Login failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 shadow-lg">
                {/* App branding */}
                <div className="flex items-center justify-center mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold ml-3 bg-gradient-primary bg-clip-text text-transparent">
            LearnHub
          </span>
                </div>

                {/* Tab interface for switching between login and signup */}
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Login form */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email input */}
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password input */}
                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Sign up form */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            {/* Email input */}
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password input with validation hint */}
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Must be at least 6 characters
                                </p>
                            </div>

                            {/* Submit button */}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating account..." : "Sign Up"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                {/* Guest access option */}
                <div className="mt-6 text-center">
                    <Button
                        variant="link"
                        onClick={() => navigate("/")}
                        className="text-sm text-muted-foreground"
                    >
                        Continue as guest
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Auth;