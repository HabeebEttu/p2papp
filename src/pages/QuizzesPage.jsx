import React from "react";
import {
  FaSearch,
  FaQuestionCircle,
  FaClock,
  FaTag,
  FaPlay,
  FaUsers,
  FaStar,
} from "react-icons/fa";

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        {/* title */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Knowledge Quizzes
          </h1>
          <p className="text-gray-600">Test your skills and earn XP points</p>
        </div>
        {/* searchbar */}
        <div className="p-6 mb-8 bg-white border shadow rounded-xl text-card-foreground">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap">
                All Categories
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 hover:bg-gray-300 whitespace-nowrap">
                Programming
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 hover:bg-gray-300 whitespace-nowrap">
                React
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 hover:bg-gray-300 whitespace-nowrap">
                CSS
              </button>
            </div>
            <div className="relative">
              <input
                className="flex w-64 px-3 py-1 pr-10 text-sm transition-colors bg-white border border-gray-300 rounded-md shadow-sm h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="Search quizzes..."
              />
              <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 transition-shadow bg-white border shadow rounded-xl text-card-foreground hover:shadow-lg">
            <div className="mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20educational%20quiz%20illustration%20with%20question%20marks%20and%20learning%20symbols%20on%20clean%20gradient%20background%20minimalist%20design%20style&width=300&height=200&seq=quiz1&orientation=landscape"
                alt="Quiz illustration"
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-green-100 text-green-800">
                  Beginner
                </div>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-purple-600 text-white">
                  +100 XP
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                JavaScript Fundamentals
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Test your knowledge of JavaScript basics and core concepts
              </p>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-1" />
                10 Questions
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" />
                15 min
              </span>
              <span className="flex items-center">
                <FaTag className="mr-1" />
                Programming
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex w-6 h-6 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20friendly%20expression%20against%20clean%20background%20modern%20photography%20style&width=40&height=40&seq=quizauthor1&orientation=squarish"
                    alt="Author"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="text-sm text-gray-600">Sarah Chen</span>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap">
                <FaPlay className="mr-1" />
                Start
              </button>
            </div>
          </div>
          <div className="p-6 transition-shadow bg-white border shadow rounded-xl text-card-foreground hover:shadow-lg">
            <div className="mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20educational%20quiz%20illustration%20with%20question%20marks%20and%20learning%20symbols%20on%20clean%20gradient%20background%20minimalist%20design%20style&width=300&height=200&seq=quiz2&orientation=landscape"
                alt="Quiz illustration"
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-red-100 text-red-800">
                  Advanced
                </div>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-purple-600 text-white">
                  +200 XP
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                React Hooks Deep Dive
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Advanced concepts and patterns using React Hooks
              </p>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-1" />
                15 Questions
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" />
                25 min
              </span>
              <span className="flex items-center">
                <FaTag className="mr-1" />
                React
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex w-6 h-6 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20friendly%20expression%20against%20clean%20background%20modern%20photography%20style&width=40&height=40&seq=quizauthor2&orientation=squarish"
                    alt="Author"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="text-sm text-gray-600">Mike Johnson</span>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap">
                <FaPlay className="mr-1" />
                Start
              </button>
            </div>
          </div>
          <div className="p-6 transition-shadow bg-white border shadow rounded-xl text-card-foreground hover:shadow-lg">
            <div className="mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20educational%20quiz%20illustration%20with%20question%20marks%20and%20learning%20symbols%20on%20clean%20gradient%20background%20minimalist%20design%20style&width=300&height=200&seq=quiz3&orientation=landscape"
                alt="Quiz illustration"
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-yellow-100 text-yellow-800">
                  Intermediate
                </div>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-purple-600 text-white">
                  +150 XP
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                CSS Grid Layout
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Master modern CSS Grid layout techniques
              </p>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaQuestionCircle className="mr-1" />
                12 Questions
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" />
                20 min
              </span>
              <span className="flex items-center">
                <FaTag className="mr-1" />
                CSS
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex w-6 h-6 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20friendly%20expression%20against%20clean%20background%20modern%20photography%20style&width=40&height=40&seq=quizauthor3&orientation=squarish"
                    alt="Author"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="text-sm text-gray-600">Emma Wilson</span>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap">
                <FaPlay className="mr-1" />
                Start
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Most Popular This Week
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 bg-white border shadow rounded-xl text-card-foreground">
              <div className="flex items-start space-x-4">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20educational%20quiz%20icon%20with%20colorful%20learning%20elements%20on%20clean%20background%20minimalist%20design%20style&width=100&height=100&seq=popular1&orientation=squarish"
                  alt="Quiz icon"
                  className="object-cover w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">
                    JavaScript Fundamentals
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Test your knowledge of JavaScript basics and core concepts
                  </p>
                  <div className="flex items-center mb-3 space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaUsers className="mr-1" />
                      2.3k taken
                    </span>
                    <span className="flex items-center">
                      <FaStar className="mr-1" />
                      4.8 rating
                    </span>
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border shadow rounded-xl text-card-foreground">
              <div className="flex items-start space-x-4">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20educational%20quiz%20icon%20with%20colorful%20learning%20elements%20on%20clean%20background%20minimalist%20design%20style&width=100&height=100&seq=popular2&orientation=squarish"
                  alt="Quiz icon"
                  className="object-cover w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">
                    React Hooks Deep Dive
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Advanced concepts and patterns using React Hooks
                  </p>
                  <div className="flex items-center mb-3 space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaUsers className="mr-1" />
                      2.3k taken
                    </span>
                    <span className="flex items-center">
                      <FaStar className="mr-1" />
                      4.8 rating
                    </span>
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap">
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
