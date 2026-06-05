import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import Badge from '../../shared/Badge';

export default function DeadlinesPanel({ tasks }) {
  // Filter out completed tasks and tasks without due dates
  const activeTasks = tasks.filter((t) => t.status !== 'done' && t.dueDate);

  // Sort by date ascending (closest deadline first)
  const sortedTasks = [...activeTasks].sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const getDeadlineStatus = (dueDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dueDateStr);
    date.setHours(0, 0, 0, 0);

    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Overdue by ${Math.abs(diffDays)}d`, variant: 'red' };
    } else if (diffDays === 0) {
      return { label: 'Today', variant: 'yellow' };
    } else if (diffDays === 1) {
      return { label: 'Tomorrow', variant: 'blue' };
    } else {
      return { label: `${diffDays} days left`, variant: 'gray' };
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-sm space-y-4">
      <div className="border-b border-gray-150 dark:border-gray-800/80 pb-3">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Calendar size={14} className="text-[#ef2b2d]" />
          Upcoming Deadlines
        </h3>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs font-semibold text-gray-400">No active task deadlines</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 hide-scrollbar">
          {sortedTasks.slice(0, 6).map((t) => {
            const deadline = getDeadlineStatus(t.dueDate);
            return (
              <div
                key={t._id}
                className="p-3.5 rounded-lg border border-gray-100 dark:border-gray-800/60 bg-gray-50/20 dark:bg-gray-900/10 hover:border-gray-200 dark:hover:border-gray-700/60 transition-all flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                    {t.title}
                  </p>
                  <p className="text-[10px] font-semibold text-[#64748b] dark:text-gray-450 mt-1">
                    Due {new Date(t.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <Badge variant={deadline.variant}>
                  {deadline.label}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
