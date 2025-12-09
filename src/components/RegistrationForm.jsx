import React from 'react'

export default function RegistrationForm() {
  return (
     <form className="space-y-4">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor={"username"}
                >
                  Username
                </label>
                <input
                  className="flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your username"
                  name="username"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                  name="email"
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
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-700"
                  htmlFor="password_confirm"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border border-gray-300 rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  name="password_confirm"
                />
              </div>
              <div className="flex items-start p-4 space-x-3 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                  required=""
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed text-gray-700"
                >
                  I agree to the{" "}
                  <a
                    href="/"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 px-4 py-2 w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold !rounded-button whitespace-nowrap cursor-pointer"
                type="submit"
              >
                Create Account
              </button>
            </form>
  )
}
