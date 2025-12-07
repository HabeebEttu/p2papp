import React from "react";

export default function TopLearners() {
  return (
    <div className="p-6 border shadow rounded-xl bg-card text-card-foreground">
      <h3 className="mb-4 text-lg font-bold text-gray-800">Top Learners</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-yellow-500 rounded-full">
            1
          </div>
          <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20confident%20expression%20against%20clean%20background%20modern%20photography%20style&amp;width=50&amp;height=50&amp;seq=leader1&amp;orientation=squarish"
              alt="Leader"
              className="object-cover w-full h-full"
            />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Emma Wilson</p>
            <p className="text-xs text-gray-500">3,450 XP</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-400 rounded-full">
            2
          </div>
          <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20confident%20expression%20against%20clean%20background%20modern%20photography%20style&amp;width=50&amp;height=50&amp;seq=leader2&amp;orientation=squarish"
              alt="Leader"
              className="object-cover w-full h-full"
            />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Emma Wilson</p>
            <p className="text-xs text-gray-500">3,450 XP</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 rounded-full">
            3
          </div>
          <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20confident%20expression%20against%20clean%20background%20modern%20photography%20style&amp;width=50&amp;height=50&amp;seq=leader3&amp;orientation=squarish"
              alt="Leader"
              className="object-cover w-full h-full"
            />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Emma Wilson</p>
            <p className="text-xs text-gray-500">3,450 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
