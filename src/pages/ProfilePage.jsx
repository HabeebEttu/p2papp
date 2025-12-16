import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaMedal,
  FaSave,
  FaTimes,
  FaCamera,
  FaTrophy,
  FaFire,
  FaStar,
  FaHeart,
  FaBook,
  FaUsers,
  FaEye,
  FaBrain,
  FaGraduationCap,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("activity");
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user?.id]);

  
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const displayName =
    user.profile?.firstName && user.profile?.lastName
      ? `${user.profile.firstName} ${user.profile.lastName}`
      : profile?.firstName
        ? profile.firstName
        : user?.username || "User";

  // Check if user has achievements
  const hasAchievements = {
    beginner: profile?.xp >= 0,
    onFire: false, // Requires streak tracking from backend
    starLearner: false, // Requires article count from backend
    champion: profile?.rank === "CHAMPION" || profile?.rank === "EXPERT",
    articleMaster: false, // Requires article count from backend
    quizChampion: false, // Requires quiz count from backend
    communityBuilder: profile?.followers?.length >= 100,
    learningStreak: false, // Requires streak data from backend
    topContributor: profile?.rank === "EXPERT",
    knowledgeSeeker: profile?.xp >= 1000,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const bio = profile?.bio;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  

  const handleSaveProfile = async () => {
    try {
      const result = await dispatch(
        updateUserProfile({
          userId: user.id,
          profileData: formData,
          avatarFile: avatarFile,
        })
      );

      if (updateUserProfile.fulfilled.match(result)) {
        toast.success("Profile updated successfully! 🎉");
        setIsProfileEditing(false);
        setAvatarFile(null);
        dispatch(fetchUserProfile(user.id));
      } else {
        toast.error(result.payload || "Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred while updating profile");
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    setIsProfileEditing(false);
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        bio: profile.bio || "",
      });
    }
    setAvatarFile(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <div className="p-8 bg-white border shadow rounded-xl text-card-foreground">
          {isProfileEditing ? (
            <ProfileEditForm
              formData={formData}
              avatarFile={avatarFile}
              profile={profile}
              loading={loading}
              error={error}
              onInputChange={handleInputChange}
              onAvatarChange={handleAvatarChange}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex items-start space-x-8">
              <span className="relative flex w-32 h-32 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                <img
                  src={`http://localhost:8080${profile?.avatarUrl}`}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </span>
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">
                  {displayName}
                </h1>
                {profile?.bio && (
                  <p className="mb-4 text-gray-600">{profile.bio}</p>
                )}
                <div className="flex items-center mb-6 space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {profile?.followers?.length || 0}
                    </div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {profile?.following?.length || 0}
                    </div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {profile?.xp || 0}
                    </div>
                    <div className="text-sm text-gray-500">Total XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {profile?.friends?.size || 0}
                    </div>
                    <div className="text-sm text-gray-500">Friends</div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap"
                    onClick={() => setIsProfileEditing(!isProfileEditing)}
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Section */}
          

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
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user?.id]);

  
   



  const hasAchievements = {
    beginner: profile?.xp >= 0,
    onFire: false, // Requires streak tracking from backend
    starLearner: false, // Requires article count from backend
    champion: profile?.rank === "CHAMPION" || profile?.rank === "EXPERT",
    articleMaster: false, // Requires article count from backend
    quizChampion: false, // Requires quiz count from backend
    communityBuilder: profile?.followers?.length >= 100,
    learningStreak: false, // Requires streak data from backend
    topContributor: profile?.rank === "EXPERT",
    knowledgeSeeker: profile?.xp >= 1000,
  };

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
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-800">Achievements</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Beginner Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.beginner
                ? "border-blue-300 bg-blue-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaMedal
              className={`mb-2 text-3xl ${
                hasAchievements.beginner ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Beginner
            </span>
            <span className="text-xs text-gray-500">0 XP</span>
          </div>

          {/* Star Learner Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.starLearner
                ? "border-yellow-300 bg-yellow-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaStar
              className={`mb-2 text-3xl ${
                hasAchievements.starLearner
                  ? "text-yellow-600"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Star Learner
            </span>
            <span className="text-xs text-gray-500">10 articles</span>
          </div>

          {/* Community Builder Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.communityBuilder
                ? "border-green-300 bg-green-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaUsers
              className={`mb-2 text-3xl ${
                hasAchievements.communityBuilder
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Community Builder
            </span>
            <span className="text-xs text-gray-500">100+ followers</span>
          </div>

          {/* Champion Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.champion
                ? "border-purple-300 bg-purple-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaTrophy
              className={`mb-2 text-3xl ${
                hasAchievements.champion ? "text-purple-600" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Champion
            </span>
            <span className="text-xs text-gray-500">
              {profile?.rank || "NOVICE"}
            </span>
          </div>

          {/* Knowledge Seeker Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.knowledgeSeeker
                ? "border-indigo-300 bg-indigo-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaGraduationCap
              className={`mb-2 text-3xl ${
                hasAchievements.knowledgeSeeker
                  ? "text-indigo-600"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Knowledge Seeker
            </span>
            <span className="text-xs text-gray-500">1000+ XP earned</span>
          </div>

          {/* Top Contributor Badge */}
          <div
            className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
              hasAchievements.topContributor
                ? "border-orange-300 bg-orange-50 hover:shadow-md"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <FaFire
              className={`mb-2 text-3xl ${
                hasAchievements.topContributor
                  ? "text-orange-600"
                  : "text-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-700">
              Top Contributor
            </span>
            <span className="text-xs text-gray-500">Expert Rank</span>
          </div>

          {/* Coming Soon Badges */}
          <div className="flex flex-col items-center p-4 border border-gray-300 border-dashed rounded-lg opacity-50 bg-gray-50">
            <FaBrain className="mb-2 text-3xl text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">
              Quiz Master
            </span>
            <span className="text-xs text-gray-500">Coming Soon</span>
          </div>

          <div className="flex flex-col items-center p-4 border border-gray-300 border-dashed rounded-lg opacity-50 bg-gray-50">
            <FaBook className="mb-2 text-3xl text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">
              Article Master
            </span>
            <span className="text-xs text-gray-500">Coming Soon</span>
          </div>
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
function ProfileEditForm({
  formData,
  avatarFile,
  profile,
  loading,
  error,
  onInputChange,
  onAvatarChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="flex items-start space-x-8">
      <div className="relative flex w-32 h-32 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
        <img
          src={`http://localhost:8080${profile?.avatarUrl}`}
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <label className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
          <FaCamera className="text-white" />
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex-1 space-y-6">
        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={onInputChange}
              rows="3"
              className="flex w-full px-3 py-2 text-base transition-colors bg-white border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="flex items-center justify-around p-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {profile?.xp || 0}
            </div>
            <div className="text-sm text-gray-500">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {profile?.rank || "NOVICE"}
            </div>
            <div className="text-sm text-gray-500">Rank</div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onSave}
            disabled={loading}
            className="inline-flex items-center justify-center h-10 gap-2 px-6 py-2 text-sm font-medium text-white transition-colors rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 whitespace-nowrap"
          >
            <FaSave className="" />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center justify-center h-10 gap-2 px-6 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-md shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-300 whitespace-nowrap"
          >
            <FaTimes />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
