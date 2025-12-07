import React from 'react'
import { FaRocket } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="relative p-8 overflow-hidden bg-white border shadow rounded-xl text-card-foreground">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Welcome back, Alex Johnson!
            </h2>
            <p className="text-lg text-gray-600">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
            <FaRocket className='text-2xl text-white'/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="mb-1 text-3xl font-bold text-blue-600">2,450</div>
            <div className="text-sm text-gray-500">Total XP</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-3xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-500">Articles Read</div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-3xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-500">Quizzes Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
