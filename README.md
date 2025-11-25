# StreamBox - OTT Streaming Platform

A modern Over-The-Top (OTT) streaming platform built with Next.js, React, and PostgreSQL. Stream movies, browse by genre, manage your watchlist, and enjoy a premium streaming experience.

## Features

- **Browse & Search**: Search movies by title, filter by genre and rating, and sort by trending/newest/top-rated
- **Video Player**: Interactive HTML5 video player with full controls (play, pause, volume, fullscreen)
- **User Authentication**: Sign up and log in to create personalized profiles
- **Watchlist Management**: Add movies to your watchlist and track watch history
- **Ratings & Reviews**: Rate movies and see community ratings
- **Admin Dashboard**: Manage content, add new movies, and view analytics
- **Responsive Design**: Fully responsive UI optimized for desktop, tablet, and mobile
- **Dark Theme**: Premium dark theme with modern UI components

## Tech Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Database**: PostgreSQL (Neon)
- **Authentication**: Session-based authentication with secure password hashing
- **UI Components**: Radix UI, Lucide React icons
- **Forms**: React Hook Form with Zod validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))
- **PostgreSQL Account**: Create a free account on [Neon](https://neon.tech/) for the database

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd streambox
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env.local\` file in the root directory and add your Neon database connection string:

\`\`\`bash
DATABASE_URL=postgresql://username:password@host/database_name
\`\`\`

To get your connection string:
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project or select an existing one
3. Copy the connection string from the "Connection string" section
4. Replace \`username\`, \`password\`, \`host\`, and \`database_name\` with your actual credentials

### 4. Initialize the Database

Run the database migration scripts to create the necessary tables:

\`\`\`bash
# Create tables
npm run seed:schema

# Seed dummy movies
npm run seed:movies
\`\`\`

Or manually run the SQL scripts:
1. Copy the SQL from \`scripts/01-create-tables.sql\`
2. Paste it into your Neon SQL editor
3. Run \`scripts/03-seed-simple-movies.sql\` to add sample movies

### 5. Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will start on [http://localhost:3000](http://localhost:3000)

## Running Locally

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload as you make changes.

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

### Linting

\`\`\`bash
npm run lint
\`\`\`

## Project Structure

\`\`\`
streambox/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   └── signup/page.tsx     # Signup page
│   ├── watch/[id]/page.tsx     # Video player page
│   ├── search/page.tsx         # Search/browse page
│   ├── profile/page.tsx        # User profile
│   ├── watchlist/page.tsx      # Watchlist page
│   ├── admin/page.tsx          # Admin dashboard
│   └── api/
│       ├── auth/               # Authentication endpoints
│       ├── videos/             # Video endpoints
│       ├── search/             # Search endpoint
│       ├── watchlist/          # Watchlist endpoints
│       ├── trending/           # Trending endpoint
│       └── admin/              # Admin endpoints
├── components/
│   ├── header.tsx              # Navigation header
│   ├── video-card.tsx          # Video card component
│   ├── video-modal.tsx         # Movie info modal
│   ├── video-grid.tsx          # Video grid layout
│   ├── video-player.tsx        # Video player
│   ├── auth-form.tsx           # Login/signup form
│   ├── search-filters.tsx      # Search filters
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── db.ts                   # Database connection
│   ├── auth.ts                 # Authentication utilities
│   └── utils.ts                # Utility functions
├── scripts/
│   ├── 01-create-tables.sql    # Database schema
│   ├── 02-seed-movies.sql      # Movie seeds
│   └── 03-seed-simple-movies.sql # Simple movie seeds
├── public/                     # Static assets
└── package.json               # Dependencies
\`\`\`

## Usage

### Creating an Account

1. Click "Sign In" or navigate to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Enter your email and password
3. Click "Sign Up" to create your account

### Logging In

1. Navigate to [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Enter any email and password (dummy authentication accepts any input for testing)
3. You'll be logged in and redirected to the homepage

### Browsing Movies

1. Click "Browse All" or use the search icon in the header
2. Use the search bar to find movies by title
3. Filter by genre or rating using the filters panel
4. Sort by newest, trending, or top-rated

### Playing Videos

1. Click on any movie card to open the movie info modal
2. Click "Watch on YouTube" to play the trailer
3. Or click the card to navigate to the watch page with the video player

### Managing Watchlist

1. Add movies to your watchlist from the video modal or player page
2. Navigate to [http://localhost:3000/watchlist](http://localhost:3000/watchlist) to view your saved movies

### Admin Dashboard

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to:
- Add new movies with title, description, genre, rating, and duration
- View all movies in a manageable table
- See platform analytics (total videos, users, views, top content)
- Edit or delete existing movies

## Database Schema

### Users Table
- `id`: Unique identifier
- `email`: User email address
- `password`: Hashed password
- `name`: User display name
- `is_admin`: Admin status flag
- `created_at`: Account creation timestamp

### Videos Table
- `id`: Video unique identifier
- `title`: Movie title
- `description`: Movie description
- `genre`: Movie genre
- `rating`: User rating (1-10)
- `duration`: Video duration in minutes
- `thumbnail_url`: Movie poster URL
- `video_url`: Video stream URL
- `created_at`: Upload timestamp

### Additional Tables
- **watchlist**: User's saved movies
- **watch_history**: User's watch history
- **ratings**: User ratings and reviews
- **categories**: Movie categories
- **subscriptions**: Subscription information

## Troubleshooting

### Database Connection Error

**Problem**: `Error connecting to database`

**Solution**:
1. Check your DATABASE_URL in `.env.local`
2. Ensure your Neon project is active
3. Verify your network allows outbound connections to Neon
4. Test the connection string directly in Neon SQL editor

### Port Already in Use

**Problem**: `Port 3000 is already in use`

**Solution**:
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

### Build Errors

**Problem**: `TypeScript or build errors`

**Solution**:
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
\`\`\`

### Movies Not Appearing

**Problem**: No movies show on the homepage

**Solution**:
1. Check if you ran the seed scripts
2. Verify the database has data: \`SELECT COUNT(*) FROM videos;\`
3. Restart the development server: \`npm run dev\`

## API Endpoints

### Authentication
- \`POST /api/auth/login\` - User login
- \`POST /api/auth/signup\` - User registration

### Videos
- \`GET /api/videos\` - Get all videos
- \`GET /api/videos/[id]\` - Get video details
- \`GET /api/trending\` - Get trending videos
- \`GET /api/search?q=query\` - Search videos

### Watchlist
- \`GET /api/watchlist\` - Get user's watchlist
- \`POST /api/watchlist\` - Add to watchlist
- \`DELETE /api/watchlist/[id]\` - Remove from watchlist

### Admin
- \`GET /api/admin/videos\` - List all videos
- \`POST /api/admin/videos\` - Create new video
- \`PUT /api/admin/videos/[id]\` - Update video
- \`DELETE /api/admin/videos/[id]\` - Delete video
- \`GET /api/admin/stats\` - Get platform statistics

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project" and select your repository
4. Add your \`DATABASE_URL\` environment variable
5. Click "Deploy"

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting platform:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean
- Self-hosted VPS

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For help and support:
- Create an issue on GitHub
- Check the troubleshooting section above
- Review the code comments and documentation

## Roadmap

- Add payment integration with Stripe
- Implement social features (share, comments)
- Add mobile app using React Native
- Advanced recommendation algorithm
- Live streaming support
- User generated content uploads
- Social authentication (Google, GitHub)

---

**Happy Streaming!** Enjoy your StreamBox OTT platform experience.
