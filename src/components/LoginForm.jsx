import React,{useEffect} from 'react'
import { FaGoogle, FaMicrosoft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch()
  const {loading, error,isAuthenticated } = useSelector((state)=>state.auth)
  const navigate = useNavigate();
   useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit =async (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    if(credentials.username=='' || credentials.password =='')return
    dispatch(login(credentials))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-600 rounded-md">
            {error}
          </div>
        )}
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-600">
            Join thousands of learners worldwide
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              className="flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your username"
              name="username"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 px-4 py-2 w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold !rounded-button whitespace-nowrap cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 py-2 h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
            <FaGoogle className="mr-2 text-red-500" /> Google
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow px-4 py-2 h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 !rounded-button whitespace-nowrap cursor-pointer">
            <FaMicrosoft className="mr-2 text-blue-500" />
            Microsoft
          </button>
        </div>
        <div className="pt-4 text-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow h-9 px-4 py-2 text-blue-600 hover:text-blue-800 bg-transparent hover:bg-blue-50 !rounded-button whitespace-nowrap cursor-pointer font-medium"
            disabled={loading}
          ><Link to={'/signup'}>
            Already have an account? Sign In
            </Link>
          </button>
        </div>
      </div>
    </form>
  );
}
