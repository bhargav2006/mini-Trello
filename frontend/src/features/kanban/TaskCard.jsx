import React from 'react';
import Badge from '../../shared/Badge';
import { Calendar, Edit3, Trash2, Clock } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { _id, title, description, status, priority, assignee, dueDate } = task;

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', _id);
    e.dataTransfer.setData('fromStatus', status);
  };

  const getAssigneeInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPriorityVariant = (pri) => {
    const maps = { high: 'red', medium: 'yellow', low: 'green' };
    return maps[pri] || 'gray';
  };

  const getDueDateStatus = (dateStr) => {
    if (!dateStr) return { text: 'No due date', isWarning: false };
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diff = date - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0 && status !== 'done') {
      return { text: `Overdue by ${Math.abs(days)}d`, isWarning: true };
    } else if (days === 0 && status !== 'done') {
      return { text: 'Today', isWarning: true };
    } else {
      return { text: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), isWarning: false };
    }
  };

  const dueDateMeta = getDueDateStatus(dueDate);
  const assigneeName = assignee?.name ?? 'Unassigned';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-4 bg-surface rounded-xl border border-border shadow-card hover:border-primary/40 hover:shadow-popover transition-all duration-300 group cursor-grab active:cursor-grabbing flex flex-col gap-3"
    >
      {/* Top Section: Priority and Controls */}
      <div className="flex items-center justify-between gap-4">
        <Badge variant={getPriorityVariant(priority)}>
          {priority}
        </Badge>
        
        {/* Actions (visible on hover) */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded text-textSecondary hover:text-primary hover:bg-surface-sunken transition-colors"
            title="Edit task card"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1 rounded text-textSecondary hover:text-error hover:bg-error-bg transition-colors"
            title="Delete task card"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Main Task Info */}
      <div>
        <h4 className="text-sm font-bold text-textPrimary leading-snug">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-textSecondary mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Section: Due date & Assignee avatar */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto gap-4">
        
        {/* Due date badge */}
        <div className={`flex items-center gap-1 text-[10px] font-bold ${
          dueDateMeta.isWarning ? 'text-error' : 'text-textSubtle'
        }`}>
          <Calendar size={12} className="shrink-0" />
          <span>{dueDateMeta.text}</span>
        </div>

        {/* Assignee Avatar Badge */}
        <div className="relative group/assignee shrink-0 select-none">
          <div className="w-6.5 h-6.5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-black border border-primary/25">
            {getAssigneeInitials(assigneeName)}
          </div>
          
          {/* Tooltip */}
          <span className="pointer-events-none absolute bottom-full right-0 mb-1.5 whitespace-nowrap rounded-lg bg-surface border border-border px-2 py-1 text-[9px] font-bold text-textPrimary opacity-0 group-hover/assignee:opacity-100 transition-opacity shadow-popover z-20">
            {assigneeName}
          </span>
        </div>

      </div>
    </div>
  );
}
