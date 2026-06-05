import { useState, useEffect, useCallback, useMemo } from 'react';
import { taskAPI } from '../services/api';
import { useSocket } from '../contexts/SocketContext';
import toast from 'react-hot-toast';

export default function useTasks() {
  const { socket } = useSocket();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering state
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDateFrom, setDueDateFrom] = useState('');
  const [dueDateTo, setDueDateTo] = useState('');

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await taskAPI.getAll();
      // Backend returns an array or an object with tasks array
      const tasksList = data.tasks ?? data ?? [];
      setTasks(tasksList);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to load tasks from server');
    } finally {
      setLoading(false);
    }
  }, []);

  // Lifecycle
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Socket.IO event handler sync
  useEffect(() => {
    if (!socket) return;

    const handleCreated = (task) => {
      setTasks((prev) => {
        if (prev.some((t) => t._id === task._id)) return prev;
        return [task, ...prev];
      });
    };

    const handleUpdated = (task) => {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    };

    const handleDeleted = (data) => {
      const deletedId = data._id || data;
      setTasks((prev) => prev.filter((t) => t._id !== deletedId));
    };

    socket.on('taskCreated', handleCreated);
    socket.on('taskUpdated', handleUpdated);
    socket.on('taskDeleted', handleDeleted);

    return () => {
      socket.off('taskCreated', handleCreated);
      socket.off('taskUpdated', handleUpdated);
      socket.off('taskDeleted', handleDeleted);
    };
  }, [socket]);

  // Actions
  const createTask = async (taskData) => {
    try {
      const { data } = await taskAPI.create(taskData);
      const newTask = data.task ?? data;
      setTasks((prev) => {
        if (prev.some((t) => t._id === newTask._id)) return prev;
        return [newTask, ...prev];
      });
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      const msg = err.response?.data?.error?.error ?? err.response?.data?.message ?? 'Failed to create task';
      toast.error(msg);
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await taskAPI.update(id, taskData);
      const updatedTask = data.task ?? data;
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      const msg = err.response?.data?.error?.error ?? err.response?.data?.message ?? 'Failed to update task';
      toast.error(msg);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  // Drag and Drop Status updater
  const moveTask = async (taskId, newStatus) => {
    // Optimistic Update for smoother UI
    const originalTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      const { data } = await taskAPI.update(taskId, { status: newStatus });
      const updatedTask = data.task ?? data;
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));
    } catch (err) {
      // Revert state on failure
      setTasks(originalTasks);
      const msg = err.response?.data?.error?.error ?? 'Failed to update task status';
      toast.error(msg);
    }
  };

  // Reset Filters
  const clearFilters = () => {
    setSearch('');
    setPriority('');
    setAssignee('');
    setDueDateFrom('');
    setDueDateTo('');
  };

  // Memoized Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch = !search || t.title?.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase());
      const matchPriority = !priority || t.priority === priority;
      
      const taskAssigneeId = t.assignee?._id ?? t.assignee;
      const matchAssignee = !assignee || taskAssigneeId === assignee;

      let matchDate = true;
      if (t.dueDate) {
        const dDate = t.dueDate.slice(0, 10); // YYYY-MM-DD
        if (dueDateFrom && dDate < dueDateFrom) matchDate = false;
        if (dueDateTo && dDate > dueDateTo) matchDate = false;
      } else if (dueDateFrom || dueDateTo) {
        matchDate = false;
      }

      return matchSearch && matchPriority && matchAssignee && matchDate;
    });
  }, [tasks, search, priority, assignee, dueDateFrom, dueDateTo]);

  return {
    allTasks: tasks,
    tasks: filteredTasks,
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
    refetch: fetchTasks,
  };
}
