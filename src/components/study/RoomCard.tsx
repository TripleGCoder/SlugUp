import React from 'react';
import { Video, MessageSquare, Clock, User, Users } from 'lucide-react';
import { StudyRoom } from '../../types';
import Button from '../common/Button';

interface RoomCardProps {
  room: StudyRoom;
  onJoin: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onJoin }) => {
  const isRoomFull = room.currentParticipants.length >= room.maxParticipants;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className={`px-4 py-3 ${room.type === 'focus' ? 'bg-blue-500' : 'bg-yellow-500'} text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{room.name}</h3>
          {room.type === 'focus' ? (
            <Video className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </div>
      </div>
      
      <div className="p-4">
        {room.description && (
          <p className="text-gray-600 mb-4">{room.description}</p>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{room.currentParticipants.length} / {room.maxParticipants} participants</span>
          </div>
          
          {room.course && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>Course: {room.course}</span>
            </div>
          )}
          
          {room.major && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
              <span>Major: {room.major}</span>
            </div>
          )}
          
          {room.hasTimer && room.timerSettings && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Pomodoro: {room.timerSettings.workMinutes}/{room.timerSettings.breakMinutes} min</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              <User className="h-3 w-3" />
            </div>
            <span className="text-sm text-gray-500">
              {room.currentParticipants.length > 1 
                ? `+${room.currentParticipants.length - 1} others` 
                : 'Waiting for others'}
            </span>
          </div>
          
          <Button
            variant={room.type === 'focus' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onJoin(room.id)}
            disabled={isRoomFull}
          >
            {isRoomFull ? 'Room Full' : 'Join Room'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;