import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import {
  dashboardHome,
  deleteArticle,
  deleteUser,
  editArticle,
  makeAdmin,
  removeAdmin,
} from "../redux/slices/adminSlice";
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
  FaBan,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaCalendar,
  FaCog,
  FaCrown,
  FaUserShield,
  FaShieldAlt,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import CreateArticleModal from "../components/ArticleModal";
import EditArticleModal, { ArticleViewer } from "../components/EditArticleModal";
import QuizzesView from "../components/QuizzesView";

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
            {currentView === "articles" && <ArticlesView articles={articles} />}
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
            <Link to={"/dashboard"} className="flex items-center gap-3 px-2">
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
            </Link>
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
    console.log(users)
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all'); // 'all', 'admin', 'user'

  const handleToggleAdmin = async (userId, isAdmin, username) => {
    if (userId === user?.id) {
      toast.error("You cannot change your own admin status");
      return;
    }

    if (isAdmin) {
      // Remove admin privileges
      const ok = await confirm(`Remove admin privileges from ${username}?`);
      if (ok) {
        try {
          await dispatch(removeAdmin({ userId })).unwrap();
          toast.success(`${username} is no longer an admin`);
          await dispatch(dashboardHome());
        } catch (error) {
          toast.error("Failed to remove admin privileges");
          console.error(error);
        }
      }
    } else {
      // Grant admin privileges
      const ok = await confirm(`Grant admin privileges to ${username}?`);
      if (ok) {
        try {
          await dispatch(makeAdmin({ userId })).unwrap();
          toast.success(`${username} is now an admin`);
          await dispatch(dashboardHome());
        } catch (error) {
          toast.error("Failed to grant admin privileges");
          console.error(error);
        }
      }
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (userId === user?.id) {
      toast.error("Cannot delete current user");
      return;
    }

    const ok = await confirm(`Permanently delete ${username}? This action cannot be undone.`);
    if (ok) {
      try {
        await dispatch(deleteUser({ userId })).unwrap();
        toast.success("User deleted successfully");
        await dispatch(dashboardHome());
      } catch (error) {
        toast.error("Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      roleFilter === 'all' ||
      (roleFilter === 'admin' && u.admin) ||
      (roleFilter === 'user' && !u.admin);
    
    return matchesSearch && matchesRole;
  });

  const adminCount = users.filter(u => u.admin).length;
  const userCount = users.length - adminCount;

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">User Management</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage users, roles, and permissions
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <FaDownload className="text-[16px]" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <FaUserPlus className="text-[16px]" />
                Add User
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
            <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Users</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{users.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaUserShield className="text-2xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Administrators</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{adminCount}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaShieldAlt className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Regular Users</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{userCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaUserPlus className="text-2xl text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mb-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute transform -translate-y-1/2 text-slate-400 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users</option>
                <option value="admin">Admins Only</option>
                <option value="user">Users Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="overflow-x-auto">
            <ConfirmDialog />
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs tracking-wider uppercase border-b bg-slate-50 text-slate-600 border-slate-200">
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">XP</th>
                  <th className="p-4 font-semibold">Rank</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                        <p className="text-slate-500">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <FaUserShield className="text-5xl text-slate-300" />
                        <p className="text-slate-500">
                          {searchTerm || roleFilter !== 'all' 
                            ? 'No users found matching your filters' 
                            : 'No users found'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-semibold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                            {u?.profile.avatarUrl ? (<img src={
                              u?.profile.avatarUrl.startsWith("http")?u.profile.avatarUrl:`http://localhost:8080${u?.profile?.avatarUrl}`
                            }/>): u.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{u.username}</p>
                            {u.id === user?.id && (
                              <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mt-0.5">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-4 text-slate-600">{u.email}</td>

                      {/* XP */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                          <span>⭐</span>
                          {u?.profile?.xp || 0}
                        </span>
                      </td>

                      {/* Rank */}
                      <td className="px-4 py-4">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-full capitalize">
                          {u?.profile?.rank || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {u.admin ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
                            <FaShieldAlt />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-full">
                            User
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleToggleAdmin(u.id, u.admin, u.username)}
                            disabled={u.id === user?.id}
                            className={`p-2 rounded-lg transition-colors ${
                              u.id === user?.id
                                ? 'text-slate-300 cursor-not-allowed'
                                : u.admin
                                ? 'text-purple-600 hover:bg-purple-50'
                                : 'text-slate-500 hover:bg-slate-100'
                            }`}
                            title={
                              u.id === user?.id
                                ? "Cannot change your own role"
                                : u.admin
                                ? "Remove admin privileges"
                                : "Grant admin privileges"
                            }
                          >
                            <FaCrown className="text-[16px]" />
                          </button>

                          <button
                            className="p-2 transition-colors rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50"
                            title="Ban user"
                          >
                            <FaBan className="text-[16px]" />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.id, u.username)}
                            disabled={u.id === user?.id}
                            className={`p-2 rounded-lg transition-colors ${
                              u.id === user?.id
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                            title={u.id === user?.id ? "Cannot delete yourself" : "Delete user"}
                          >
                            <FaTrash className="text-[16px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        {!loading && filteredUsers.length > 0 && (
          <div className="mt-4 text-sm text-center text-slate-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}


function ArticlesView({ articles }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null)
  const dispatch = useDispatch();
  
  const { confirm, ConfirmDialog } = useConfirm();
  const {loading,error} = useSelector((state) => state.admin);

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
          <ConfirmDialog/>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={() => {
                setShowEditModal(true);
                setEditingArticle(article);
              }}
              onView={() => {
                setViewingArticle(article)
              }}
              onDelete={
                async()=>{
                  const isDelete = await confirm("Do you really want to delete this article")
                  if(isDelete){
                  try {
                    await dispatch(deleteArticle({articleId:article?.id})).unwrap({})
                    toast.success("Article deleted successfully")
                  } catch (error) {
                    console.log(error)
                    toast.error("Article failed to delete")
                  }
                }else{
                  return;
                }
              
              }}
            />
          ))}
        </div>
      </div>
      {showCreateModal && (
        <CreateArticleModal onClose={() => setShowCreateModal(false)} />
      )}
      {viewingArticle &&(
        <ArticleViewer article={viewingArticle} onClose={()=>setViewingArticle(null)}/>
      )}
      {showEditModal && (
        <EditArticleModal
          article={editingArticle}
          onClose={() => setShowEditModal(false)}
          onSave={async ({
            title,
            category,
            body,
            coverImage
          }) => {
            try {
              await dispatch(
                editArticle({
                  articleId: editingArticle?.id,
                  postData: {
                    title,
                    category,
                    body,
                  },
                  coverImg:coverImage,
                })
              ).unwrap();
              toast.success("Article updated successfully");
              await dispatch(dashboardHome());

              setShowEditModal(false);
              setEditingArticle(null);
            } catch (error) {
              console.error("Error updating article:", error);
              toast.error(error.message || "Failed to update article");
            }
          }}
          loading= {loading}
        />
      )}
    </div>
  );
}

function ArticleCard({ article, onEdit, onDelete,onView }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      WEB_DEV: 'bg-blue-100 text-blue-700',
      MOBILE_DEV: 'bg-green-100 text-green-700',
      DATA_SCIENCE: 'bg-purple-100 text-purple-700',
      GAME_DEV: 'bg-pink-100 text-pink-700',
      AI: 'bg-indigo-100 text-indigo-700',
      BLOCKCHAIN: 'bg-yellow-100 text-yellow-700',
      CYBER_SECURITY: 'bg-red-100 text-red-700',
      CLOUD_COMPUTING: 'bg-cyan-100 text-cyan-700',
      DEVOPS: 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="overflow-hidden transition-all bg-white border shadow-sm rounded-xl border-slate-200 hover:shadow-md hover:border-blue-300">
      {article.coverImageUrl && (
        <div className="relative w-full h-48 overflow-hidden bg-slate-100">
          <img
            src={`http://localhost:8080${article?.coverImageUrl}`}
            alt={article.title}
            className="object-cover w-full h-full"
          />
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}
          >
            {formatCategory(article.category)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category Badge (if no image) */}
        {!article.coverImageUrl && (
          <span
            className={`inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}
          >
            {formatCategory(article.category)}
          </span>
        )}

        {/* Title */}
        <h3 onClick={onView} className="mb-3 text-lg font-bold leading-tight text-slate-900 line-clamp-2 hover:text-blue-600 hover:cursor-pointer">
          {article.title}
        </h3>

       
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaCalendar className="text-slate-400" />
            {formatDate(article.createdAt)}
          </span>
          {article.updatedAt && article.updatedAt !== article.createdAt && (
            <span className="text-xs text-slate-400">
              (Updated {formatDate(article.updatedAt)})
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pb-4 mb-4 text-sm border-b border-slate-200">
          <span className="flex items-center gap-1.5 text-slate-600">
            <FaThumbsUp className="text-green-500" />
            <span className="font-medium">{article.likes}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <FaThumbsDown className="text-red-500" />
            <span className="font-medium">{article.dislikes}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <FaComment className="text-blue-500" />
            <span className="font-medium">{article.comments?.length || 0}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={ onEdit}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors rounded-lg bg-red-50 hover:bg-red-100"
          >
            <FaTrash />
            Delete
          </button>
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