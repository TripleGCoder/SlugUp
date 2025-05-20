import React, { useState } from 'react';
import { X, Maximize2, Minimize2, Video, VideoOff, UserPlus, Share2 } from 'lucide-react';
import Button from '../common/Button';
import { StudyRoom } from '../../types';
import PomodoroTimer from './PomodoroTimer';
import GoalSetter from './GoalSetter';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';

interface VideoRoomProps {
  room: StudyRoom;
  onLeave: () => void;
}

// Mock participants for demonstration
const mockParticipants = [
  { id: 'user1', name: 'Sarah Chen', major: 'Computer Science', currentTask: 'Working on algorithms homework' },
  { id: 'user2', name: 'Miguel Rodriguez', major: 'Psychology', currentTask: 'Writing research paper' },
  { id: 'user3', name: 'Taylor Kim', major: 'Biology', currentTask: 'Studying for midterm' },
];

const VideoRoom: React.FC<VideoRoomProps> = ({ room, onLeave }) => {
  const { user } = useAuth();
  const { goals, createGoal, completeGoal } = useStudy();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Filter goals for current user
  const userGoals = goals.filter(goal => goal.userId === user?.id);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Room header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">{room.name}</h2>
          <p className="text-sm text-gray-400">
            {room.course ? `Course: ${room.course}` : room.major ? `Major: ${room.major}` : 'Study Room'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCameraOn(!isCameraOn)}
            leftIcon={isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          >
            {isCameraOn ? 'Camera On' : 'Camera Off'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            leftIcon={isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            onClick={onLeave}
            leftIcon={<X className="h-4 w-4" />}
          >
            Leave
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video grid */}
        <div className={`flex-1 p-4 grid grid-cols-2 gap-4 ${isSidebarOpen ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {/* Current user video */}
          <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
            {isCameraOn ? (
              <div className="text-center text-gray-400">
                <Video className="h-8 w-8 mx-auto mb-2" />
                <p>Your camera is active</p>
                <p className="text-sm">(Camera preview would appear here)</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <VideoOff className="h-8 w-8 mx-auto mb-2" />
                <p>Your camera is off</p>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name} (You)</p>
                  <p className="text-xs text-gray-300">{user?.major}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other participants */}
          {mockParticipants.map((participant) => (
            <div key={participant.id} className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video">
              <img 
                src={`https://images.pexels.com/photos/7173809/pexels-photo-7173809.jpeg?auto=compress&cs=tinysrgb&w=640`} 
                alt="Participant video"
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                    {participant.name.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{participant.name}</p>
                    <p className="text-xs text-gray-300">{participant.major}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({length: Math.max(0, room.maxParticipants - mockParticipants.length - 1)}).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg flex items-center justify-center aspect-video">
              <button className="flex flex-col items-center text-gray-400 hover:text-gray-300">
                <UserPlus className="h-8 w-8 mb-2" />
                <span>Invite a friend</span>
              </button>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-80 border-l border-gray-700 bg-gray-800 flex flex-col">
            <div className="p-4 flex-1 overflow-y-auto">
              {/* Current activity */}
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium mb-2">Room Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    <strong>Room Type:</strong> {room.type === 'focus' ? 'Focus Room (No Chat)' : 'Chat-Enabled Room'}
                  </p>
                  {room.course && (
                    <p className="text-sm text-gray-300">
                      <strong>Course:</strong> {room.course}
                    </p>
                  )}
                  {room.major && (
                    <p className="text-sm text-gray-300">
                      <strong>Major:</strong> {room.major}
                    </p>
                  )}
                  <p className="text-sm text-gray-300">
                    <strong>Participants:</strong> {room.currentParticipants.length} / {room.maxParticipants}
                  </p>
                </div>
              </div>
              
              {/* Pomodoro Timer */}
              {room.hasTimer && room.timerSettings && (
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium mb-2 text-center">Pomodoro Timer</h3>
                  <PomodoroTimer 
                    workMinutes={room.timerSettings.workMinutes} 
                    breakMinutes={room.timerSettings.breakMinutes}
                  />
                </div>
              )}
              
              {/* Goals */}
              <div className="bg-gray-700 rounded-lg p-4">
                <GoalSetter 
                  goals={userGoals}
                  onGoalCreate={createGoal}
                  onGoalComplete={completeGoal}
                  userId={user?.id || ''}
                />
              </div>
            </div>
            
            {/* Chat (for chat-enabled rooms) */}
            {room.type === 'chat' && (
              <div className="border-t border-gray-700 p-4">
                <h3 className="text-sm font-medium mb-2">Chat</h3>
                <div className="bg-gray-700 rounded-lg p-2 h-40 mb-2 overflow-y-auto">
                  <div className="text-center text-gray-400 text-sm p-4">
                    Chat messages will appear here
                  </div>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 bg-gray-700 rounded-l-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Type a message..."
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 rounded-r-lg px-4 py-2">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRoom;