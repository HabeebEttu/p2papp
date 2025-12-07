import React, { useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaCog,
  FaGraduationCap,
  FaMoon,
  FaQuestionCircle,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
// import {} from "react-icons/fa"

export default function Navbar() {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">P2PLearn</h1>
            </div>
            {/* <div className="hidden space-x-1 md:flex">
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow hover:bg-primary/90 h-9 px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="mr-2 fas fa-home"></i>Dashboard
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow h-9 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="mr-2 fas fa-newspaper"></i>Articles
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow h-9 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="mr-2 fas fa-brain"></i>Quizzes
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow h-9 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="mr-2 fas fa-trophy"></i>Leaderboard
              </button>
            </div> */}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                className="flex h-10 px-3 py-1 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-colors border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-72 bg-gray-50"
                placeholder="Search courses, articles..."
              />
              <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none bg-primary shadow px-2 py-1 w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
              <FaMoon size={20} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none  bg-primary shadow px-2 py-1 w-10 h-10 relative text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
              <FaBell size={20} />
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </button>
            <div
              className="relative"
              role="button"
              autoFocus="true"
              onClick={() => setProfileIsOpen(!profileIsOpen)}
              
            >
              <div
                id="profile-dropdown-trigger"
                className="flex items-center p-2 space-x-3 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {profileIsOpen ? (
                  <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                    <div className="py-2">
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaUser className="w-5 mr-3 text-center text-blue-600" />
                        <span className="font-medium">View Profile</span>
                      </div>
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaCog className="w-5 mr-3 text-center text-gray-600" />
                        <span className="font-medium">Account Settings</span>
                      </div>
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaShieldAlt className="w-5 mr-3 text-center text-purple-600" />
                        <span className="font-medium">Privacy Settings</span>
                      </div>
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaQuestionCircle className="w-5 mr-3 text-center text-green-600" />
                        <span className="font-medium">Help &amp; Support</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex items-center px-4 py-3 text-red-600 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaSignOutAlt className="w-5 mr-3 text-center text-red-600" />
                        <span className="font-medium">Sign Out</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20with%20friendly%20smile%20against%20clean%20white%20background%20modern%20portrait%20photography%20style&amp;width=100&amp;height=100&amp;seq=avatar1&amp;orientation=squarish"
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </span>
                <span className="hidden font-medium text-gray-900 sm:block">
                 
                </span>
                <FaChevronDown className="text-sm text-gray-500 transition-transform " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
