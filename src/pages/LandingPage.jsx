import {
  FaGraduationCap,
  FaMoon,
  FaRocket,
  FaPlay,
  FaUsers,
  FaBrain,
  FaTrophy,
  FaGlobe,
  FaChartLine,
  FaUserPlus,
  FaSignInAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg"
import featureImage from "../assets/img1.jpg"
import manualImage from "../assets/img2.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingPageNav />
     <Hero/>
      <Features/>
     <Manual/>
      <UserFeedBack/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}

function LandingPageNav() {
    return (
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <Link to="/">
                <h1 className="text-xl font-bold text-gray-900">P2PLearn</h1>
              </Link>
            </div>
            <div className="items-center hidden space-x-8 md:flex">
              <a
                href="#features"
                className="font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Pricing
              </a>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow px-4 py-2 w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                <FaMoon className="text-lg" />
              </button>
              <div className="flex items-center space-x-3">
                <Link to={"/login"}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow h-9 px-4 py-2 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    Sign In
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}
function Hero() {
    return (
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
                  Learn, Quiz,
                  <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    Excel
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                  Join thousands of learners on our peer-to-peer platform. Share
                  knowledge, take quizzes, and accelerate your professional
                  growth.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to={"/signup"}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg !rounded-button whitespace-nowrap cursor-pointer">
                    <FaRocket className="mr-2" />
                    Start Learning Free
                  </button>
                </Link>

                <button className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 px-8 py-4 text-lg !rounded-button whitespace-nowrap cursor-pointer">
                  <FaPlay className="mr-2" />
                  Watch Demo
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-sm text-gray-500">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-500">Articles Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="P2PLearn Platform"
                className="relative w-full h-auto shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    );
}
function Features() {
    return (
      <section id="features" className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Why Choose P2PLearn?
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Experience a revolutionary approach to learning with our
              peer-to-peer platform designed for modern professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeaturesCard />
            <FeaturesCard />
            <FeaturesCard />
            <FeaturesCard />
            <FeaturesCard />
            <FeaturesCard />
          </div>
        </div>
      </section>
    );
}
function FeaturesCard() {
    return (
      <div className="p-6 transition-shadow bg-white border shadow rounded-xl text-card-foreground hover:shadow-lg">
        <div className="mb-4">
          <img
            src={featureImage}
            alt="Progress Analytics"
            className="object-cover w-full h-40 mb-4 rounded-lg"
          />
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
            <FaChartLine className="text-xl text-white" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Progress Analytics
          </h3>
          <p className="text-gray-600">
            Get detailed insights into your learning patterns and areas for
            improvement.
          </p>
        </div>
      </div>
    );
}
function Footer(){
  return (<footer className="py-12 border-t border-gray-200 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <FaGraduationCap className="text-sm text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">P2PLearn</h3>
              </div>
              <p className="text-gray-600">
                Empowering professionals through peer-to-peer learning and
                knowledge sharing.
              </p>
              <div className="flex space-x-4">
                <FaTwitter className="text-gray-400 cursor-pointer hover:text-gray-600" />
                <FaLinkedin className="text-gray-400 cursor-pointer hover:text-gray-600" />
                <FaGithub className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t border-gray-200">
            <p className="text-gray-600">
              &copy; 2024 P2PLearn. All rights reserved. Built with ❤️ for
              learners worldwide.
            </p>
          </div>
        </div>
      </footer>)
}
function Manual() {
  return <section
        id="how-it-works"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="px-4 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              How P2PLearn Works
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Get started with our simple three-step process and join a
              community of passionate learners.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={manualImage}
                  alt="Sign Up &amp; Explore"
                  className="object-cover w-full h-48 mb-6 rounded-xl"
                />
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  01
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Sign Up &amp; Explore
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Create your account and browse through thousands of articles
                  and quizzes tailored to your interests.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="https://readdy.ai/api/search-image?query=$%7Bstep.image%7D&width=300&height=250&seq=step1&orientation=landscape"
                  alt="Learn &amp; Contribute"
                  className="object-cover w-full h-48 mb-6 rounded-xl"
                />
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  02
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Learn &amp; Contribute
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Read articles, take quizzes, and share your own knowledge with
                  the community to earn XP points.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="mb-6">
                <img
                  src="https://readdy.ai/api/search-image?query=$%7Bstep.image%7D&width=300&height=250&seq=step2&orientation=landscape"
                  alt="Grow &amp; Achieve"
                  className="object-cover w-full h-48 mb-6 rounded-xl"
                />
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  03
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Grow &amp; Achieve
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Track your progress, earn badges, and climb the leaderboard
                  while building valuable skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
}
function UserFeedBack() {
  return <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              What Our Learners Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied learners who have transformed their
              careers with P2PLearn.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white border shadow rounded-xl text-card-foreground">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <p className="mb-6 italic text-gray-600">
                "P2PLearn helped me transition from marketing to tech. The
                community support and quality content are unmatched."
              </p>
              <div className="flex items-center space-x-3">
                <span className="relative flex w-12 h-12 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=$%7Btestimonial.image%7D&width=80&height=80&seq=testimonial0&orientation=squarish"
                    alt="Sarah Chen"
                    className="object-cover w-full h-full"
                  />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-500">
                    Full Stack Developer at Tech Innovators
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border shadow rounded-xl text-card-foreground">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <p className="mb-6 italic text-gray-600">
                "The interactive quizzes and peer learning approach made complex
                topics easy to understand. Highly recommended!"
              </p>
              <div className="flex items-center space-x-3">
                <span className="relative flex w-12 h-12 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=$%7Btestimonial.image%7D&width=80&height=80&seq=testimonial1&orientation=squarish"
                    alt="Michael Rodriguez"
                    className="object-cover w-full h-full"
                  />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Michael Rodriguez
                  </h4>
                  <p className="text-sm text-gray-500">
                    Product Manager at StartupCo
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border shadow rounded-xl text-card-foreground">
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <p className="mb-6 italic text-gray-600">
                "I love how I can learn from real practitioners and contribute
                my own knowledge. The XP system keeps me motivated."
              </p>
              <div className="flex items-center space-x-3">
                <span className="relative flex w-12 h-12 overflow-hidden rounded-full shrink-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  <img
                    src="https://readdy.ai/api/search-image?query=$%7Btestimonial.image%7D&width=80&height=80&seq=testimonial2&orientation=squarish"
                    alt="Emma Watson"
                    className="object-cover w-full h-full"
                  />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">Emma Watson</h4>
                  <p className="text-sm text-gray-500">
                    UX Designer at Design Studios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
}
function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl px-4 mx-auto text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Ready to Transform Your Learning?
        </h2>
        <p className="mb-8 text-xl leading-relaxed text-blue-100">
          Join our community of passionate learners and start building the
          skills that matter for your career.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold !rounded-button whitespace-nowrap cursor-pointer">
            <FaUserPlus className="mr-2" />
            Join Free Today
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold !rounded-button whitespace-nowrap cursor-pointer">
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}