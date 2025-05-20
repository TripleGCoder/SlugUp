import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BarChart2, 
  Calendar, 
  Users, 
  Circle, 
  TrendingUp,
  Video
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';

// Mock data
const mockStats = {
  totalHours: 42,
  weeklyHours: 12,
  streak: 5,
  sessionsCompleted: 24
};

const mockUpcomingSessions = [
  { id: '1', name: 'CSE 101 Study Group', time: 'Today, 3:00 PM', participants: 3 },
  { id: '2', name: 'Biology Exam Prep', time: 'Tomorrow, 5:30 PM', participants: 2 },
  { id: '3', name: 'Research Paper Session', time: 'Friday, 4:00 PM', participants: 4 }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { rooms } = useStudy();
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'sessions'>('overview');
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Let's stay focused and productive today
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link to="/rooms">
              <Button leftIcon={<Video className="h-4 w-4" />}>
                Join a Room
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`
                    whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === 'overview' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`
                    whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === 'stats' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                  onClick={() => setActiveTab('stats')}
                >
                  Statistics
                </button>
                <button
                  className={`
                    whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === 'sessions' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                  onClick={() => setActiveTab('sessions')}
                >
                  Sessions
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total hours */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total study hours
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {mockStats.totalHours}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Weekly hours */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BarChart2 className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            This week
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {mockStats.weeklyHours} hours
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Streak */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Current streak
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {mockStats.streak} days
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sessions */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Sessions completed
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {mockStats.sessionsCompleted}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weekly activity */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Weekly Activity</h3>
                  <div className="mt-4 h-32 flex items-end justify-between">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="flex flex-col items-center">
                        <div 
                          className="w-12 bg-blue-500 rounded-t-md" 
                          style={{ height: `${Math.max(20, Math.min(100, Math.random() * 100))}px` }}
                        ></div>
                        <div className="mt-2 text-sm text-gray-500">{day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Active study rooms */}
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Active Study Rooms</h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <div key={room.id} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-900">{room.name}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              room.type === 'focus' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {room.type === 'focus' ? 'Focus' : 'Chat'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{room.description || 'No description'}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              {room.currentParticipants.length}/{room.maxParticipants}
                            </div>
                            <Link to={`/rooms/${room.id}`}>
                              <Button size="sm">Join Room</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6 text-center">
                        <p className="text-gray-500">No active study rooms right now. Start one!</p>
                        <div className="mt-4">
                          <Link to="/rooms/create">
                            <Button>Create Study Room</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Upcoming sessions */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Sessions</h3>
                  <Link to="/calendar">
                    <Button variant="outline" size="sm" leftIcon={<Calendar className="h-4 w-4" />}>
                      View Calendar
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Session
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Time
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Participants
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Join</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {mockUpcomingSessions.map((session) => (
                        <tr key={session.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {session.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {session.time}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {session.participants}
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link to="/calendar" className="text-blue-600 hover:text-blue-900">
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Study Statistics</h3>
                  
                  <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {/* Chart placeholder */}
                    <div className="overflow-hidden rounded-lg bg-gray-50 p-4">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Weekly Hours</h4>
                      <div className="h-64 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-400">Weekly hours chart would appear here</p>
                      </div>
                    </div>
                    
                    {/* Another chart */}
                    <div className="overflow-hidden rounded-lg bg-gray-50 p-4">
                      <h4 className="text-base font-medium text-gray-900 mb-4">Productivity by Time</h4>
                      <div className="h-64 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-400">Productivity chart would appear here</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-base font-medium text-gray-900 mb-4">Monthly Goal Completion</h4>
                    <div className="space-y-4">
                      {/* Goal completion bars */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">CSE 101 Assignments</span>
                          <span className="text-sm font-medium text-gray-500">80%</span>
                        </div>
                        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Research Paper</span>
                          <span className="text-sm font-medium text-gray-500">65%</span>
                        </div>
                        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Exam Preparation</span>
                          <span className="text-sm font-medium text-gray-500">90%</span>
                        </div>
                        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              {/* Calendar placeholder */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Study Sessions Calendar</h3>
                  <div className="mt-4 h-80 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Calendar integration would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recurring sessions */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recurring Study Pods</h3>
                  <Button variant="outline" size="sm">Create Study Pod</Button>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Example session card */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-900">Algorithm Study Group</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Tuesdays & Thursdays, 4:00 PM</p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>4 participants</span>
                      </div>
                      <div className="mt-5 flex">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Another example session card */}
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-900">Research Paper Group</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Mondays & Wednesdays, 5:30 PM</p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>3 participants</span>
                      </div>
                      <div className="mt-5 flex">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Placeholder for new session */}
                  <div className="bg-gray-50 shadow-sm rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <div className="px-4 py-5 sm:p-6 text-center">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                        <Circle className="h-6 w-6 text-gray-400" strokeWidth={1} />
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Create a new study pod</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Schedule recurring sessions with your study partners
                      </p>
                      <div className="mt-6">
                        <Button size="sm">Create Pod</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;