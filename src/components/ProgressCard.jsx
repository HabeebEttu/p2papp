import React from 'react'
import { useSelector } from "react-redux";

export default function ProgressCard() {
  const { user } = useSelector((state) => state.auth);

  // Calculate progress percentage
  const maxXP = 3000;
  const currentXP = user?.profile?.xp || 0;
  const progressPercentage = (currentXP / maxXP) * 100;
  const xpRemaining = maxXP - currentXP;

  return (
    <div className="p-6 border shadow rounded-xl bg-card text-card-foreground">
      <h3 className="mb-4 text-lg font-bold text-gray-800">Your Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Current XP
            </span>
            <span className="text-sm text-gray-600">
              {currentXP} / {maxXP}
            </span>
          </div>
          <div
            aria-valuemax="100"
            aria-valuemin="0"
            role="progressbar"
            data-state="indeterminate"
            data-max="100"
            className="relative w-full h-2 overflow-hidden rounded-full bg-primary/20"
          >
            <div
              className="flex-1 w-full h-full transition-all bg-primary"
              style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
            ></div>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {xpRemaining} XP to next rank
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {user?.profile?.articlesRead || 0}
            </div>
            <div className="text-xs text-gray-500">Articles Read</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {user?.profile?.quizzesCompleted || 0}
            </div>
            <div className="text-xs text-gray-500">Quizzes Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
