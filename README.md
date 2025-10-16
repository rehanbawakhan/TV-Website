# Vegavath Technical Club Website

A modern, interactive website for the Vegavath Technical Club featuring 3D animations, cinematic design, and comprehensive club management features.

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **3D Graphics**: React Three Fiber (R3F) + Drei
- **Styling**: Tailwind CSS with custom orange-black gradient theme
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Forms**: React Hook Form
- **Deployment**: Vercel

## Project Structure

```
vegavath/
├── src/
│   ├── app/                 # Next.js App Router (pages)
│   ├── components/          # React components
│   ├── lib/                 # Utility functions and configurations
│   └── types/               # TypeScript type definitions
├── public/
│   └── assets/              # Static assets (images, 3D models)
├── supabase_schema.sql      # Database schema (PostgreSQL/Supabase)
└── .env.example             # Environment variables template
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd vegavath
npm install
```

### 2. Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `supabase_schema.sql` in your Supabase SQL editor (PostgreSQL only)
3. This will create all necessary tables, policies, and sample data

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## Features

### Current Implementation
- ✅ Cinematic loading screen with Vegavath logo animation (4s, only on first visit)
- ✅ Interactive 3D hero section with go-kart model
- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling sections with parallax effects
- ✅ Orange-black gradient theme throughout
- ✅ Neon glow effects on key titles and loading text
- ✅ Supabase backend configuration
- ✅ TypeScript setup with proper type definitions
- ✅ Form validation and multi-step registration
- ✅ Admin panel with login and dashboard

### Planned Features
- [ ] The Crew page with team member profiles
- [ ] Interactive gallery with 3D lightbox
- [ ] Join Us page with multi-step application form
- [ ] Interview scheduling system
- [ ] About Us page with club history and sponsors
- [ ] Contact page with form integration
- [ ] Admin dashboard for managing applications
- [ ] Mobile-optimized 3D experiences

## Domains

The club operates in 5 key domains:

1. **Automotive** - Vehicle design and engineering
2. **Robotics** - Autonomous systems and AI
3. **Design** - UI/UX and visual design
4. **Media** - Content creation and photography
5. **Marketing** - Brand strategy and outreach

## Deployment

### Deploy to Vercel

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Configure the following in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
3. **Deploy**: Vercel will automatically build and deploy your site

### Alternative Deployment

The app can also be deployed to:
- **Netlify**: Configure build command as `npm run build` and publish directory as `out`
- **Railway**: Connect GitHub repo and set environment variables
- **Docker**: Use the included Dockerfile for containerized deployment

### Performance Optimizations

- ✅ Static page generation for faster loading
- ✅ Image optimization with Next.js Image component
- ✅ Racing animations optimized for 60fps performance
- ✅ Bundle size optimization with tree shaking

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

Built with ❤️ by the Vegavath Team
