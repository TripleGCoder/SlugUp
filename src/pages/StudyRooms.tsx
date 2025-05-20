import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Video, MessageSquare } from 'lucide-react';
import { useStudy } from '../context/StudyContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import RoomCard from '../components/study/RoomCard';
import VideoRoom from '../components/study/VideoRoom';

type FilterOptions = {
  type?: 'focus' | 'chat' | 'all';
  major?: string;
  course?: string;
  hasTimer?: boolean;
};

const StudyRooms: React.FC = () => {
  const { rooms, joinRoom, activeRoom, leaveRoom } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({ type: 'all' });
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (room.course?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (room.major?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const matchesType = filters.type === 'all' || room.type === filters.type;
    
    // Major filter
    const matchesMajor = !filters.major || room.major === filters.major;
    
    // Course filter
    const matchesCourse = !filters.course || room.course === filters.course;
    
    // Timer filter
    const matchesTimer = filters.hasTimer === undefined || room.hasTimer === filters.hasTimer;
    
    return matchesSearch && matchesType && matchesMajor && matchesCourse && matchesTimer;
  });
  
  // If a room is active, show the video room
  if (activeRoom) {
    return <VideoRoom room={activeRoom} onLeave={leaveRoom} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Study Rooms
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Join an existing room or create your own to start studying with others
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link to="/rooms/create">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Create Room
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                leftIcon={<Search className="h-5 w-5" />}
              />
            </div>
            <Button 
              variant="outline"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
          
          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Options</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Room type filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.type === 'all' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setFilters({...filters, type: 'all'})}
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${
                        filters.type === 'focus' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setFilters({...filters, type: 'focus'})}
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Focus
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${
                        filters.type === 'chat' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setFilters({...filters, type: 'chat'})}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </button>
                  </div>
                </div>
                
                {/* Major filter */}
                <div>
                  <label htmlFor="major-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Major
                  </label>
                  <select
                    id="major-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.major || ''}
                    onChange={(e) => setFilters({...filters, major: e.target.value || undefined})}
                  >
                    <option value="">Any Major</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
                
                {/* Course filter */}
                <div>
                  <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <select
                    id="course-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.course || ''}
                    onChange={(e) => setFilters({...filters, course: e.target.value || undefined})}
                  >
                    <option value="">Any Course</option>
                    <option value="CSE101">CSE101 - Algorithms</option>
                    <option value="BIOE20">BIOE20 - Cell Biology</option>
                    <option value="PSYC01">PSYC01 - Introduction to Psychology</option>
                    <option value="MATH23A">MATH23A - Vector Calculus</option>
                  </select>
                </div>
                
                {/* Timer filter */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    Pomodoro Timer
                  </span>
                  <div className="mt-1 flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={filters.hasTimer === undefined}
                        onChange={() => setFilters({...filters, hasTimer: undefined})}
                      />
                      <span className="ml-2 text-sm text-gray-700">Any</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={filters.hasTimer === true}
                        onChange={() => setFilters({...filters, hasTimer: true})}
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={filters.hasTimer === false}
                        onChange={() => setFilters({...filters, hasTimer: false})}
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setFilters({ type: 'all' });
                    setSearchQuery('');
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Room list */}
        <div className="mt-6">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} onJoin={joinRoom} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Video className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No study rooms found</h3>
              <p className="mt-1 text-gray-500">
                {searchQuery || Object.values(filters).some(v => v !== undefined && v !== 'all') 
                  ? 'Try adjusting your search or filters.'
                  : 'Create a new room to start studying!'}
              </p>
              <div className="mt-6">
                <Link to="/rooms/create">
                  <Button>Create Study Room</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyRooms;