import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useTasks from '../hooks/useTasks';
import useUsers from '../hooks/useUsers';
import KanbanColumn from '../features/kanban/KanbanColumn';
import TaskDialog from '../features/kanban/TaskDialog';
import AnalyticsSummary from '../features/dashboard/AnalyticsSummary';
import RecentActivityPanel from '../features/dashboard/RecentActivityPanel';
import DeadlinesPanel from '../features/dashboard/DeadlinesPanel';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Badge from '../shared/Badge';
import { Search, Plus, SlidersHorizontal, ShieldCheck, User, X, AlertTriangle, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const { allUsers } = useUsers();

  // Task custom hook
  const {
    tasks,
    allTasks,
    loading,
    search,
    setSearch,
    priority,
    setPriority,
    assignee,
    setAssignee,
    dueDateFrom,
    setDueDateFrom,
    dueDateTo,
    setDueDateTo,
    clearFilters,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTasks();

  // Dialog / Overlays state
  const [activeTask, setActiveTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('todo');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Form submit wrapper
  const handleSaveTask = async (payload) => {
    if (activeTask) {
      await updateTask(activeTask._id, payload);
    } else {
      await createTask(payload);
    }
  };

  const handleOpenCreateDialog = (status) => {
    setActiveTask(null);
    setDefaultStatus(status);
    setTaskDialogOpen(true);
  };

  const handleOpenEditDialog = (task) => {
    setActiveTask(task);
    setTaskDialogOpen(true);
  };

  const handleOpenDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteExecute = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete._id);
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  // Date formatter helper
  const getCurrentDate = () => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Filter counters
  const isFiltered = !!(search || priority || assignee || dueDateFrom || dueDateTo);

  // Split tasks by status columns
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'inprogress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  // Priorities list options for filtering
  const priorityFilterOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ];

  // Assignees options list for filtering
  const assigneeFilterOptions = [
    { value: '', label: 'All Assignees' },
    ...allUsers.map((u) => ({ value: u._id, label: u.name })),
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/40 dark:border-gray-800/40 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Workspace Dashboard
          </h1>
          <p className="text-xs font-semibold text-[#64748b] dark:text-gray-400 mt-1 flex items-center gap-1">
            <span>{getCurrentDate()}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>Welcome back, {user?.name}</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Badge variant={isAdmin ? 'red' : 'gray'}>
              {isAdmin ? 'Admin' : 'Member'}
            </Badge>
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => handleOpenCreateDialog('todo')}
          icon={Plus}
        >
          New Task Card
        </Button>
      </div>

      {/* 2. Analytics Summary Grid */}
      <AnalyticsSummary tasks={allTasks} />

      {/* 3. Main Split workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left/Center Area: Kanban workspace */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-4 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              
              {/* Left search */}
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  icon={Search}
                />
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowFilters((prev) => !prev)}
                  icon={SlidersHorizontal}
                >
                  Filters
                </Button>

                {isFiltered && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-red-500 hover:text-red-650 transition-colors uppercase tracking-wider"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Expandable Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 animate-fade-in">
                <Select
                  label="Priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  options={priorityFilterOptions}
                />
                
                <Select
                  label="Assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  options={assigneeFilterOptions}
                />

                <Input
                  label="Due From"
                  type="date"
                  value={dueDateFrom}
                  onChange={(e) => setDueDateFrom(e.target.value)}
                />

                <Input
                  label="Due To"
                  type="date"
                  value={dueDateTo}
                  onChange={(e) => setDueDateTo(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Kanban Board Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 bg-white dark:bg-[#111827]/30 border border-gray-200/50 dark:border-gray-800/80 rounded-2xl">
              <Loader2 className="animate-spin text-[#ef2b2d] h-9 w-9" />
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Syncing board cards...</p>
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
              <KanbanColumn
                id="todo"
                title="To Do"
                tasks={todoTasks}
                onEditTask={handleOpenEditDialog}
                onDeleteTask={handleOpenDeleteConfirm}
                onAddTask={handleOpenCreateDialog}
                onMoveTask={moveTask}
                emptyIcon="📋"
                emptyText="No tasks pending"
              />

              <KanbanColumn
                id="inprogress"
                title="In Progress"
                tasks={inProgressTasks}
                onEditTask={handleOpenEditDialog}
                onDeleteTask={handleOpenDeleteConfirm}
                onAddTask={handleOpenCreateDialog}
                onMoveTask={moveTask}
                emptyIcon="⚡"
                emptyText="No active tasks"
              />

              <KanbanColumn
                id="done"
                title="Done"
                tasks={doneTasks}
                onEditTask={handleOpenEditDialog}
                onDeleteTask={handleOpenDeleteConfirm}
                onAddTask={handleOpenCreateDialog}
                onMoveTask={moveTask}
                emptyIcon="✅"
                emptyText="All tasks completed!"
              />
            </div>
          )}
        </div>

        {/* Right Side Panel: Activity, Upcoming Deadlines, and Quick Actions */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Board Workspace Actions
            </h3>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenCreateDialog('todo')}
                className="w-full text-left justify-start"
              >
                + Create Board Task
              </Button>
            </div>
          </div>

          {/* Deadlines list */}
          <DeadlinesPanel tasks={allTasks} />

          {/* Activity Panel */}
          <RecentActivityPanel />
          
        </div>
      </div>

      {/* Task Creation / Editing Dialog Modal */}
      <TaskDialog
        isOpen={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        task={activeTask}
        defaultStatus={defaultStatus}
        onSave={handleSaveTask}
      />

      {/* Task Deletion Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Delete Board Card"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-650 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Delete "{taskToDelete?.title}"?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                This action is permanent and will remove this card immediately from all board members. This cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-6">
            <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteExecute}>
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
