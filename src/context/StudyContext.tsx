import React, { createContext, useContext, useState } from 'react';
import { StudyRoom, StudyGoal, RecurringSession, RoomType } from '../types';

type StudyContextType = {
  // Rooms
  rooms: StudyRoom[];
  activeRoom: StudyRoom | null;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  createRoom: (room: Omit<StudyRoom, 'id' | 'currentParticipants' | 'createdAt'>) => void;
  
  // Goals
  goals: StudyGoal[];
  createGoal: (goal: Omit<StudyGoal, 'id' | 'createdAt' | 'completed'>) => void;
  completeGoal: (goalId: string) => void;
  
  // Recurring sessions
  recurringSession: RecurringSession[];
  createRecurringSession: (session: Omit<RecurringSession, 'id'>) => void;
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<StudyRoom[]>([
    {
      id: 'room1',
      name: 'CSE 101 Focus Session',
      description: 'Working on algorithms homework',
      host: 'user_123',
      type: 'focus',
      course: 'CSE101',
      major: 'Computer Science',
      maxParticipants: 4,
      currentParticipants: ['user_123'],
      hasTimer: true,
      timerSettings: {
        workMinutes: 25,
        breakMinutes: 5,
        rounds: 4
      },
      createdAt: new Date()
    },
    {
      id: 'room2',
      name: 'BIOE 20 Study Group',
      description: 'Preparing for midterm',
      host: 'user_456',
      type: 'chat',
      course: 'BIOE20',
      major: 'Biology',
      maxParticipants: 6,
      currentParticipants: ['user_456', 'user_789'],
      hasTimer: false,
      createdAt: new Date()
    }
  ]);
  
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [recurringSession, setRecurringSessions] = useState<RecurringSession[]>([]);

  const joinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setActiveRoom(room);
    }
  };

  const leaveRoom = () => {
    setActiveRoom(null);
  };

  const createRoom = (roomData: Omit<StudyRoom, 'id' | 'currentParticipants' | 'createdAt'>) => {
    const newRoom: StudyRoom = {
      ...roomData,
      id: 'room_' + Math.random().toString(36).substr(2, 9),
      currentParticipants: [roomData.host],
      createdAt: new Date()
    };
    
    setRooms([...rooms, newRoom]);
    return newRoom;
  };

  const createGoal = (goalData: Omit<StudyGoal, 'id' | 'createdAt' | 'completed'>) => {
    const newGoal: StudyGoal = {
      ...goalData,
      id: 'goal_' + Math.random().toString(36).substr(2, 9),
      completed: false,
      createdAt: new Date()
    };
    
    setGoals([...goals, newGoal]);
  };

  const completeGoal = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: true, completedAt: new Date() } 
        : goal
    ));
  };

  const createRecurringSession = (sessionData: Omit<RecurringSession, 'id'>) => {
    const newSession: RecurringSession = {
      ...sessionData,
      id: 'session_' + Math.random().toString(36).substr(2, 9),
    };
    
    setRecurringSessions([...recurringSession, newSession]);
  };

  return (
    <StudyContext.Provider
      value={{
        rooms,
        activeRoom,
        joinRoom,
        leaveRoom,
        createRoom,
        goals,
        createGoal,
        completeGoal,
        recurringSession,
        createRecurringSession
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};