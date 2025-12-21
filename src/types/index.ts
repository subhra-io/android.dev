// GitHub API Types
export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  commitsThisWeek: number;
  commitsToday: number;
  languages: { [key: string]: number };
}

// Medium API Types
export interface MediumPost {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  published_at: string;
  reading_time: number;
  claps: number;
  responses: number;
  thumbnail?: string;
  tags: string[];
}

// Spotify API Types
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    name: string;
    external_urls: {
      spotify: string;
    };
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number;
  timestamp: number;
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
  total: number;
}

// LeetCode Types
export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: { [date: string]: number };
}

export interface LeetCodeSubmission {
  id: string;
  title: string;
  titleSlug: string;
  status: string;
  lang: string;
  langName: string;
  runtime: string;
  timestamp: string;
  url: string;
  isPending: boolean;
  memory: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  companyUrl?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
}

// Skill Types
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon?: string;
}

// Contact Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Animation Types
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
    };
  };
}

// Social Links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// Blog/Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  readingTime: number;
  slug: string;
  featured: boolean;
  imageUrl?: string;
}

// Stats Types
export interface DashboardStats {
  github: GitHubStats;
  leetcode: LeetCodeStats;
  medium: {
    totalPosts: number;
    totalViews: number;
    totalClaps: number;
    followers: number;
  };
  spotify: {
    totalTracks: number;
    topGenres: string[];
    listeningTime: number;
  };
}
// Learning Journal Types
export interface LearningJournalEntry {
  id: string
  date: string
  todaysFocus: string
  keyLearnings: string[]
  tomorrowsPlan: string
  mood: 'excited' | 'motivated' | 'tired' | 'accomplished' | 'challenged'
  difficultyLevel: 1 | 2 | 3 | 4 | 5
  notes: string
  timestamp: string
}

export interface DailyGoal {
  id: string
  title: string
  category: 'system-design' | 'dsa' | 'reading' | 'coding'
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  estimatedTime: number
  description?: string
}

export interface LearningStats {
  articlesReadToday: number
  articlesReadThisWeek: number
  dsaProblemsToday: number
  dsaProblemsThisWeek: number
  systemDesignTopicsToday: number
  systemDesignTopicsThisWeek: number
  studyStreakDays: number
  totalStudyHours: number
  weeklyProgress: {
    day: string
    articles: number
    dsaProblems: number
    systemDesign: number
    studyHours: number
  }[]
}

export interface LipuMessage {
  id: string
  message: string
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion'
  timestamp: Date
  emoji: string
}
// Achievement Types
export interface Achievement {
  type: 'app' | 'award' | 'certification' | 'recognition'
  title: string
  description: string
  // App-specific fields
  playStoreUrl?: string
  appStoreUrl?: string
  downloads?: string
  rating?: number
  icon?: string
  // Award-specific fields
  event?: string
  date?: string
  certificate?: string
  organization?: string
}