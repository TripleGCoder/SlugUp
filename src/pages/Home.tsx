import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Users, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Study smarter with your <span className="text-yellow-400">fellow Slugs</span>
              </h1>
              <p className="mt-6 text-xl text-blue-50 max-w-3xl">
                Connect with UCSC students in real-time video study rooms, 
                stay accountable, and boost your productivity with focused study sessions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button size="lg">
                        Sign up with UCSC email
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg">
                        Log in
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6 relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Students studying"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h3 className="font-medium text-white">UCSC Computer Science Study Group</h3>
                        <p className="text-sm text-blue-50">3 students • Focus Room • Algorithms & Data Structures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Focus, connect, succeed
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Everything you need to make studying more productive and engaging.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-blue-500 text-white flex items-center justify-center mb-4">
                    <Video className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Camera-Only Study Rooms</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Stay focused and accountable with distraction-free video study rooms designed for maximum productivity.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-yellow-500 text-white flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Smart Matchmaking</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Connect with UCSC students in your major, courses, or with similar study goals and schedules.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-green-500 text-white flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Goal Setting & Tracking</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Set study goals, track your progress, and celebrate your accomplishments with visual statistics.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-purple-500 text-white flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Recurring Study Sessions</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Schedule regular study sessions with friends or study partners to build consistent habits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Hear from UCSC students
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Matt Wilson</h3>
                  <p className="text-sm text-gray-500">Computer Science, Junior</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a computer science major with heavy workloads, SlugStudy has been a game-changer. 
                The focused study rooms keep me accountable, and I've connected with study partners in my algorithms class."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xl font-bold">
                  J
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Julia Chen</h3>
                  <p className="text-sm text-gray-500">Psychology, Senior</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I love using the Pomodoro timer and goal-setting features. Having other students visible 
                while studying creates just enough social pressure to stay focused on my research papers."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  R
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Rafael Cortez</h3>
                  <p className="text-sm text-gray-500">Marine Biology, Sophomore</p>
                </div>
              </div>
              <p className="text-gray-600">
                "For a challenging major like Marine Biology, having regular study sessions has been crucial. 
                I've made friends in my major through SlugStudy who I now meet with every week."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your productivity?</span>
            <span className="block text-yellow-400">Join SlugStudy today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <Button size="lg">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;