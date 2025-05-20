import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Video, 
  MessageSquare, 
  Clock, 
  BookOpen,
  Users,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useStudy } from '../context/StudyContext';
import { RoomType } from '../types';

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createRoom, joinRoom } = useStudy();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('focus');
  const [course, setCourse] = useState('');
  const [major, setMajor] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [hasTimer, setHasTimer] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timerRounds, setTimerRounds] = useState(4);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!name.trim()) {
      alert('Please provide a room name');
      return;
    }
    
    const newRoom = createRoom({
      name: name.trim(),
      description: description.trim(),
      host: user.id,
      type: roomType,
      course: course.trim() || undefined,
      major: major.trim() || undefined,
      maxParticipants,
      hasTimer,
      timerSettings: hasTimer ? {
        workMinutes,
        breakMinutes,
        rounds: timerRounds
      } : undefined
    });
    
    joinRoom(newRoom.id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/rooms')}
            className="flex items-center text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Study Rooms</span>
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a Study Room</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic room info */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Room Information</h2>
              <div className="space-y-4">
                <Input
                  label="Room Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., CSE 101 Study Group"
                  required
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="What are you working on? Add details to help others decide if they want to join."
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Room type selection */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Room Type</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  className={`
                    relative rounded-lg border p-4 flex flex-col cursor-pointer
                    ${roomType === 'focus' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'}
                  `}
                  onClick={() => setRoomType('focus')}
                >
                  {roomType === 'focus' && (
                    <div className="absolute top-4 right-4 text-blue-500">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                      <Video className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">Focus Room</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Camera-only for maximum focus and productivity.
                    No chat or audio distractions.
                  </p>
                </div>
                
                <div
                  className={`
                    relative rounded-lg border p-4 flex flex-col cursor-pointer
                    ${roomType === 'chat' 
                      ? 'border-yellow-500 bg-yellow-50' 
                      : 'border-gray-300 hover:border-gray-400'}
                  `}
                  onClick={() => setRoomType('chat')}
                >
                  {roomType === 'chat' && (
                    <div className="absolute top-4 right-4 text-yellow-500">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-3">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">Chat-Enabled Room</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Includes text chat for discussions and questions.
                    Still camera-focused for accountability.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Course and Major */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Study Focus (Optional)</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g., CSE101"
                  leftIcon={<BookOpen className="h-5 w-5" />}
                  fullWidth
                />
                
                <Input
                  label="Major"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g., Computer Science"
                  fullWidth
                />
              </div>
            </div>
            
            {/* Room capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Participants
              </label>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={1}
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">{maxParticipants}</span>
              </div>
            </div>
            
            {/* Timer settings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Pomodoro Timer</h2>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={hasTimer}
                      onChange={() => setHasTimer(!hasTimer)}
                    />
                    <div className={`block w-10 h-6 rounded-full ${hasTimer ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${hasTimer ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700">
                    {hasTimer ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>
              
              {hasTimer && (
                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Timer Settings</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Work (minutes)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={workMinutes}
                        onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Break (minutes)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={breakMinutes}
                        onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rounds
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={timerRounds}
                        onChange={(e) => setTimerRounds(parseInt(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit button */}
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/rooms')}
              >
                Cancel
              </Button>
              
              <Button type="submit">
                Create Room
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;