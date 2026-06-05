import React, { useState, useEffect } from 'react';
import Modal from '../../shared/Modal';
import Input from '../../shared/Input';
import Select from '../../shared/Select';
import Button from '../../shared/Button';
import { userAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function TaskDialog({
  isOpen,
  onClose,
  task,
  defaultStatus = 'todo',
  onSave,
}) {
  const isEdit = !!task;

  // Form states
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'medium',
    assignee: '',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users list for assigning tasks
  useEffect(() => {
    if (!isOpen) return;

    setLoadingUsers(true);
    userAPI.getAll()
      .then((res) => {
        const list = res.data.users ?? res.data ?? [];
        setUsers(list);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        toast.error('Failed to load users for assignee options');
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, [isOpen]);

  // Sync state with task details when editing
  useEffect(() => {
    if (isEdit && task) {
      const assigneeId = task.assignee?._id ?? task.assignee ?? '';
      setForm({
        title: task.title ?? '',
        description: task.description ?? '',
        status: task.status ?? defaultStatus,
        priority: task.priority ?? 'medium',
        assignee: assigneeId,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        status: defaultStatus,
        priority: 'medium',
        assignee: '',
        dueDate: '',
      });
    }
    setErrors({});
  }, [task, isEdit, defaultStatus, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Task title is required';
    if (!form.assignee) errs.assignee = 'Assignee is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
        priority: form.priority,
        assignee: form.assignee,
        dueDate: form.dueDate || undefined,
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const assigneeOptions = [
    { value: '', label: 'Select Assignee' },
    ...users.map((u) => ({ value: u._id, label: u.name })),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Workspace Task' : 'Create Task Card'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input
          label="Task Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Analyze metrics, design grids..."
          required
          disabled={isSubmitting}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold tracking-wider text-[#64748b] dark:text-gray-400 uppercase">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Add structured details regarding the task goals..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef2b2d]/30 bg-transparent text-gray-900 dark:text-gray-100 resize-none focus:border-[#ef2b2d] dark:focus:border-[#ef2b2d]"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Board Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={statusOptions}
            disabled={isSubmitting}
          />

          <Select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            options={priorityOptions}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            error={errors.assignee}
            options={assigneeOptions}
            required
            disabled={isSubmitting || loadingUsers}
          />

          <Input
            label="Due Date"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-6">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
