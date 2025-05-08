interface Task {
    task_id: number; // Added task_id here
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
  }
  
  interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void; // Ensure onDelete expects task_id
  }
  
  const TaskCard3: React.FC<TaskCardProps> = ({ task, onDelete }) => {
    const { task_id, task_title, description, due_date, event_type, location, visibility } = task;
  
    return (
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{task_title}</h2>
          <button
            onClick={() => onDelete(task_id)} // Pass task_id to onDelete
            className="text-red-600 hover:text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <strong>Due Date:</strong> {new Date(due_date).toLocaleString()}
          </p>
          <p>
            <strong>Event Type:</strong> {event_type}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Visibility:</strong> {visibility}
          </p>
        </div>
        {task.is_recurring && (
          <div className="mt-2 text-sm text-blue-600">
            <strong>Recurring Task:</strong> Yes (Pattern: {task.recurrence_pattern || "N/A"})
          </div>
        )}
      </div>
    );
  };
  
  export default TaskCard3;
  