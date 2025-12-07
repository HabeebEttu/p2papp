import React from 'react'
import Dashboard from '../components/Dashboard'
import DashboardArticles from '../components/DashboardArticles'
import FeaturedQuizzes from '../components/FeaturedQuizzes'
import ProgressCard from '../components/ProgressCard'
import TopLearners from '../components/TopLearners'

export default function HomePage() {
  return (<div className="w-full bg-gray-50">
      <div className='min-h-screen px-4 py-8 mx-auto max-w-7xl'>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                  <Dashboard />
                  <DashboardArticles/>
                  <FeaturedQuizzes/>
              </div>
        <div className="space-y-6">
          <ProgressCard />
          <TopLearners/>
              </div>
          </div>
          </div>
    </div>
  )
}
