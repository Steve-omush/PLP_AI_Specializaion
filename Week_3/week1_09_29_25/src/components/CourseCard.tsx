/**
 * Course Card Component
 * 
 * A reusable card component that displays course information in a visually appealing way.
 * Used in the CourseList page to show all available courses.
 * 
 * Key Features:
 * - Displays course thumbnail, title, description, and duration
 * - Shows completion badge if user has completed the course
 * - Clickable link to navigate to course detail page
 * - Hover effects for better UX
 * - Responsive design that works on all screen sizes
 * 
 * Props:
 * @param id - Unique course identifier (for navigation)
 * @param title - Course title/name
 * @param description - Brief course description
 * @param thumbnail - URL to course thumbnail image
 * @param duration - Course duration in minutes
 * @param completed - Whether the user has completed this course (optional)
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  completed?: boolean;
}

const CourseCard = ({ id, title, description, thumbnail, duration, completed }: CourseCardProps) => {
  return (
    /* Wrap entire card in Link for navigation to course detail page */
    <Link to={`/course/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer bg-gradient-card">
        {/* Course thumbnail with hover zoom effect */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Completion badge - only shows if course is completed */}
          {completed && (
            <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full p-2 shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
        </div>
        
        {/* Card content: Title, description, and metadata */}
        <div className="p-5">
          {/* Course title with hover color change */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Course description - truncated to 2 lines */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Course duration badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration} mins
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;