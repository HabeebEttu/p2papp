import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is admin
  useEffect(() => {
    if (!user || !user.admin) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="overflow-hidden antialiased bg-slate-50 text-slate-900">
        <div className="flex w-full h-screen">
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
          />
          <main className="relative flex flex-col flex-1 h-full overflow-hidden bg-slate-50">
            <Header currentView={currentView} user={user} />
            {currentView === "dashboard" && <DashboardView />}
            {currentView === "users" && <UsersView />}
            {currentView === "articles" && <ArticlesView />}
            {currentView === "quizzes" && <QuizzesView />}
            {currentView === "videos" && <VideosView />}
            {currentView === "reports" && <ReportsView />}
          </main>
        </div>
      </div>
    </>
  );
}

function Sidebar({ currentView, setCurrentView, onLogout }) {
  const menuItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "users", icon: "group", label: "Users" },
    { id: "articles", icon: "article", label: "Articles" },
    { id: "quizzes", icon: "quiz", label: "Quizzes" },
    { id: "videos", icon: "play_circle", label: "Videos" },
    { id: "reports", icon: "bar_chart", label: "Reports" },
  ];

  return (
    <aside className="flex-col hidden h-full bg-white border-r md:flex w-72 border-slate-200">
      <div className="flex flex-col justify-between h-full p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center text-xl font-bold text-blue-600 bg-blue-100 rounded-full aspect-square size-10">
              P2
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-normal text-slate-900">
                P2P Learn Admin
              </h1>
              <p className="text-xs font-normal leading-normal text-slate-500">
                Administrator Panel
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  currentView === item.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={() => setCurrentView(item.id)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full h-10 px-4 overflow-hidden text-sm font-bold transition-colors border rounded-lg cursor-pointer bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
        >
          <span className="truncate">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function Header({ currentView, user }) {
  const viewTitles = {
    dashboard: "Dashboard",
    users: "User Management",
    articles: "Article Management",
    quizzes: "Quiz Management",
    videos: "Video Management",
    reports: "Reports & Analytics",
  };

  return (<>
    <header className="z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0">
      <div className="items-center hidden gap-2 sm:flex">
    <a className="text-sm font-medium text-slate-500 hover:text-slate-900"
          href="/"
        >
          Home
        </a>
        <span className="text-sm font-medium text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-900">
          {viewTitles[currentView]}
        </span>
      </div>
      <button className="md:hidden text-slate-900">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="flex items-center gap-3">
        <button className="relative p-2 transition-colors rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100">
          <span className="material-symbols-outlined text-[24px]">
            notifications
          </span>
          <span className="absolute bg-red-500 rounded-full top-2 right-2 size-2 ring-2 ring-white"></span>
        </button>
        <div className="w-px h-6 mx-1 bg-slate-200"></div>
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <div className="flex items-center justify-center text-sm font-bold text-white bg-blue-600 rounded-full size-8 ring-2 ring-slate-100">
            {user?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <span className="hidden text-sm font-medium sm:block text-slate-900">
            {user?.username || "Admin"}
          </span>
        </button>
      </div>
    </header></>
  );
}

// Dashboard View
function DashboardView() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    totalQuizzes: 0,
    totalVideos: 0,
  });

  const dashboardCards = [
    {
      icon: "group",
      title: "Total Users",
      value: stats.totalUsers,
    },
    {
      icon: "article",
      title: "Total Articles",
      value: stats.totalArticles,
    },
    {
      icon: "quiz",
      title: "Total Quizzes",
      value: stats.totalQuizzes,
    },
    {
      icon: "play_circle",
      title: "Total Videos",
      value: stats.totalVideos,
    },
  ];

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="flex flex-col gap-6 mx-auto max-w-7xl">
        <DashboardHeader />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, i) => (
            <DashboardCard key={i} {...card} />
          ))}
        </div>
        <RecentActivityWidget />
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-base font-normal text-slate-500">
          Welcome back. Here is what's happening in your platform.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center h-10 gap-2 px-4 text-sm font-medium transition-colors bg-white border rounded-lg shadow-sm border-slate-200 text-slate-700 hover:bg-slate-50">
          <span className="material-symbols-outlined text-[20px]">
            calendar_today
          </span>
          <span>This Month</span>
        </button>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="flex flex-col justify-between h-32 p-5 pb-2 transition-colors bg-white border shadow-sm rounded-xl border-slate-200 hover:border-blue-300 group">
      <div className="flex items-start justify-between">
        <div className="p-2 text-blue-600 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        <p className="text-sm font-medium text-slate-500">{title}</p>
      </div>
    </div>
  );
}

function RecentActivityWidget() {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl border-slate-200">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="mt-2 bg-blue-600 rounded-full size-2"></div>
            <div className="w-px h-full mt-2 bg-slate-200"></div>
          </div>
          <div className="pb-2">
            <p className="text-sm font-medium text-slate-900">
              New user registered
            </p>
            <p className="mt-1 text-xs text-slate-500">2 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Users View
function UsersView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            Add User
          </button>
        </div>
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs tracking-wider uppercase bg-slate-50 text-slate-500">
                  <th className="p-4 font-medium">Username</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">XP</th>
                  <th className="p-4 font-medium">Rank</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-4 font-medium text-slate-900">
                        {user.username}
                      </td>
                      <td className="p-4 text-slate-500">{user.email}</td>
                      <td className="p-4 text-slate-500">{user.xp}</td>
                      <td className="p-4 text-slate-500">{user.rank}</td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-slate-500 hover:text-blue-600">
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button className="p-2 text-slate-500 hover:text-red-600">
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Articles View
function ArticlesView() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Article Management
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Article
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            title="Getting Started with React"
            xpReward={50}
            reads={245}
          />
          <ArticleCard
            title="Advanced Spring Boot"
            xpReward={100}
            reads={156}
          />
        </div>
      </div>
      {showCreateModal && (
        <CreateArticleModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function ArticleCard({ title, xpReward, reads }) {
  return (
    <div className="p-6 transition-colors bg-white border shadow-sm rounded-xl border-slate-200 hover:border-blue-300">
      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">star</span>
          {xpReward} XP
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">
            visibility
          </span>
          {reads} reads
        </span>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
          Edit
        </button>
        <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100">
          Delete
        </button>
      </div>
    </div>
  );
}

function CreateArticleModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    xpReward: 50,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle article creation
    console.log("Creating article:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create Article</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="10"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              XP Reward
            </label>
            <input
              type="number"
              value={formData.xpReward}
              onChange={(e) =>
                setFormData({ ...formData, xpReward: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Article
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-bold border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Quizzes View
function QuizzesView() {
  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Quiz Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Quiz
          </button>
        </div>
        <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <span className="material-symbols-outlined text-[48px] text-slate-300">
            quiz
          </span>
          <p className="mt-4 text-slate-500">No quizzes yet. Create your first quiz!</p>
        </div>
      </div>
    </div>
  );
}

// Videos View
function VideosView() {
  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Video Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Video
          </button>
        </div>
        <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <span className="material-symbols-outlined text-[48px] text-slate-300">
            play_circle
          </span>
          <p className="mt-4 text-slate-500">No videos yet. Add your first video!</p>
        </div>
      </div>
    </div>
  );
}

// Reports View
function ReportsView() {
  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Reports & Analytics
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              User Growth
            </h3>
            <p className="text-slate-500">User growth chart will appear here</p>
          </div>
          <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Content Engagement
            </h3>
            <p className="text-slate-500">Engagement metrics will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}