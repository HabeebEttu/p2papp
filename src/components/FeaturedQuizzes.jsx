import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa';

export default function FeaturedQuizzes() {
  return (
    <div className="p-6 border shadow rounded-xl bg-card text-card-foreground">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Featured Quizzes</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-4 rounded-lg cursor-pointer bg-gradient-to-br from-purple-100 to-blue-100 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              JavaScript Fundamentals
            </h4>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-purple-600 text-white">
              +100 XP
            </div>
          </div>
          <p className="mb-3 text-sm text-gray-600">
            Test your knowledge of JavaScript basics and core concepts
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              <FaQuestionCircle className="mr-1" />
              10 Questions
            </span>
            <button className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm !rounded-button whitespace-nowrap cursor-pointer">
              Start Quiz
            </button>
          </div>
        </div>
        <div className="p-4 rounded-lg cursor-pointer bg-gradient-to-br from-purple-100 to-blue-100 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              React Hooks Deep Dive
            </h4>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-purple-600 text-white">
              +200 XP
            </div>
          </div>
          <p className="mb-3 text-sm text-gray-600">
            Advanced concepts and patterns using React Hooks
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              <FaQuestionCircle className="mr-1" />
              15 Questions
            </span>
            <button className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm !rounded-button whitespace-nowrap cursor-pointer">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
