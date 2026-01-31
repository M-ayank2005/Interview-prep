# Interview Prep

A production-grade interview preparation platform for SDE roles. Built with Next.js 16, React 19, Node.js/Express, and MongoDB.

## 🚀 Features

### Problem Tracker
- **150+ curated problems** across 12 categories
- Advanced filtering by category, difficulty, and completion status
- Notes and hints for each problem
- Spaced repetition system for optimal review scheduling

### Study Plans
- **DSA Fundamentals** - 4 weeks for beginners
- **Blind 75** - Classic interview prep list
- **NeetCode 150** - Extended problem set
- **FAANG Interview Prep** - Advanced preparation
- **Advanced DP Mastery** - Deep dive into dynamic programming

### Company-Specific Prep
- Interview patterns for Google, Amazon, Meta, Microsoft, Uber, Apple
- Difficulty distribution insights
- Round-by-round breakdown
- Company-specific tips

### Cheat Sheets
- Data structures complexity reference
- Algorithm templates with code
- Problem pattern indicators
- Interview tips and common mistakes

### Mock Interviews
- Schedule and track mock interviews
- Performance tracking
- Notes and feedback system

### Analytics Dashboard
- Progress tracking with streaks
- Daily goals and activity
- Category-wise completion rates
- Visual analytics

## 📁 Project Structure

```
dsa-problems-website/
├── frontend/                 # Next.js frontend
│   ├── app/                  # App router pages
│   │   ├── dashboard/        # Main dashboard
│   │   ├── problems/         # Problem tracker
│   │   ├── patterns/         # DSA patterns
│   │   ├── study-plans/      # Study plans
│   │   ├── companies/        # Company prep
│   │   ├── cheat-sheets/     # Quick reference
│   │   ├── scheduler/        # Mock interviews
│   │   ├── complexity/       # Time/space complexity
│   │   └── tips/             # Interview tips
│   ├── components/           # React components
│   │   └── ui/               # UI component library
│   └── lib/                  # Utilities and API client
│
├── backend/                  # Node.js/Express backend
│   ├── src/
│   │   ├── config/           # Configuration
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── scripts/          # Database seeding
│   │   └── utils/            # Utilities
│   └── dist/                 # Compiled JavaScript
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Data fetching and caching
- **Recharts** - Analytics charts
- **Framer Motion** - Animations

### Backend
- **Node.js + Express** - Web server
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **Winston** - Logging
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- pnpm (for frontend) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-problems-website
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables**
   
   Create `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/interview-prep
   NODE_ENV=development
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

7. **Start the backend**
   ```bash
   npm run dev
   ```

8. **Start the frontend** (new terminal)
   ```bash
   cd frontend
   pnpm dev
   ```

9. **Open the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/problems/category/:category` - Get problems by category

### Progress
- `GET /api/progress` - Get user's progress
- `PUT /api/progress/:problemId` - Update problem progress
- `GET /api/progress/analytics` - Get analytics data
- `GET /api/progress/review/due` - Get problems due for review

### Study Plans
- `GET /api/study-plans` - List study plans
- `POST /api/study-plans/:id/enroll` - Enroll in a plan
- `PUT /api/study-plans/:id/progress` - Update progress

### Mock Interviews
- `GET /api/mock-interviews` - List scheduled interviews
- `POST /api/mock-interviews` - Schedule new interview
- `PUT /api/mock-interviews/:id` - Update interview

### Companies
- `GET /api/companies` - List company patterns
- `GET /api/companies/:slug` - Get company details

### Code Snippets
- `GET /api/snippets` - List user's snippets
- `POST /api/snippets` - Create new snippet
- `PUT /api/snippets/:id` - Update snippet
- `DELETE /api/snippets/:id` - Delete snippet

## 🔐 Authentication

The app uses session-based anonymous authentication:
- A unique session ID is generated on first visit
- Stored in localStorage
- Sent with all API requests via `x-session-id` header
- No login required - data persists per browser

## 📊 Spaced Repetition

The SM-2 algorithm is used for optimal problem review scheduling:
- Confidence ratings (0-5) adjust review intervals
- Higher confidence = longer intervals
- Automatically suggests problems to review

## 🎨 Theming

- Dark mode by default
- Consistent color palette using CSS variables
- Responsive design for all screen sizes

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

Built with ❤️ for interview success
