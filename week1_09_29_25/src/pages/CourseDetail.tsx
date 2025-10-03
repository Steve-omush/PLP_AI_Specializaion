/**
 * Course Detail Page Component
 *
 * This page displays detailed information about a specific course and allows
 * authenticated users to track their progress by marking it complete/incomplete.
 *
 * Key Features:
 * - Displays full course information (title, description, thumbnail, duration)
 * - Shows completion status for authenticated users
 * - Allows users to mark course as complete/incomplete
 * - Redirects to login if unauthenticated user tries to track progress
 * - Real-time authentication state updates
 *
 * This is a protected route that requires authentication to access.
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const CourseDetail = () => {
    // Get course ID from URL parameters
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    // State management
    const [course, setCourse] = useState<any>(null); // Course details
    const [user, setUser] = useState<any>(null); // Current authenticated user
    const [userCourse, setUserCourse] = useState<any>(null); // User's progress for this course
    const [loading, setLoading] = useState(true); // Loading state for initial data fetch
    const [updating, setUpdating] = useState(false); // Loading state for completion toggle

    /**
     * Effect: Fetch course details and user progress on component mount
     *
     * This effect:
     * 1. Gets the current user's authentication status
     * 2. Fetches the specific course details by ID
     * 3. If user is logged in, fetches their progress for this course
     * 4. Sets up real-time auth state listener
     * 5. Redirects to home on error
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get current authenticated user
                const { data: { user: currentUser } } = await supabase.auth.getUser();
                setUser(currentUser);

                // Fetch course details from database
                const { data: courseData, error: courseError } = await supabase
                    .from("courses")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (courseError) throw courseError;
                setCourse(courseData);

                // If user is authenticated, fetch their progress for this specific course
                if (currentUser) {
                    const { data: userCourseData } = await supabase
                        .from("user_courses")
                        .select("*")
                        .eq("user_id", currentUser.id)
                        .eq("course_id", id)
                        .maybeSingle(); // Use maybeSingle as user may not have progress yet

                    setUserCourse(userCourseData);
                }
            } catch (error: any) {
                // Show error and redirect to home if course fetch fails
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Set up real-time authentication state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        // Cleanup: Unsubscribe from auth listener on component unmount
        return () => subscription.unsubscribe();
    }, [id, navigate, toast]);

    /**
     * Handler: Toggle course completion status
     *
     * This function:
     * 1. Checks if user is authenticated (redirects to login if not)
     * 2. If user has existing progress, updates it
     * 3. If user has no progress record, creates one
     * 4. Shows success/error toast notifications
     *
     * Database interactions:
     * - UPDATE user_courses: Toggle completion status for existing record
     * - INSERT user_courses: Create new progress record if none exists
     */
    const handleToggleComplete = async () => {
        // Redirect to login if user is not authenticated
        if (!user) {
            toast({
                title: "Authentication required",
                description: "Please log in to track your progress",
            });
            navigate("/auth");
            return;
        }

        setUpdating(true);
        try {
            if (userCourse) {
                // User already has a progress record - update it
                const { error } = await supabase
                    .from("user_courses")
                    .update({
                        completed: !userCourse.completed,
                        completed_at: !userCourse.completed ? new Date().toISOString() : null,
                    })
                    .eq("id", userCourse.id);

                if (error) throw error;

                // Update local state to reflect changes
                setUserCourse({
                    ...userCourse,
                    completed: !userCourse.completed,
                    completed_at: !userCourse.completed ? new Date().toISOString() : null,
                });
            } else {
                // User has no progress record - create new one and mark as complete
                const { data, error } = await supabase
                    .from("user_courses")
                    .insert({
                        user_id: user.id,
                        course_id: id,
                        completed: true,
                        completed_at: new Date().toISOString(),
                    })
                    .select()
                    .single();

                if (error) throw error;
                setUserCourse(data);
            }

            // Show success message
            toast({
                title: userCourse?.completed ? "Marked as incomplete" : "Congratulations!",
                description: userCourse?.completed
                    ? "Course progress updated"
                    : "You've completed this course!",
                variant: userCourse?.completed ? "default" : "default",
            });
        } catch (error: any) {
            // Show error message if update/insert fails
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setUpdating(false);
        }
    };

    // Loading state: Show skeleton screens while data is being fetched
    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar user={user} />
                <main className="container mx-auto px-4 py-8">
                    <Skeleton className="h-8 w-32 mb-6" />
                    <Skeleton className="h-96 w-full rounded-xl mb-6" />
                    <Skeleton className="h-10 w-48 mb-4" />
                    <Skeleton className="h-20 w-full" />
                </main>
            </div>
        );
    }

    // Return null if course not found (error would have redirected)
    if (!course) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation bar */}
            <Navbar user={user} />

            <main className="container mx-auto px-4 py-8">
                {/* Back button to return to course list */}
                <Button
                    variant="ghost"
                    onClick={() => navigate("/courses")}
                    className="mb-6 hover:bg-secondary"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Courses
                </Button>

                {/* Two-column layout: Course details (left) and Progress sidebar (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column: Course information */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden shadow-card">
                            {/* Course thumbnail image */}
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6">
                                {/* Course title */}
                                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

                                {/* Course metadata: duration and completion status */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-5 h-5" />
                                        <span>{course.duration} minutes</span>
                                    </div>

                                    {/* Show completion badge if user has completed this course */}
                                    {userCourse?.completed && (
                                        <div className="flex items-center gap-2 text-success">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span className="font-medium">Completed</span>
                                        </div>
                                    )}
                                </div>

                                {/* Course description */}
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-semibold mb-3">About this course</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right column: Progress tracking sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24 shadow-card">
                            <h3 className="text-xl font-semibold mb-4">Your Progress</h3>

                            <div className="space-y-4">
                                {/* Show progress controls if user is authenticated */}
                                {user ? (
                                    <>
                                        {/* Display current completion status */}
                                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                            <span className="font-medium">Status</span>
                                            <span className={userCourse?.completed ? "text-success" : "text-muted-foreground"}>
                        {userCourse?.completed ? "Completed" : "Not Started"}
                      </span>
                                        </div>

                                        {/* Button to toggle completion status */}
                                        <Button
                                            onClick={handleToggleComplete}
                                            disabled={updating}
                                            className="w-full"
                                            variant={userCourse?.completed ? "outline" : "default"}
                                        >
                                            {updating ? "Updating..." : userCourse?.completed ? "Mark as Incomplete" : "Mark as Complete"}
                                        </Button>
                                    </>
                                ) : (
                                    /* Show login prompt if user is not authenticated */
                                    <div className="text-center p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Log in to track your progress
                                        </p>
                                        <Button onClick={() => navigate("/auth")} className="w-full">
                                            Login
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetail;