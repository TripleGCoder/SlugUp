export type User = {
  id: string;
  name: string;
  email: string;
  major: string;
  courses: string[];
  avatar: string;
  friends: string[];
};

export type StudyGoal = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
};

export type RoomType = 'focus' | 'chat';

export type StudyRoom = {
  id: string;
  name: string;
  description?: string;
  host: string;
  type: RoomType;
  course?: string;
  major?: string;
  maxParticipants: number;
  currentParticipants: string[];
  hasTimer: boolean;
  timerSettings?: {
    workMinutes: number;
    breakMinutes: number;
    rounds: number;
  };
  createdAt: Date;
};

export type RecurringSession = {
  id: string;
  name: string;
  hostId: string;
  participants: string[];
  schedule: {
    days: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
    time: string;
  };
  roomType: RoomType;
  course?: string;
  major?: string;
};