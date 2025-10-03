# 📚 LearnHub - Online Learning Platform

![LearnHub Banner](https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=400&fit=crop)

## 👨‍💻 Author Information

**Author:** Stephen Omusula  
**Email:** stephenomusula3@gmail.com  
**Project Type:** Full-Stack Learning Management System

---

## 🎯 Project Overview

**LearnHub** is a modern, full-featured online learning platform that allows users to browse courses, track their learning progress, and manage their educational journey. The platform provides an intuitive interface for both guest browsing and authenticated user experiences with course completion tracking.

### ✨ Key Features

🔐 **User Authentication**
- Email/password authentication
- Secure login and signup flows
- Guest browsing mode
- Real-time authentication state management
- Automatic session persistence

📖 **Course Management**
- Browse all available courses
- View detailed course information
- Course thumbnails and descriptions
- Duration tracking for each course

📊 **Progress Tracking**
- Mark courses as complete/incomplete
- Visual completion badges
- Personal progress dashboard
- Course status indicators

🎨 **User Experience**
- Light/Dark theme toggle
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and skeleton screens
- Toast notifications for user feedback

---

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.3.1 | UI component library and framework |
| **TypeScript** | Latest | Type-safe JavaScript development |
| **Vite** | Latest | Fast build tool and dev server |
| **React Router DOM** | ^6.30.1 | Client-side routing and navigation |
| **Tailwind CSS** | Latest | Utility-first CSS framework |
| **shadcn/ui** | Latest | Pre-built UI component library |
| **Lucide React** | ^0.462.0 | Beautiful icon library |
| **next-themes** | ^0.3.0 | Theme management (light/dark mode) |

### Backend Technologies

| Technology | Purpose |
|------------|---------|
| **Lovable Cloud** | Backend infrastructure platform |
| **PostgreSQL** | Relational database (via Lovable Cloud) |
| **Supabase SDK** | Database client and authentication |
| **Row Level Security (RLS)** | Data security and access control |

### State Management & Data Fetching

| Library | Purpose |
|---------|---------|
| **TanStack Query** | Server state management and caching |
| **React Hooks** | Local state management (useState, useEffect) |
| **Supabase Realtime** | Real-time authentication state updates |

### Form Validation

