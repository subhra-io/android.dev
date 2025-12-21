# Environment Variables Setup Guide

## 🔐 Setting up API Keys Securely

### For Local Development:

1. **Create `.env.local` file** (this file is already in .gitignore):
```bash
cp .env.local.example .env.local
```

2. **Add your OpenAI API key** to `.env.local`:
```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### For Vercel Deployment:

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables:**

| Name | Value |
|------|-------|
| `OPENAI_API_KEY` | `your_actual_openai_api_key_here` |

4. **Redeploy your project** after adding the environment variable

## 🚀 Quick Setup Commands:

### Local Development:
```bash
# Create environment file (replace with your actual key)
echo "OPENAI_API_KEY=your_actual_openai_api_key_here" > .env.local

# Test the setup
npm run dev
```

### Vercel CLI Deployment:
```bash
# Set environment variable via CLI
npx vercel env add OPENAI_API_KEY

# When prompted, paste your actual API key

# Deploy
npx vercel --prod
```

## ✨ What This Enables:

With the OpenAI API key configured, your portfolio will have:

### 🤖 AI-Powered Features:
- **Intelligent Learning Suggestions**: Personalized study recommendations
- **Progress Analysis**: AI-driven insights on learning patterns
- **Lipu Assistant**: AI girlfriend for motivation and support
- **Smart Analytics**: Contextual learning advice

### 🔒 Security Features:
- **Environment Variables**: Keys never stored in code
- **Gitignore Protection**: `.env.local` excluded from version control
- **Production Security**: Separate keys for development and production

## 🛠 Optional Additional APIs:

You can also add these for enhanced features:

```bash
# GitHub API (for enhanced stats)
GITHUB_TOKEN=your_github_personal_access_token

# Spotify API (for music integration)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Medium API (for blog posts)
NEXT_PUBLIC_MEDIUM_USERNAME=@your_medium_username
```

## 🚨 Security Best Practices:

1. **Never commit API keys** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** for security
4. **Monitor API usage** to detect unauthorized access
5. **Use environment variables** for all sensitive data

---

**Your portfolio will now have full AI capabilities enabled!** 🎉

## 📝 Note:
Replace `your_actual_openai_api_key_here` with the actual API key that starts with `sk-proj-...`