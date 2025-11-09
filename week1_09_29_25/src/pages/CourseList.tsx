/**
 * Course List Page Component
 *
 * This page displays all available courses in the platform and shows the user's
 * completion status for each course if they are logged in.
 *
 * Key Features:
 * - Fetches all courses from the database
 * - Fetches user's course progress if authenticated
 * - Shows completion badges on courses the user has finished
 * - Real-time authentication state updates
 * - Loading states with skeleton screens
 *
 * This is a protected route that requires authentication to access.
 */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const CourseList = () => {
    // State management
    const [courses, setCourses] = useState<any[]>([]); // All available courses
    const [userCourses, setUserCourses] = useState<any[]>([]); // User's course progress
    const [user, setUser] = useState<any>(null); // Current authenticated user
    const [loading, setLoading] = useState(true); // Loading state for data fetching
    const { toast } = useToast(); // Toast notifications for user feedback

    /**
     * Effect: Fetch courses and user progress on component mount
     *
     * This effect:
     * 1. Gets the current user's authentication status
     * 2. Fetches all courses from the database
     * 3. If user is logged in, fetches their course completion progress
     * 4. Sets up real-time auth state listener for login/logout events
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get current authenticated user
                const { data: { user: currentUser } } = await supabase.auth.getUser();
                setUser(currentUser);

                // Fetch all courses from the database, ordered by creation date
                const { data: coursesData, error: coursesError } = await supabase
                    .from("courses")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (coursesError) throw coursesError;
                setCourses(coursesData || []);

                // If user is authenticated, fetch their course progress
                if (currentUser) {
                    const { data: userCoursesData, error: userCoursesError } = await supabase
                        .from("user_courses")
                        .select("*")
                        .eq("user_id", currentUser.id);

                    if (userCoursesError) throw userCoursesError;
                    setUserCourses(userCoursesData || []);
                }
            } catch (error: any) {
                // Show error toast if data fetching fails
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Set up real-time authentication state listener
        // This updates the UI when user logs in/out
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        // Cleanup: Unsubscribe from auth listener on component unmount
        return () => subscription.unsubscribe();
    }, [toast]);

    /**
     * Helper function: Check if a course is completed by the user
     *
     * @param courseId - The ID of the course to check
     * @returns true if the user has completed this course, false otherwise
     */
    const isCompleted = (courseId: string) => {
        return userCourses.some(uc => uc.course_id === courseId && uc.completed);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation bar with user info */}
            <Navbar user={user} />

            <main className="container mx-auto px-4 py-8">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
                        Explore Courses
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Discover amazing courses and start your learning journey today
                    </p>
                </div>

                {/* Loading state: Show skeleton screens while data is being fetched */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-48 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Course grid: Display all courses in a responsive grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                thumbnail={course.thumbnail}
                                duration={course.duration}
                                completed={isCompleted(course.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state: Show message when no courses are available */}
                {!loading && courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No courses available yet</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CourseList;