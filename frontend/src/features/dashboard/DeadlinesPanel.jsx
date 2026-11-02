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
    <div className="bg-surface rounded-xl border border-border p-5 shadow-card space-y-4">
      <div className="border-b border-border pb-3">
        <h3 className="text-xs font-bold text-textPrimary uppercase tracking-wider flex items-center gap-1.5">
          <Calendar size={14} className="text-primary" />
          Upcoming Deadlines
        </h3>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs font-semibold text-textSubtle">No active task deadlines</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 hide-scrollbar">
          {sortedTasks.slice(0, 6).map((t) => {
            const deadline = getDeadlineStatus(t.dueDate);
            return (
              <div
                key={t._id}
                className="p-3.5 rounded-lg border border-border bg-surface-sunken/40 hover:border-control-border transition-all flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-textPrimary truncate">
                    {t.title}
                  </p>
                  <p className="text-[10px] font-semibold text-textSubtle mt-1">
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
