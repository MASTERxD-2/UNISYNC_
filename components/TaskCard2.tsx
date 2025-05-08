'use client';

interface Task {
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

export default function TaskCard2({ task }: { task: Task }) {
  const date = new Date(task.due_date).toLocaleDateString();
  const startTime = new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(task.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {/* Changed purple dot to gray */}
          <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
          <p className="text-lg font-bold text-gray-900">
            {task.task_title}
          </p>
        </div>
        <div className="dropdown relative inline-flex">
          <button
            type="button"
            data-target="dropdown-default"
            className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
              <path d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            id="dropdown-default"
            className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
            aria-labelledby="dropdown-default"
          >
            <ul className="py-2">
              <li>
                <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="#">
                  Edit
                </a>
              </li>
              <li>
                <a className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium" href="#">
                  Remove
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{task.description || 'No description available.'}</p>
      {/* Added time display after description */}
      <p className="text-sm text-gray-600 mt-2">
        Time: {startTime} - {endTime}
      </p>
    </div>
  );
}
