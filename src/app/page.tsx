'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Home() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Career Compass
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Hello, {user.email}
            </h2>
            <p className="text-gray-600">
              Your AI-powered career guidance journey starts here. Let's begin by understanding
              your skills and interests.
            </p>
            {/* We'll add the assessment button and other features here */}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Career Compass
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your AI-powered career guidance platform for IT graduates in Riyadh
        </p>
      </div>

      <AuthForm mode={authMode} />

      <p className="mt-4 text-gray-600">
        {authMode === 'login' ? (
          <>
            New to Career Compass?{' '}
            <button
              onClick={() => setAuthMode('signup')}
              className="text-blue-600 hover:underline"
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setAuthMode('login')}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
