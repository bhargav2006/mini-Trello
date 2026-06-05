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
      className="p-4 bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200/50 dark:border-gray-800/80 shadow-sm hover:shadow-premium dark:hover:shadow-premium-dark-hover transition-all duration-300 group cursor-grab active:cursor-grabbing flex flex-col gap-3"
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
            className="p-1 rounded text-[#64748b] hover:text-[#ef2b2d] hover:bg-[#ef2b2d]/5 transition-colors"
            title="Edit task card"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1 rounded text-[#64748b] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            title="Delete task card"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Main Task Info */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400/80 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Section: Due date & Assignee avatar */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800/80 mt-auto gap-4">
        
        {/* Due date badge */}
        <div className={`flex items-center gap-1 text-[10px] font-bold ${
          dueDateMeta.isWarning ? 'text-red-500' : 'text-[#64748b] dark:text-gray-450'
        }`}>
          <Calendar size={12} className="shrink-0" />
          <span>{dueDateMeta.text}</span>
        </div>

        {/* Assignee Avatar Badge */}
        <div className="relative group/assignee shrink-0 select-none">
          <div className="w-6.5 h-6.5 rounded-full bg-[#ef2b2d]/10 text-[#ef2b2d] dark:bg-[#ef2b2d]/25 dark:text-red-400 flex items-center justify-center text-[10px] font-black border border-[#ef2b2d]/15">
            {getAssigneeInitials(assigneeName)}
          </div>
          
          {/* Tooltip */}
          <span className="pointer-events-none absolute bottom-full right-0 mb-1.5 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-black px-2 py-1 text-[9px] font-bold text-white opacity-0 group-hover/assignee:opacity-100 transition-opacity shadow-lg z-20 border border-gray-800/30">
            {assigneeName}
          </span>
        </div>

      </div>
    </div>
  );
}
