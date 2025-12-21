# Subrajit Pandey - Modern Portfolio

A modern, dynamic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time data integration from GitHub, Spotify, LeetCode, and Medium APIs.

## 🚀 Features

### Real-time Data Integration
- **GitHub Stats**: Live repository count, stars, commits, and language statistics
- **Spotify Integration**: Currently playing track with album artwork
- **LeetCode Progress**: Problem-solving statistics and progress tracking
- **Medium Blog**: Latest articles with engagement metrics
- **Live Coding Activity**: Daily and weekly commit tracking

### Modern UI/UX
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Professional dark color scheme with green accents
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Interactive Elements**: Hover effects, loading states, and micro-interactions
- **Accessibility**: Built with WCAG guidelines and keyboard navigation

### Performance & SEO
- **Next.js 14**: Latest features including App Router and Server Components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Image Optimization**: Next.js Image component with lazy loading
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Fetching**: SWR for real-time updates
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes for data fetching
│   │   ├── github/         # GitHub API integration
│   │   ├── spotify/        # Spotify API integration
│   │   ├── leetcode/       # LeetCode API integration
│   │   └── medium/         # Medium RSS feed integration
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── components/             # React components
│   ├── About.tsx          # About section
│   ├── Blog.tsx           # Medium blog integration
│   ├── Contact.tsx        # Contact form and info
│   ├── Experience.tsx     # Work experience timeline
│   ├── Footer.tsx         # Footer with social links
│   ├── Hero.tsx           # Landing section with typing animation
│   ├── LoadingScreen.tsx  # Initial loading animation
│   ├── Navbar.tsx         # Navigation with smooth scrolling
│   ├── Projects.tsx       # Featured and other projects
│   ├── Skills.tsx         # Skills with progress bars
│   └── Stats.tsx          # Real-time statistics dashboard
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subrajitpandey/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your API credentials:
   ```env
   # GitHub API (required for GitHub stats)
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
   GITHUB_TOKEN=your_github_personal_access_token
   
   # Spotify API (optional - for currently playing music)
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   
   # Medium (required for blog posts)
   NEXT_PUBLIC_MEDIUM_USERNAME=@your_medium_username
   
   # LeetCode (required for coding stats)
   NEXT_PUBLIC_LEETCODE_USERNAME=your_leetcode_username
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Setup

#### GitHub API
1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens)
2. Add `repo` and `user` scopes
3. Add the token to your `.env.local` file

#### Spotify API (Optional)
1. Create a [Spotify App](https://developer.spotify.com/dashboard)
2. Get your Client ID and Client Secret
3. Set up OAuth flow to get a refresh token
4. Add credentials to your `.env.local` file

#### Medium Integration
- Uses RSS feed, no API key required
- Just add your Medium username to `.env.local`

#### LeetCode Integration
- Uses third-party APIs or web scraping
- Add your LeetCode username to `.env.local`

### Customization

#### Personal Information
Update the following files with your information:
- `src/components/Hero.tsx` - Name and introduction
- `src/components/About.tsx` - Bio and skills
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Your projects
- `src/components/Contact.tsx` - Contact information

#### Styling
- Colors: Edit `tailwind.config.js` for custom color scheme
- Fonts: Update `src/app/layout.tsx` for different fonts
- Animations: Modify components for custom animations

#### Content
- Add your project images to `public/` directory
- Update social media links in components
- Customize the resume link in the navbar

## 📊 API Endpoints

The portfolio includes several API endpoints for real-time data:

- `GET /api/github/stats` - GitHub statistics and activity
- `GET /api/spotify/now-playing` - Currently playing Spotify track
- `GET /api/leetcode/stats` - LeetCode problem-solving statistics
- `GET /api/medium/posts` - Latest Medium blog posts

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Add build command `npm run build` and publish directory `out`
- **AWS Amplify**: Connect GitHub repository and configure build settings
- **Docker**: Use the included Dockerfile for containerized deployment

## 🔄 Data Updates

The portfolio automatically updates data at different intervals:
- **GitHub Stats**: Every 5 minutes
- **Spotify**: Every 30 seconds
- **LeetCode**: Every hour
- **Medium Posts**: Every hour

## 🎨 Customization Guide

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to the main page in `src/app/page.tsx`
3. Update navigation in `src/components/Navbar.tsx`

### Adding New APIs
1. Create API route in `src/app/api/`
2. Add TypeScript types in `src/types/`
3. Create component to display data
4. Use SWR for data fetching

### Styling Changes
- Use Tailwind classes for quick styling
- Add custom CSS in `src/app/globals.css`
- Modify `tailwind.config.js` for theme changes

## 📱 Mobile Optimization

The portfolio is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and loading
- Reduced animations on mobile for performance

## 🔍 SEO Features

- Dynamic meta tags and Open Graph data
- Structured data for better search results
- Optimized images with alt text
- Semantic HTML structure
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from [Brittany Chiang](https://brittanychiang.com)
- Icons from [Lucide React](https://lucide.dev)
- Animations powered by [Framer Motion](https://framer.com/motion)
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

If you have any questions or need help setting up the portfolio:

- 📧 Email: subrajitpandey@example.com
- 💼 LinkedIn: [Subrajit Pandey](https://www.linkedin.com/in/subrajit-pandey-6a7950201)
- 🐙 GitHub: [@subrajitpandey](https://github.com/subrajitpandey)

---

⭐ Star this repository if you found it helpful!