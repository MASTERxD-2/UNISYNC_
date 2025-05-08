import React from 'react';

interface TaskCardProps {
  task: {
    event_id: number;
    task_title: string;
    description: string;
    due_date: string;
    end_time: string;
    location: string;
    event_type: string;
    is_recurring: boolean;
    recurrence_pattern: string | null;
    visibility: string;
    created_at: string;
  };
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="bg-white-100 shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.task_title}</h3>
        <button
          onClick={() => onDelete(task.event_id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.due_date}</p>
    </div>
  );
};

export default TaskCard;