| Library | Purpose |
|---------|---------|
| **Zod** | TypeScript-first schema validation |
| **React Hook Form** | Form state management and validation |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              React Application                       │  │
│  │  ┌─────────────────────────────────────────────┐   │  │
│  │  │   Components (UI Layer)                     │   │  │
│  │  │   - Pages (Index, Auth, CourseList, etc.)  │   │  │
│  │  │   - Reusable Components (Navbar, Cards)    │   │  │
│  │  │   - UI Components (shadcn/ui)              │   │  │
│  │  └─────────────────────────────────────────────┘   │  │
│  │                      │                              │  │
│  │                      ↓                              │  │
│  │  ┌─────────────────────────────────────────────┐   │  │
│  │  │   Routing Layer (React Router)              │   │  │
│  │  │   - Route protection                        │   │  │
│  │  │   - Navigation management                   │   │  │
│  │  └─────────────────────────────────────────────┘   │  │
│  │                      │                              │  │
│  │                      ↓                              │  │
│  │  ┌─────────────────────────────────────────────┐   │  │
│  │  │   Supabase Client                           │   │  │
│  │  │   - Authentication (Auth API)               │   │  │
│  │  │   - Database queries (PostgreSQL)           │   │  │
│  │  │   - Real-time subscriptions                 │   │  │
│  │  └─────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ↓ HTTPS/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                  LOVABLE CLOUD (Backend)                    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Supabase Backend Services                    │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  PostgreSQL Database                           │ │  │
│  │  │  ┌──────────────┬──────────────────┐          │ │  │
│  │  │  │   courses    │  user_courses    │          │ │  │
│  │  │  │   table      │  table           │          │ │  │
│  │  │  └──────────────┴──────────────────┘          │ │  │
│  │  │                                                │ │  │
│  │  │  Row Level Security (RLS) Policies:           │ │  │
│  │  │  - Courses: Public read access                │ │  │
│  │  │  - User Courses: User-specific access         │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Authentication Service                        │ │  │
│  │  │  - Email/password authentication               │ │  │
│  │  │  - Session management                          │ │  │
│  │  │  - JWT tokens                                  │ │  │
│  │  │  - Auto-refresh tokens                         │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                      │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Realtime Service                              │ │  │
│  │  │  - Auth state change notifications             │ │  │
│  │  │  - WebSocket connections                       │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
week1_09_29_25/
├── public/                      # Static assets
│   ├── favicon.ico             # App icon
│   ├── robots.txt              # SEO robots file
│   └── placeholder.svg         # Placeholder images
│
├── src/                        # Source code
│   ├── components/             # Reusable components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── card.tsx        # Card component
│   │   │   ├── input.tsx       # Input component
│   │   │   ├── skeleton.tsx    # Loading skeleton
│   │   │   └── ... (50+ UI components)
│   │   │
│   │   ├── CourseCard.tsx      # Individual course card
│   │   ├── Navbar.tsx          # Global navigation bar
│   │   └── ProtectedRoute.tsx  # Route authentication wrapper
│   │
│   ├── pages/                  # Page components
│   │   ├── Index.tsx           # Landing page
│   │   ├── Auth.tsx            # Login/Signup page
│   │   ├── CourseList.tsx      # All courses page
│   │   ├── CourseDetail.tsx    # Individual course page
│   │   └── NotFound.tsx        # 404 error page
│   │
│   ├── integrations/           # External service integrations
│   │   └── supabase/
│   │       ├── client.ts       # Supabase client config
│   │       └── types.ts        # Database type definitions
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notification hook
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Helper utilities
│   │
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite type definitions
│
├── supabase/                   # Backend configuration
│   ├── config.toml             # Supabase project config
│   └── migrations/             # Database migrations
│
├── .env                        # Environment variables
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # This file
```

---

## 🔄 Data Flow & Component Communication

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Authentication Flow                        │
└─────────────────────────────────────────────────────────────┘

1. User visits /auth page
        ↓
2. Auth.tsx component loads
        ↓
3. User enters email/password
        ↓
4. Form validation (Zod schemas)
        ↓
5. supabase.auth.signUp() or signInWithPassword()
        ↓
6. Lovable Cloud validates credentials
        ↓
7. JWT token returned to client
        ↓
8. Token stored in localStorage (automatic via Supabase)
        ↓
9. Auth state change event triggered
        ↓
10. All components with onAuthStateChange listeners update
        ↓
11. User redirected to /courses
```

### Course Data Fetching Flow

```
┌─────────────────────────────────────────────────────────────┐
│               Course Data Fetching Flow                     │
└─────────────────────────────────────────────────────────────┘

1. User navigates to /courses
        ↓
2. ProtectedRoute checks authentication
        ↓
3. If authenticated, render CourseList component
        ↓
4. CourseList.tsx useEffect hook runs
        ↓
5. Parallel data fetching:
   ├─→ supabase.from("courses").select("*")
   │   └─→ Fetches all courses from database
   │
   └─→ supabase.from("user_courses").select("*")
       └─→ Fetches user's progress records
        ↓
6. Data stored in component state
        ↓
7. CourseCard components rendered for each course
        ↓
8. User clicks on a course
        ↓
9. Navigate to /course/:id
        ↓
10. CourseDetail.tsx loads and fetches specific course
```

### Progress Tracking Flow

```
┌─────────────────────────────────────────────────────────────┐
│              Progress Tracking Flow                         │
└─────────────────────────────────────────────────────────────┘

1. User clicks "Mark as Complete" button
        ↓
2. handleToggleComplete() function called
        ↓
3. Check if user is authenticated
        ↓
4. Check if user_courses record exists
        ↓
5a. If exists:                  5b. If not exists:
    UPDATE user_courses             INSERT into user_courses
    SET completed = !completed      SET completed = true
        ↓                                   ↓
6. Database RLS policies validate request
   (Only user can update their own progress)
        ↓
7. Database operation completes
        ↓
8. Local state updated
        ↓
9. UI re-renders with new completion status
        ↓
10. Success toast notification shown
```

---

## 🗄️ Database Schema

### Tables Overview

