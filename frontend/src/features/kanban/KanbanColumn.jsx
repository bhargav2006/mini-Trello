import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

export default function KanbanColumn({
  id,
  title,
  tasks = [],
  onEditTask,
  onDeleteTask,
  onAddTask,
  onMoveTask,
  emptyIcon: EmptyIcon,
  emptyText,
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('taskId');
    const fromStatus = e.dataTransfer.getData('fromStatus');

    if (!taskId || fromStatus === id) return;
    onMoveTask(taskId, id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col flex-1 min-w-[280px] bg-surface border rounded-2xl p-4 shadow-card transition-all duration-200 h-[640px]
        ${isDragOver 
          ? 'border-primary bg-primary/5 scale-[0.995] border-dashed border-2' 
          : 'border-border'
        }
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold text-textPrimary uppercase tracking-wider">
            {title}
          </h3>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-surface-sunken text-textSecondary border border-border">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(id)}
          className="p-1.5 rounded-lg text-textSecondary hover:text-primary hover:bg-surface-sunken transition-colors"
          title={`Add task to ${title}`}
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Column Body / Cards List */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 hide-scrollbar">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-surface-sunken/30">
            <span className="text-3xl filter grayscale opacity-45 select-none mb-2">
              {EmptyIcon}
            </span>
            <p className="text-xs font-bold text-textSubtle">
              {emptyText}
            </p>
            <button
              onClick={() => onAddTask(id)}
              className="mt-3.5 text-xs text-primary hover:text-primary-hover font-bold border border-border hover:border-primary/40 px-3 py-1.5 rounded-lg bg-surface shadow-sm transition-colors"
            >
              + Add Task
            </button>
          </div>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
