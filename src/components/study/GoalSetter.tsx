import React, { useState } from 'react';
import { CheckSquare, PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { StudyGoal } from '../../types';

interface GoalSetterProps {
  onGoalCreate: (goal: Omit<StudyGoal, 'id' | 'createdAt' | 'completed'>) => void;
  onGoalComplete: (goalId: string) => void;
  goals: StudyGoal[];
  userId: string;
}

const GoalSetter: React.FC<GoalSetterProps> = ({ 
  onGoalCreate, 
  onGoalComplete, 
  goals,
  userId 
}) => {
  const [newGoal, setNewGoal] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newGoal.trim()) {
      onGoalCreate({
        userId,
        title: newGoal.trim(),
        description: '',
      });
      
      setNewGoal('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Study Goals</h3>
        
        {!isCreating && (
          <Button 
            variant="ghost" 
            size="sm"
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={() => setIsCreating(true)}
          >
            Add Goal
          </Button>
        )}
      </div>
      
      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="What do you want to accomplish?"
            fullWidth
          />
          
          <div className="flex space-x-2">
            <Button type="submit" size="sm">Save Goal</Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setNewGoal('');
                setIsCreating(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      
      {goals.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <li key={goal.id} className="py-3 flex items-start">
              <button
                className={`flex-shrink-0 h-5 w-5 mr-2 mt-0.5 ${
                  goal.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
                }`}
                onClick={() => !goal.completed && onGoalComplete(goal.id)}
                disabled={goal.completed}
              >
                <CheckSquare className="h-5 w-5" />
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {goal.title}
                </p>
                {goal.description && (
                  <p className="text-sm text-gray-500">{goal.description}</p>
                )}
                {goal.completedAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    Completed {new Date(goal.completedAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No goals set yet. Create a goal to track your study progress!</p>
        </div>
      )}
    </div>
  );
};

export default GoalSetter;