#### **courses** table
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT,
  duration INTEGER NOT NULL,  -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS Policy: Anyone can view courses
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  USING (true);
```

#### **user_courses** table
```sql
CREATE TABLE user_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,      -- References auth.users (managed by Supabase)
  course_id UUID NOT NULL,    -- References courses.id
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS Policies: Users can only access their own progress
CREATE POLICY "Users can view their own progress"
  ON user_courses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track their own progress"
  ON user_courses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_courses FOR UPDATE
  USING (auth.uid() = user_id);
```

### Entity Relationship Diagram

```
┌─────────────────────┐
│   auth.users        │
│  (Supabase Auth)    │
│─────────────────────│
│ id (UUID)           │
│ email               │
│ created_at          │
└─────────────────────┘
          │
          │ 1
          │
          │ N
          ↓
┌─────────────────────┐        ┌─────────────────────┐
│   user_courses      │   N    │     courses         │
│─────────────────────│───────>│─────────────────────│
│ id (UUID)           │   1    │ id (UUID)           │
│ user_id (UUID) ─────┼────────│ title               │
│ course_id (UUID)────┘        │ description         │
│ completed (BOOL)             │ thumbnail           │
│ completed_at                 │ duration            │
│ created_at                   │ created_at          │
└─────────────────────┘        └─────────────────────┘
```

---

## 🔐 Security Implementation

### Row Level Security (RLS) Policies

**Courses Table:**
- ✅ **SELECT**: Public access (anyone can view courses)
- ❌ **INSERT**: No access (courses added by admins only)
- ❌ **UPDATE**: No access (courses updated by admins only)
- ❌ **DELETE**: No access (courses deleted by admins only)

**User Courses Table:**
- ✅ **SELECT**: User-specific (auth.uid() = user_id)
- ✅ **INSERT**: User-specific (auth.uid() = user_id)
- ✅ **UPDATE**: User-specific (auth.uid() = user_id)
- ❌ **DELETE**: No access (prevent accidental deletion)

### Authentication Security
- JWT tokens with automatic refresh
- Secure password hashing (handled by Supabase Auth)
- Email validation before signup
- Protected routes with ProtectedRoute component
- Real-time session management

---

## 🔌 Frontend-Backend Connection

### How They Connect

The frontend and backend communicate through the **Supabase JavaScript SDK**:

#### **Connection File:** `src/integrations/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,        // Store tokens in localStorage
    persistSession: true,          // Persist session across page reloads
    autoRefreshToken: true,        // Automatically refresh expired tokens
  }
});
```

### API Communication Pattern

```typescript
// Example: Fetching courses
import { supabase } from "@/integrations/supabase/client";

const { data, error } = await supabase
  .from("courses")           // Table name
  .select("*")               // Columns to fetch
  .order("created_at", { ascending: false });  // Ordering

if (error) {
  console.error("Error:", error);
} else {
  console.log("Courses:", data);
}
```

### Real-time Updates

```typescript
// Subscribe to authentication changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session.user);
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher (comes with Node.js)
- **Git**: For version control

### Installation Steps

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
The `.env` file is automatically configured with Lovable Cloud connection details:
```env
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint code
npm run lint
```

---

## 🎨 Frontend Architecture Details

### Component Hierarchy

```
App.tsx (Root)
├── QueryClientProvider (React Query setup)
├── ThemeProvider (Light/Dark mode)
└── BrowserRouter (Routing)
    └── Routes
        ├── Index (Landing Page)
        │   └── Navbar
        │       
        ├── Auth (Login/Signup)
        │   
        └── ProtectedRoute
            ├── CourseList
            │   ├── Navbar
            │   └── CourseCard (multiple)
            │       
            └── CourseDetail
                └── Navbar
```

### State Management Strategy

**Local State (useState):**
- Component-specific data (form inputs, loading states)
- UI state (modals open/closed, tabs selected)

**Server State (Supabase + useEffect):**
- Course data
- User authentication state
- User progress data

**Real-time State (Supabase subscriptions):**
- Authentication state changes
- Live updates to data

### Routing Strategy

| Route | Component | Protection | Purpose |
|-------|-----------|------------|---------|
| `/` | Index | Public | Landing page |
| `/auth` | Auth | Public | Login/Signup |
| `/courses` | CourseList | Protected | Browse courses |
| `/course/:id` | CourseDetail | Protected | View course details |
| `/*` | NotFound | Public | 404 error page |

---

