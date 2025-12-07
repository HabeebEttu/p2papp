import React from "react";
import { FaClock, FaStar, FaUser } from "react-icons/fa";

export default function DashboardArticles() {
  return (
    <div className="p-6 border shadow rounded-xl bg-card text-card-foreground">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Latest Articles</h3>
      <div className="space-y-4">
        <div className="flex items-start p-4 space-x-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20educational%20technology%20illustration%20with%20books%20and%20digital%20elements%20on%20clean%20white%20background%20minimalist%20design%20style&amp;width=120&amp;height=80&amp;seq=article1&amp;orientation=landscape"
            alt="Article thumbnail"
            className="object-cover w-20 h-16 rounded"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">
              Advanced React Patterns for Modern Applications
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Learn about compound components, render props, and custom hooks...
            </p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <span className="flex flex-row items-center">
                <FaUser className="mr-1" />
                Sarah Chen
              </span>
              <span className="flex flex-row items-center">
                <FaClock className="mr-1" />5 min read
              </span>
              <span className="flex flex-row items-center">
                <FaStar className="mr-1" />
                +50 XP
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start p-4 space-x-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20educational%20technology%20illustration%20with%20books%20and%20digital%20elements%20on%20clean%20white%20background%20minimalist%20design%20style&amp;width=120&amp;height=80&amp;seq=article2&amp;orientation=landscape"
            alt="Article thumbnail"
            className="object-cover w-20 h-16 rounded"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">
              Advanced React Patterns for Modern Applications
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Learn about compound components, render props, and custom hooks...
            </p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <span className="flex flex-row items-center">
                <FaUser className="mr-1" />
                Sarah Chen
              </span>
              <span className="flex flex-row items-center">
                <FaClock className="mr-1" />5 min read
              </span>
              <span className="flex flex-row items-center">
                <FaStar className="mr-1" />
                +50 XP
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start p-4 space-x-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20educational%20technology%20illustration%20with%20books%20and%20digital%20elements%20on%20clean%20white%20background%20minimalist%20design%20style&amp;width=120&amp;height=80&amp;seq=article3&amp;orientation=landscape"
            alt="Article thumbnail"
            className="object-cover w-20 h-16 rounded"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">
              Advanced React Patterns for Modern Applications
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              Learn about compound components, render props, and custom hooks...
            </p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
              <span className="flex flex-row items-center">
                <FaUser className="mr-1" />
                Sarah Chen
              </span>
              <span className="flex flex-row items-center">
                <FaClock className="mr-1" />5 min read
              </span>
              <span className="flex flex-row items-center">
                <FaStar className="mr-1" />
                +50 XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
