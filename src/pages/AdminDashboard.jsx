import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { dashboardHome, deleteUser } from "../redux/slices/adminSlice";
import { toast } from "react-toastify";
import { useConfirm } from "../hooks/Confirm";
import {
  FaTachometerAlt,
  FaUsers,
  FaNewspaper,
  FaQuestionCircle,
  FaPlayCircle,
  FaChartBar,
  FaBell,
  FaBars,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaStar,
  FaEye,
  FaCalendarAlt,
  FaDownload,
  FaSignOutAlt,
  FaBan
} from "react-icons/fa";
import CreateArticleModal from "../components/ArticleModal";

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, articles, quizzes, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (!user?.admin) {
      navigate("/dashboard");
    }
    dispatch(dashboardHome());
    console.log(users);
    console.log(articles);
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="overflow-hidden antialiased bg-slate-50 text-slate-900">
        <div className="flex w-full h-screen">
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
          />
          <main className="relative flex flex-col flex-1 h-full overflow-hidden bg-slate-50">
            <Header currentView={currentView} user={user} />
            {currentView === "dashboard" && (
              <DashboardView
                users={users}
                articles={articles}
                quizzes={quizzes}
              />
            )}
            {currentView === "users" && (
              <UsersView users={users} loading={loading} user={user} />
            )}
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
    { id: "dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { id: "users", icon: FaUsers, label: "Users" },
    { id: "articles", icon: FaNewspaper, label: "Articles" },
    { id: "quizzes", icon: FaQuestionCircle, label: "Quizzes" },
    { id: "videos", icon: FaPlayCircle, label: "Videos" },
    { id: "reports", icon: FaChartBar, label: "Reports" },
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
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                    currentView === item.id
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setCurrentView(item.id)}
                >
                  <Icon className="text-[20px]" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full h-10 gap-2 px-4 overflow-hidden text-sm font-bold transition-colors border rounded-lg cursor-pointer bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
        >
          <FaSignOutAlt />
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

  return (
    <header className="z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0">
      <div className="items-center hidden gap-2 sm:flex">
      <a  
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
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
        <FaBars className="text-[24px]" />
      </button>
      <div className="flex items-center gap-3">
        <button className="relative p-2 transition-colors rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100">
          <FaBell className="text-[24px]" />
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
    </header>
  );
}

function DashboardView({ users, articles, quizzes }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    totalQuizzes: 0,
    totalVideos: 0,
  });
  
  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalArticles: articles.length,
      totalQuizzes: quizzes.length,
      totalVideos: 0,
    });
  }, [users, articles, quizzes]);

  const dashboardCards = [
    {
      icon: FaUsers,
      title: "Total Users",
      value: stats.totalUsers,
    },
    {
      icon: FaNewspaper,
      title: "Total Articles",
      value: stats.totalArticles,
    },
    {
      icon: FaQuestionCircle,
      title: "Total Quizzes",
      value: stats.totalQuizzes,
    },
    {
      icon: FaPlayCircle,
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
          <FaCalendarAlt className="text-[20px]" />
          <span>This Month</span>
        </button>
        <button className="flex items-center h-10 gap-2 px-4 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700">
          <FaDownload className="text-[20px]" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  const Icon = icon;
  return (
    <div className="flex flex-col justify-between h-32 p-5 pb-2 transition-colors bg-white border shadow-sm rounded-xl border-slate-200 hover:border-blue-300 group">
      <div className="flex items-start justify-between">
        <div className="p-2 text-blue-600 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white">
          <Icon className="text-2xl" />
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

function UsersView({ users, loading, user }) {
  const dispatch = useDispatch();
  const { confirm, ConfirmDialog } = useConfirm();
  
  const handleDeleteUser = async (userId) => {
    const ok = await confirm("Do you really want to delete this user");
    if (ok) {
      try {
        if (userId != user?.id) {
          await dispatch(deleteUser({ userId })).unwrap();
          toast.success("User deleted successfully");
          await dispatch(dashboardHome());
        } else {
          toast.error("Cannot delete current user");
        }
      } catch (error) {
        toast.error("Failed to delete user");
        console.error("Error failed to delete user", error);
      }
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <FaUserPlus className="text-[20px]" />
            Add User
          </button>
        </div>
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="overflow-x-auto">
            <ConfirmDialog />
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
                      <td className="px-4 py-2 font-medium text-slate-900">
                        {user.username}
                      </td>
                      <td className="px-4 py-2 text-slate-500">{user.email}</td>
                      <td className="px-4 py-2 text-slate-500">
                        {user?.profile?.xp || 0}
                      </td>
                      <td className="px-4 py-2 capitalize text-slate-500">
                        {user?.profile?.rank || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button className="p-2 text-slate-500 hover:text-blue-600">
                          <FaBan className="text-[15px]" />
                        </button>
                        <button
                          className="p-2 text-slate-500 hover:text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <FaTrash className="text-[15px]" />
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
            <FaPlus className="text-[20px]" />
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
          <FaStar className="text-[18px]" />
          {xpReward} XP
        </span>
        <span className="flex items-center gap-1">
          <FaEye className="text-[18px]" />
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



function QuizzesView() {
  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Quiz Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <FaPlus className="text-[20px]" />
            Create Quiz
          </button>
        </div>
        <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <FaQuestionCircle className="inline-block text-[48px] text-slate-300" />
          <p className="mt-4 text-slate-500">
            No quizzes yet. Create your first quiz!
          </p>
        </div>
      </div>
    </div>
  );
}

function VideosView() {
  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Video Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            <FaPlus className="text-[20px]" />
            Add Video
          </button>
        </div>
        <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <FaPlayCircle className="inline-block text-[48px] text-slate-300" />
          <p className="mt-4 text-slate-500">
            No videos yet. Add your first video!
          </p>
        </div>
      </div>
    </div>
  );
}

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