import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaChevronDown,
  FaCog,
  FaGraduationCap,
  FaMoon,
  FaQuestionCircle,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaUser,
  FaCrown,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { fetchUserProfile } from "../redux/slices/userSlice";

export default function Navbar() {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user?.id]);

  const handleLogout = function () {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                <Link to={"/dashboard"}>P2PLearn</Link>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                className="flex h-10 px-3 py-1 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-colors border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-72 bg-gray-50"
                placeholder="Search courses, articles..."
              />
              <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
            </div>

            <button className="inline-flex items-center justify-center w-10 h-10 gap-2 px-2 py-1 font-medium text-gray-600 transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:text-gray-900 hover:bg-gray-100 rounded-button whitespace-nowrap">
              <FaMoon size={20} />
            </button>

            <button className="relative inline-flex items-center justify-center w-10 h-10 gap-2 px-2 py-1 font-medium text-gray-600 transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:text-gray-900 hover:bg-gray-100 rounded-button whitespace-nowrap">
              <FaBell size={20} />
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </button>

            <div
              className="relative"
              role="button"
              onClick={() => setProfileIsOpen(!profileIsOpen)}
            >
              <div
                id="profile-dropdown-trigger"
                className="flex items-center p-2 space-x-3 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {profileIsOpen && (
                  <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                    <div className="py-2">
                      <Link to={"/profile"}>
                        <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                          <FaUser className="w-5 mr-3 text-center text-blue-600" />
                          <span className="font-medium">View Profile</span>
                        </div>
                      </Link>

                      {user?.admin && (
                        <Link to={"/admin"}>
                          <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                            <FaCrown className="w-5 mr-3 text-center text-yellow-600" />
                            <span className="font-medium">Admin Dashboard</span>
                          </div>
                        </Link>
                      )}

                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaCog className="w-5 mr-3 text-center text-gray-600" />
                        <span className="font-medium">Account Settings</span>
                      </div>
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaShieldAlt className="w-5 mr-3 text-center text-purple-600" />
                        <span className="font-medium">Privacy Settings</span>
                      </div>
                      <div className="flex items-center px-4 py-3 text-gray-900 transition-colors cursor-pointer hover:bg-gray-50">
                        <FaQuestionCircle className="w-5 mr-3 text-center text-green-600" />
                        <span className="font-medium">Help and Support</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <button
                        className="flex items-center w-full px-4 py-3 text-red-600 transition-colors cursor-pointer hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="w-5 mr-3 text-center text-red-600" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                    {loading ? (
                      ""
                    ) : (
                      <img
                        src={
                          profile?.avatarUrl?.startsWith("http")
                            ? profile.avatarUrl
                            : `http://localhost:8080${profile?.avatarUrl}`
                        }
                        alt="User Avatar"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </span>

                  {user?.admin && (
                    <span className="absolute flex items-center justify-center w-4 h-4 bg-yellow-400 border-2 border-white rounded-full -bottom-1 -right-1">
                      <FaCrown className="text-xs text-yellow-900" />
                    </span>
                  )}
                </div>

                <span className="hidden font-medium text-gray-900 sm:block">
                  {user?.admin && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                      <FaCrown className="text-xs" />
                      Admin
                    </span>
                  )}
                </span>

                <FaChevronDown
                  className={`text-sm text-gray-500 transition-transform ${
                    profileIsOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
