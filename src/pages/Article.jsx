import React from "react";
import { FaArrowLeft, FaBookmark, FaCalendar, FaCheck, FaClock, FaEye, FaHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Article() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 mb-6 bg-gray-200 text-gray-700 hover:bg-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
          <FaArrowLeft className="mr-2 " />
          <Link to={"/"}> Back to Home</Link>
        </button>
        <div className="p-8 bg-white border shadow rounded-xl text-card-foreground">
          <div className="mb-6">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Building Scalable React Applications
            </h1>
            <div className="flex items-center mb-4 space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20confident%20woman%20with%20friendly%20smile%20against%20clean%20white%20background%20modern%20photography%20style&amp;width=50&amp;height=50&amp;seq=author1&amp;orientation=squarish"
                    alt="Author"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="font-medium">Sarah Chen</span>
              </div>
              <span className="flex items-center">
                <FaCalendar className="mr-1" />
                2024-01-15
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" />8 min read
              </span>
              <span className="flex items-center">
                <FaEye className="mr-1" />
                1567 views
              </span>
            </div>
            <div className="flex items-center mb-6 space-x-4">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800">
                React
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800">
                JavaScript
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800">
                Architecture
              </div>
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800">
                Performance
              </div>
            </div>
            <div className="flex items-center justify-between p-4 mb-6 text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center space-x-4">
                <i className="text-xl text-yellow-300 fas fa-star"></i>
                <span className="font-semibold">
                  Complete this article to earn 50 XP
                </span>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 bg-white/20 hover:bg-white/30 text-white !rounded-button whitespace-nowrap cursor-pointer">
                <FaBookmark className="mr-2" />
                Bookmark
              </button>
            </div>
          </div>
          <div className="mb-8 prose max-w-none">
            <div className="leading-relaxed text-gray-700">
              <h1 className="mt-6 mb-4 text-2xl font-bold text-gray-800">
                Building Scalable React Applications
              </h1>
              <p className="mb-4">
                React has become one of the most popular JavaScript libraries
                for building user interfaces. As applications grow in complexity
                and size, maintaining scalability becomes crucial for long-term
                success.
              </p>
              <h2 className="mt-5 mb-3 text-xl font-bold text-gray-800">
                Key Principles for Scalable React Apps
              </h2>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
                1. Component Architecture
              </h3>
              <p className="mb-4">
                A well-structured component hierarchy is the foundation of any
                scalable React application. Focus on creating reusable,
                single-responsibility components that can be easily tested and
                maintained.
              </p>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
                2. State Management
              </h3>
              <p className="mb-4">
                Choose the right state management solution based on your
                application's complexity:
              </p>
              <li className="mb-2 ml-6">
                **Local State**: Use useState for simple component-level state
              </li>
              <li className="mb-2 ml-6">
                **Context API**: Perfect for medium-sized applications with
                shared state
              </li>
              <li className="mb-2 ml-6">
                **Redux/Zustand**: Ideal for complex applications with intricate
                state logic
              </li>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
                3. Performance Optimization
              </h3>
              <p className="mb-4">Implement performance best practices:</p>
              <li className="mb-2 ml-6">
                Use React.memo for component memoization
              </li>
              <li className="mb-2 ml-6">
                Implement code splitting with lazy loading
              </li>
              <li className="mb-2 ml-6">
                Optimize bundle sizes with tree shaking
              </li>
              <li className="mb-2 ml-6">
                Use virtual scrolling for large lists
              </li>
              <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-800">
                4. Testing Strategy
              </h3>
              <p className="mb-4">Comprehensive testing ensures reliability:</p>
              <li className="mb-2 ml-6">
                Unit tests for individual components
              </li>
              <li className="mb-2 ml-6">
                Integration tests for component interactions
              </li>
              <li className="mb-2 ml-6">
                End-to-end tests for critical user flows
              </li>
              <h2 className="mt-5 mb-3 text-xl font-bold text-gray-800">
                Best Practices
              </h2>
              <p className="mb-4">
                1. **File Organization**: Structure your project with clear
                separation of concerns
              </p>
              <p className="mb-4">
                2. **TypeScript**: Use TypeScript for better developer
                experience and fewer bugs
              </p>
              <p className="mb-4">
                3. **ESLint &amp; Prettier**: Maintain consistent code quality
              </p>
              <p className="mb-4">
                4. **Error Boundaries**: Gracefully handle component errors
              </p>
              <p className="mb-4">
                5. **Accessibility**: Ensure your app is accessible to all users
              </p>
              <h2 className="mt-5 mb-3 text-xl font-bold text-gray-800">
                Conclusion
              </h2>
              <p className="mb-4">
                Building scalable React applications requires careful planning,
                adherence to best practices, and continuous refactoring. By
                following these principles, you'll create maintainable and
                robust applications that can grow with your needs.
              </p>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white !rounded-button whitespace-nowrap cursor-pointer">
                  <FaHeart className="mr-2" />
                  234 Likes
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                <FaCheck className="mr-2" />
                Mark as Complete (+50 XP)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
