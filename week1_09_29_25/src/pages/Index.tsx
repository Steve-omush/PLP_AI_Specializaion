/**
 * Landing Page Component
 *
 * This is the homepage/landing page of the LearnHub application.
 * It serves as the entry point for new users and provides information about the platform.
 *
 * Key Features:
 * - Hero section with main value proposition
 * - Features section highlighting key benefits
 * - Call-to-action buttons directing to authentication
 * - Responsive layout that works on all devices
 *
 * This page is public and accessible without authentication.
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
    // Hook for programmatic navigation
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation bar with authentication button */}
            <Navbar user={null} showAuthButton />

            <main>
                {/* Hero Section: Main value proposition and primary CTA */}
                <section className="container mx-auto px-4 py-20 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* App logo/icon */}
                        <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                            <GraduationCap className="w-12 h-12 text-primary-foreground" />
                        </div>

                        {/* Main headline with gradient text */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                            Welcome to LearnHub
                        </h1>

                        {/* Subheading explaining the platform */}
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Your gateway to mastering new skills. Access high-quality courses,
                            track your progress, and achieve your learning goals with our intuitive platform.
                        </p>

                        {/* Primary CTA button - directs to authentication */}
                        <Button
                            size="lg"
                            onClick={() => navigate("/auth")}
                            className="text-lg px-8 py-6 shadow-elegant"
                        >
                            Get Started
                        </Button>
                    </div>
                </section>

                {/* Features Section: Highlights key benefits of the platform */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose LearnHub?</h2>

                    {/* Feature cards grid - responsive layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Feature 1: Quality Content */}
                        <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
                            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Quality Content</h3>
                            <p className="text-muted-foreground">
                                Carefully curated courses designed by industry experts to help you learn effectively.
                            </p>
                        </Card>

                        {/* Feature 2: Progress Tracking */}
                        <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
                            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                            <p className="text-muted-foreground">
                                Monitor your learning journey with our intuitive progress tracking system.
                            </p>
                        </Card>

                        {/* Feature 3: Flexible Learning */}
                        <Card className="p-6 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
                            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Learn at Your Pace</h3>
                            <p className="text-muted-foreground">
                                Flexible learning that adapts to your schedule and learning style.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* CTA Section: Final call-to-action encouraging sign-up */}
                <section className="container mx-auto px-4 py-16">
                    <Card className="max-w-3xl mx-auto p-12 text-center bg-gradient-primary shadow-elegant">
                        <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-lg text-primary-foreground/90 mb-6">
                            Join thousands of learners today and unlock your potential.
                        </p>
                        {/* Secondary CTA button */}
                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={() => navigate("/auth")}
                            className="text-lg px-8 py-6"
                        >
                            Sign Up Now
                        </Button>
                    </Card>
                </section>
            </main>

            {/* Footer with copyright information */}
            <footer className="border-t mt-16 py-8">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>&copy; 2025 LearnHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Index;
