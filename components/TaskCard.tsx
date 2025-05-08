// components/TaskCard.tsx
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
  
  export default function TaskCard({ task, onDelete, onUpdate }: { task: Task, onDelete: (id: number) => void, onUpdate: (task: Task) => void }) {
    return (
      <div key={task.event_id} className="p-6 rounded-xl bg-white shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
          </div>
          <div className="dropdown relative inline-flex">
            <button
              type="button"
              data-target={`dropdown-${task.event_id}`}
              className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-sky-400"
              onClick={e => {
                e.preventDefault();
                const menu = document.getElementById(`dropdown-${task.event_id}`);
                if (menu) menu.classList.toggle('hidden');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="4"
                viewBox="0 0 12 4"
                fill="none"
              >
                <path
                  d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              id={`dropdown-${task.event_id}`}
              className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden"
              aria-labelledby={`dropdown-${task.event_id}`}
            >
              <ul className="py-2">
                <li>
                  <button
                    className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium w-full text-left"
                    onClick={() => { onUpdate(task); document.getElementById(`dropdown-${task.event_id}`)?.classList.add('hidden'); }}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium w-full text-left"
                    onClick={() => { onDelete(task.event_id); document.getElementById(`dropdown-${task.event_id}`)?.classList.add('hidden'); }}
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.task_title}</h3>
        <p className="text-base font-medium text-gray-900">
              {new Date(task.due_date).toLocaleDateString()} -{" "}
              {new Date(task.due_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(task.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
        <p className="text-sm text-gray-600 mb-2">{task.description || "No description available."}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p> {task.location}</p>
          <p>{task.event_type}</p>
          {task.is_recurring && <p> {task.recurrence_pattern}</p>}
          <p>Visibility: {task.visibility}</p>
        </div>
      </div>
    );
  }
