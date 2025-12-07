import React, { useState } from "react";
import {
  FaBook,
  FaBrain,
  FaEdit,
  FaEye,
  FaFire,
  FaGlobe,
  FaGraduationCap,
  FaHeart,
  FaMapMarkerAlt,
  FaMedal,
  FaSave,
  FaShare,
  FaStar,
  FaTimes,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

export default function ProfilePage() {
  const [currentTab, setCurrentTab] = useState("articles");
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow rounded-xl text-card-foreground">
          {isProfileEditing ? (
            <ProfileEditForm/>
          ) : (
            <div className="flex items-start space-x-8">
              <span className="relative flex w-32 h-32 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20with%20friendly%20confident%20smile%20against%20clean%20white%20background%20modern%20portrait%20photography%20style%20high%20quality&width=200&height=200&seq=profilemain&orientation=squarish"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </span>
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">
                  Alex Johnson
                </h1>
                <p className="mb-2 text-gray-600">
                  Full Stack Developer &amp; Learning Enthusiast
                </p>
                <p className="flex items-center mb-2 text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2" />
                  San Francisco, CA
                </p>
                <p className="flex items-center mb-4 text-sm text-gray-500">
                  <FaGlobe className="mr-2" />
                  https://alexjohnson.dev
                </p>
                <div className="flex items-center mb-6 space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      2450
                    </div>
                    <div className="text-sm text-gray-500">Total XP</div>
                  </div>
                </div>
                <div className="flex items-center mb-6 space-x-4">
                  <div className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white transition-colors border border-transparent rounded-md shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary hover:bg-primary/80 bg-gradient-to-r from-blue-600 to-purple-600">
                    <FaMedal className="mr-2" />
                    Advanced Learner
                  </div>
                  <div className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white transition-colors bg-yellow-500 border border-transparent rounded-md shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80">
                    <FaTrophy className="mr-2" />
                    Top 10%
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap" onClick={()=>setIsProfileEditing(true)}>
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 hover:bg-gray-300 whitespace-nowrap">
                    <FaShare className="mr-2" />
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <div dir="ltr" data-orientation="horizontal" className="w-full">
              <div
                role="tablist"
                aria-orientation="horizontal"
                className="grid items-center justify-center w-full grid-cols-3 p-1 rounded-lg h-9 bg-muted text-muted-foreground"
                tabIndex="0"
                data-orientation="horizontal"
                style={{ outline: "none" }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentTab === "articles"}
                  aria-controls="radix-:r0:-content-articles"
                  data-state={currentTab === "articles" ? "active" : "inactive"}
                  id="radix-:r0:-trigger-articles"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                  tabIndex="0"
                  data-orientation="horizontal"
                  data-radix-collection-item=""
                  onClick={() => setCurrentTab("articles")}
                >
                  My Articles
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentTab === "achievements"}
                  aria-controls="radix-:r0:-content-achievements"
                  data-state={
                    currentTab === "achievements" ? "active" : "inactive"
                  }
                  id="radix-:r0:-trigger-achievements"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                  tabIndex="-1"
                  data-orientation="horizontal"
                  data-radix-collection-item=""
                  onClick={() => setCurrentTab("achievements")}
                >
                  Achievements
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={currentTab === "activity"}
                  aria-controls="radix-:r0:-content-activity"
                  data-state={currentTab === "activity" ? "active" : "inactive"}
                  id="radix-:r0:-trigger-activity"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                  tabIndex="-1"
                  data-orientation="horizontal"
                  data-radix-collection-item=""
                  onClick={() => setCurrentTab("activity")}
                >
                  Activity
                </button>
              </div>
              {currentTab === "articles" && <MyArticles />}
              {currentTab === "achievements" && <MyAchievements />}
              {currentTab === "activity" && <MyActivity />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyArticles() {
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r0:-trigger-articles"
      id="radix-:r0:-content-articles"
      tabIndex="0"
      className="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-4 border shadow cursor-pointer rounded-xl bg-card text-card-foreground hover:shadow-md">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20technology%20article%20illustration%20with%20coding%20elements%20and%20digital%20graphics%20on%20clean%20background%20professional%20design%20style&width=300&height=200&seq=myarticle1&orientation=landscape"
            alt="Article"
            className="object-cover w-full h-40 mb-4 rounded"
          />
          <h3 className="mb-2 font-semibold text-gray-800">
            Building Scalable React Applications
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            A comprehensive guide to building large-scale React applications
            with best practices...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <FaEye className="mr-2" />
              1,234 views
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-2" />
              89 likes
            </span>
          </div>
        </div>
        <div className="p-4 border shadow cursor-pointer rounded-xl bg-card text-card-foreground hover:shadow-md">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20technology%20article%20illustration%20with%20coding%20elements%20and%20digital%20graphics%20on%20clean%20background%20professional%20design%20style&width=300&height=200&seq=myarticle2&orientation=landscape"
            alt="Article"
            className="object-cover w-full h-40 mb-4 rounded"
          />
          <h3 className="mb-2 font-semibold text-gray-800">
            Understanding TypeScript Generics
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            Deep dive into TypeScript generics and how to use them effectively
            in your projects...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <FaEye className="mr-2" />
              987 views
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-2" />
              67 likes
            </span>
          </div>
        </div>
        <div className="p-4 border shadow cursor-pointer rounded-xl bg-card text-card-foreground hover:shadow-md">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20technology%20article%20illustration%20with%20coding%20elements%20and%20digital%20graphics%20on%20clean%20background%20professional%20design%20style&width=300&height=200&seq=myarticle3&orientation=landscape"
            alt="Article"
            className="object-cover w-full h-40 mb-4 rounded"
          />
          <h3 className="mb-2 font-semibold text-gray-800">
            Modern CSS Techniques
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            Explore modern CSS features like Grid, Flexbox, and custom
            properties...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <FaEye className="mr-2" />
              2,156 views
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-2" />
              142 likes
            </span>
          </div>
        </div>
        <div className="p-4 border shadow cursor-pointer rounded-xl bg-card text-card-foreground hover:shadow-md">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20technology%20article%20illustration%20with%20coding%20elements%20and%20digital%20graphics%20on%20clean%20background%20professional%20design%20style&width=300&height=200&seq=myarticle4&orientation=landscape"
            alt="Article"
            className="object-cover w-full h-40 mb-4 rounded"
          />
          <h3 className="mb-2 font-semibold text-gray-800">
            API Design Best Practices
          </h3>
          <p className="mb-3 text-sm text-gray-600">
            Learn how to design clean, maintainable APIs that scale with your
            application...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <FaEye className="mr-2" />
              1,543 views
            </span>
            <span className="flex items-center">
              <FaHeart className="mr-2" />
              98 likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyAchievements() {
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r0:-trigger-achievements"
      id="radix-:r0:-content-achievements"
      tabIndex="0"
      className="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-blue-100 to-blue-50">
          <div className="flex justify-center">
            <FaBook className="mb-3 text-3xl text-blue-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">Article Master</h3>
          <p className="text-sm text-gray-600">Published 10+ articles</p>
        </div>
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-purple-100 to-purple-50">
          <div className="flex justify-center">
            <FaBrain className="mb-3 text-3xl text-purple-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">Quiz Champion</h3>
          <p className="text-sm text-gray-600">Completed 50+ quizzes</p>
        </div>
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-green-100 to-green-50">
          <div className="flex justify-center">
            <FaUsers className="mb-3 text-3xl text-green-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">
            Community Builder
          </h3>
          <p className="text-sm text-gray-600">100+ followers</p>
        </div>
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-orange-100 to-orange-50">
          <div className="flex justify-center">
            <FaFire className="mb-3 text-3xl text-orange-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">Learning Streak</h3>
          <p className="text-sm text-gray-600">30 days active</p>
        </div>
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-yellow-100 to-yellow-50">
          <div className="flex justify-center">
            <FaStar className="mb-3 text-3xl text-yellow-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">Top Contributor</h3>
          <p className="text-sm text-gray-600">Top 5% this month</p>
        </div>
        <div className="p-4 text-center border shadow rounded-xl bg-card text-card-foreground bg-gradient-to-br from-indigo-100 to-indigo-50">
          <div className="flex justify-center">
            <FaGraduationCap className="mb-3 text-3xl text-indigo-600" />
          </div>
          <h3 className="mb-1 font-semibold text-gray-800">Knowledge Seeker</h3>
          <p className="text-sm text-gray-600">1000+ XP earned</p>
        </div>
      </div>
    </div>
  );
}

function MyActivity() {
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r0:-trigger-activity"
      id="radix-:r0:-content-activity"
      tabIndex="0"
      className="mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="space-y-4">
        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FaHeart className="text-xl text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">You</span> liked the article{" "}
                <span className="font-semibold">
                  "Building Scalable React Applications"
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FaBook className="text-xl text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">You</span> published a new
                article{" "}
                <span className="font-semibold">
                  "API Design Best Practices"
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FaTrophy className="text-xl text-yellow-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">You</span> earned the{" "}
                <span className="font-semibold">"Top Contributor"</span>{" "}
                achievement
              </p>
              <p className="mt-1 text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FaUsers className="text-xl text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">5 new followers</span> started
                following you
              </p>
              <p className="mt-1 text-xs text-gray-500">5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfileEditForm() {
  return (
    <div className="flex items-start p-8 space-x-8">
      <span className="relative flex w-32 h-32 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
        <img
          src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20with%20friendly%20confident%20smile%20against%20clean%20white%20background%20modern%20portrait%20photography%20style%20high%20quality&width=200&height=200&seq=profilemain&orientation=squarish"
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </span>

      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <input
            className="flex w-full px-3 py-2 text-base font-bold transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Full Name"
            defaultValue="Alex Johnson"
          />
          <input
            className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Bio"
            defaultValue="Full Stack Developer & Learning Enthusiast"
          />
          <input
            className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Location"
            defaultValue="San Francisco, CA"
          />
          <input
            className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Website"
            defaultValue="https://alexjohnson.dev"
          />
        </div>

        <div className="flex items-center justify-around border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">2450</div>
            <div className="text-sm text-gray-500">Total XP</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white transition-colors border border-transparent rounded-md shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <FaMedal className="mr-2" />
            Advanced Learner
          </div>
          <div className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white transition-colors bg-yellow-500 border border-transparent rounded-md shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-yellow-600">
            <FaTrophy className="mr-2" />
            Top 10%
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="inline-flex items-center justify-center h-10 gap-2 px-6 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 whitespace-nowrap">
            <FaSave className="" />
            <span>Save Changes</span>
          </button>
          <button className="inline-flex items-center justify-center h-10 gap-2 px-6 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-300 whitespace-nowrap">
            <FaTimes/>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