## 🗂️ Backend Architecture Details

### Lovable Cloud Infrastructure

Lovable Cloud provides:
- **Managed PostgreSQL database**
- **Authentication service** (Supabase Auth)
- **Real-time subscriptions** (WebSocket connections)
- **Automatic API generation** (REST and GraphQL)
- **Row Level Security** (Database-level access control)

### Database Operations

**Read Operations (SELECT):**
```typescript
// Get all courses
const { data } = await supabase
  .from('courses')
  .select('*');

// Get specific course
const { data } = await supabase
  .from('courses')
  .select('*')
  .eq('id', courseId)
  .single();
```

**Write Operations (INSERT/UPDATE):**
```typescript
// Create progress record
const { data } = await supabase
  .from('user_courses')
  .insert({
    user_id: userId,
    course_id: courseId,
    completed: true,
  });

// Update progress record
const { data } = await supabase
  .from('user_courses')
  .update({ completed: false })
  .eq('id', recordId);
```

---

## 🎯 User Flows

### New User Registration Flow

```
1. User visits homepage (/)
   ↓
2. Clicks "Get Started" button
   ↓
3. Redirected to /auth
   ↓
4. Clicks "Sign Up" tab
   ↓
5. Enters email and password
   ↓
6. Form validation (Zod)
   ↓
7. Supabase creates account
   ↓
8. Success message shown
   ↓
9. User switches to "Login" tab
   ↓
10. Logs in with credentials
    ↓
11. Redirected to /courses
    ↓
12. Can now browse and track progress
```

### Course Completion Flow

```
1. User is on /courses page
   ↓
2. Clicks on a course card
   ↓
3. Redirected to /course/:id
   ↓
4. Views course details
   ↓
5. Clicks "Mark as Complete" button
   ↓
6. System creates/updates user_courses record
   ↓
7. UI updates with completion badge
   ↓
8. Success toast notification
   ↓
9. User returns to /courses
   ↓
10. Course shows green checkmark badge
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { /* sm */ }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { /* md, lg */ }

/* Desktop */
@media (min-width: 1025px) { /* xl, 2xl */ }
```

### Mobile Optimizations
- Hamburger menu for navigation (hidden on desktop)
- Stacked layouts for course cards
- Touch-friendly button sizes
- Reduced padding and margins
- Simplified navigation

---

## 🚀 Deployment

### Building for Production

```bash
# Create optimized production build
npm run build

# Output location: dist/
```

### Deployment Options

**Via Lovable Platform:**
1. Click "Publish" button in Lovable interface
2. Your app is automatically deployed
3. Accessible at `https://yourdomain.lovable.app`

**Manual Deployment:**
- Deploy `dist/` folder to any static hosting service
- Vercel, Netlify, AWS S3, etc.

---

## 🔧 Configuration Files

### `vite.config.ts`
Vite build tool configuration

### `tailwind.config.ts`
Tailwind CSS theme and plugin configuration

### `tsconfig.json`
TypeScript compiler options

### `supabase/config.toml`
Backend project configuration (auto-managed)

---

## 📈 Performance Optimizations

✅ **Code Splitting** - Automatic route-based splitting by Vite  
✅ **Lazy Loading** - Components loaded on demand  
✅ **Image Optimization** - Compressed thumbnails  
✅ **Caching** - Browser caching for static assets  
✅ **Minimal Bundle Size** - Tree shaking unused code  
✅ **Fast Refresh** - Hot module replacement in development  

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch courses"
**Solution:** Check that Lovable Cloud backend is running and `.env` variables are correct.

### Issue: "Authentication not persisting"
**Solution:** Ensure localStorage is enabled in browser. Check Supabase client configuration.

### Issue: "Can't mark course as complete"
**Solution:** Verify user is logged in and RLS policies are correctly set on `user_courses` table.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Supabase Documentation](https://supabase.com/docs)
- [Lovable Documentation](https://docs.lovable.dev)

---

## 📝 License

This project is part of the Lovable platform. All rights reserved.

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Supabase** for backend infrastructure
- **Lovable** for the development platform
- **Lucide** for icon library
- **Unsplash** for course thumbnail images

---

**Built with ❤️ by Stephen Omusula using Lovable**

For questions or support, contact: stephenomusula3@gmail.com
