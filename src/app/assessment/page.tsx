'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/Button';

type CareerPath = {
  title: string;
  skills: string[];
  marketInsights: string[];
  learningResources: string[];
  targetCompanies: string[];
};

type AssessmentResult = {
  careerPaths: CareerPath[];
};

const questions = [
  {
    id: 1,
    question: "What aspects of technology interest you the most?",
    options: [
      "Building and designing user interfaces",
      "Working with data and algorithms",
      "Securing systems and networks",
      "Creating mobile applications",
    ],
  },
  {
    id: 2,
    question: "How do you prefer to solve problems?",
    options: [
      "Through visual and creative solutions",
      "By analyzing data and patterns",
      "By following structured methodologies",
      "Through hands-on experimentation",
    ],
  },
  {
    id: 3,
    question: "What type of work environment do you prefer?",
    options: [
      "Collaborative and team-based",
      "Independent and focused",
      "Fast-paced and dynamic",
      "Structured and organized",
    ],
  },
  // Add more questions as needed
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze assessment');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Career Assessment Results</h1>
              
              <div className="grid gap-6">
                {result.careerPaths.map((path, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                      {index + 1}. {path.title}
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Key Skills to Develop</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {path.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Market Insights</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {path.marketInsights.map((insight, i) => (
                            <li key={i}>{insight}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Learning Resources</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {path.learningResources.map((resource, i) => (
                            <li key={i}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Target Companies</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {path.targetCompanies.map((company, i) => (
                            <li key={i}>{company}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button onClick={() => {
                  setResult(null);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}>
                  Retake Assessment
                </Button>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Career Assessment</h2>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 ${
                        answers[questions[currentQuestion].id] === option
                          ? 'bg-blue-50 border-blue-500'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {currentQuestion === questions.length - 1 && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Analyzing Responses...' : 'Submit Assessment'}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 