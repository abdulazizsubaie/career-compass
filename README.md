# Career Compass - AI Career Guidance for IT Graduates in Riyadh

Career Compass is an AI-powered career guidance platform designed specifically for IT graduates from universities in Riyadh, helping them choose the best career pathway through personalized recommendations.

## Features

- **User Authentication**: Secure login and signup system
- **AI-Powered Career Assessment**: Personalized career recommendations based on skills, interests, and goals
- **Job Market Insights**: Data on trending jobs in Riyadh, including salary insights and demand trends
- **Learning Pathways**: Customized learning roadmaps and course recommendations
- **Mentorship & Community**: Connect with professionals in your chosen field
- **Resume & Portfolio Builder**: AI-assisted tools to build your professional profile

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase account
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/career-compass.git
   cd career-compass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Vercel

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy your application

## Project Structure

- `/src/app`: Application pages and API routes
- `/src/components`: Reusable UI components
- `/src/lib`: Utilities, hooks, and Firebase configuration
- `/src/lib/firebase`: Firebase configuration and utilities
- `/src/lib/contexts`: Context providers for state management
- `/src/lib/hooks`: Custom React hooks

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling the user interface
- **Firebase**: Authentication, database, and storage
- **OpenAI API**: For AI-powered career recommendations
- **Vercel**: For deployment and hosting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.