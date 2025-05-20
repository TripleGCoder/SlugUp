import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../common/Button';

interface PomodoroTimerProps {
  workMinutes: number;
  breakMinutes: number;
  onTimerComplete?: () => void;
}

type TimerMode = 'work' | 'break';

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workMinutes = 25,
  breakMinutes = 5,
  onTimerComplete
}) => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [timerCycles, setTimerCycles] = useState(0);
  
  const intervalRef = useRef<number | null>(null);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Timer completed
            const audio = new Audio(mode === 'work' 
              ? 'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-remove-2576.mp3'
              : 'https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
            audio.play();
            
            clearInterval(intervalRef.current!);
            
            // Switch modes
            if (mode === 'work') {
              setMode('break');
              setIsPaused(true);
              return breakMinutes * 60;
            } else {
              setMode('work');
              setIsPaused(true);
              setTimerCycles(prev => prev + 1);
              if (onTimerComplete) {
                onTimerComplete();
              }
              return workMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, mode, workMinutes, breakMinutes, onTimerComplete]);

  const toggleTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
    setMode('work');
    setSecondsLeft(workMinutes * 60);
  };

  // Calculate progress percentage
  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40 mb-4">
        {/* Progress circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={`${mode === 'work' ? 'text-blue-500' : 'text-yellow-500'} transition-all duration-1000`}
            strokeWidth="5"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Timer text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className={`text-sm font-medium ${mode === 'work' ? 'text-blue-500' : 'text-yellow-500'}`}>
            {mode === 'work' ? 'Focus Time' : 'Break Time'}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={toggleTimer}
          variant={isPaused ? 'primary' : 'outline'}
          leftIcon={isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        >
          {isPaused ? 'Start' : 'Pause'}
        </Button>
        
        <Button 
          onClick={resetTimer}
          variant="ghost"
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Reset
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Completed cycles: <span className="font-medium">{timerCycles}</span>
      </div>
    </div>
  );
};

export default PomodoroTimer;