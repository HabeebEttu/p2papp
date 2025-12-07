import React from "react";
import { FaGraduationCap} from "react-icons/fa"
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="p-8 bg-white border-0 shadow-2xl text-card-foreground rounded-2xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <FaGraduationCap className="text-4xl text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">P2PLearn</h1>
            <p className="text-gray-600">Professional Learning Platform</p>
          </div>
         <LoginForm/>
        </div>
      </div>
    </div>
  );
}
