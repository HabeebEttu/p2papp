import React from "react";
import { FaGoogle, FaGraduationCap, FaMicrosoft } from "react-icons/fa";
import RegistrationForm from "../components/RegistrationForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="p-8 bg-white border-0 shadow-2xl text-card-foreground rounded-2xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <FaGraduationCap className="text-2xl text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">P2PLearn</h1>
            <p className="text-gray-600">Professional Learning Platform</p>
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Create Your Account
              </h2>
              <p className="text-sm text-gray-600">
                Join thousands of learners worldwide
              </p>
            </div>

            <RegistrationForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 py-2 h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
                <FaGoogle className="mr-2 text-red-500" />
                Google
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 py-2 h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
                <FaMicrosoft className="mr-2 text-blue-500" />
                Microsoft
              </button>
            </div>
            <div className="pt-4 text-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 text-blue-600 hover:text-blue-800 bg-transparent hover:bg-blue-50 !rounded-button whitespace-nowrap cursor-pointer font-medium">
                <Link to={'/login'}>Already have an account? Sign In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
