# Luca Lo Bosco - Portfolio

Portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design using Tailwind CSS
- Next.js App Router for efficient page routing
- TypeScript for type safety and better developer experience
- Shadcn UI components library for consistent design
- Dark mode support with theme provider
- Interactive voice assistant with speech recognition and text-to-speech
- Contact form with email integration
- SEO optimized

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Email**: Resend
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/luca-portfolio.git
   cd luca-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Add your environment variables to `.env.local`

5. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. Connect your GitHub repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Create a new project and import your GitHub repository
   - Configure the project settings (Next.js should be auto-detected)

3. Add environment variables:
   - In your Vercel project settings, go to the "Environment Variables" tab
   - Add the following variables:
     - `RESEND_API_KEY`: Your Resend API key
     - `EMAIL_FROM`: The email to send from (e.g., `Portfolio Contact <hello@hello.lucalobos.co>`)
     - `EMAIL_TO`: The email to send to (your personal or business email)

4. Deploy the project:
   - Vercel will automatically deploy your project when you push to the main branch
   - You can also manually trigger deployments from the Vercel dashboard

## Email Setup

This project uses [Resend](https://resend.com) for sending emails from the contact form.

1. Create a free account at [Resend](https://resend.com)
2. Get your API key from the Resend dashboard
3. Verify your domain in Resend (required for sending emails)
4. Add your API key and email addresses to the environment variables

## License

MIT

## Author

Luca Lo Bosco

## Mobile Testing

To test the site on mobile devices while developing:

1. Run the development server with:
```bash
pnpm dev
```

2. Find your local IP address in the console output
3. On your mobile device (connected to the same network), visit:
```
http://YOUR_LOCAL_IP:3000
```

## Acknowledgments

- Design inspiration from various sources
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations with [Framer Motion](https://www.framer.com/motion/) 