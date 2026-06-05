import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import { useAuth } from '../contexts/AuthContext';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Badge from '../shared/Badge';
import Modal from '../shared/Modal';
import { Search, Plus, Trash2, Shield, User, Mail, Calendar, Key, AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const { users, allUsers, loading, search, setSearch, addUser, deleteUser } = useUsers();
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state for creating user
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminCount = allUsers.filter((u) => u.role === 'admin').length;
  const memberCount = allUsers.filter((u) => u.role === 'member').length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await addUser(form);
      setIsAddModalOpen(false);
      setForm({ name: '', email: '', password: '', role: 'member' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteConfirm = (user) => {
    if (user._id === currentUser._id) {
      toast.error("You cannot delete your own account");
      return;
    }
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    try {
      await deleteUser(selectedUser._id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleOptions = [
    { value: 'member', label: 'Workspace Member' },
    { value: 'admin', label: 'Board Administrator' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Title section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            User Workspace
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Audit team members, assign administrative roles, and manage credentials
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          icon={Plus}
        >
          Add Team Member
        </Button>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-premium dark:shadow-premium-dark flex items-center gap-4">
          <div className="p-3.5 rounded-lg bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-100 dark:border-gray-700/50">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">Total Users</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{allUsers.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-premium dark:shadow-premium-dark flex items-center gap-4">
          <div className="p-3.5 rounded-lg bg-red-50 text-red-500 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">Admins</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{adminCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-premium dark:shadow-premium-dark flex items-center gap-4">
          <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">Members</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{memberCount}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-4 shadow-sm max-w-md">
        <Input
          placeholder="Search team members by name/email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
      </div>

      {/* Responsive table for desktop/tablet, card list for mobile */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/50 dark:border-gray-800/80 shadow-premium dark:shadow-premium-dark overflow-hidden">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-[#ef2b2d] h-8 w-8" />
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading user profiles...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-semibold text-gray-500">No workspace users found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900/40 text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/60">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Workspace Role</th>
                    <th className="px-6 py-4">Joined Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-medium text-gray-700 dark:text-gray-300">
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-gray-50/50 dark:hover:bg-[#1f2937]/25 transition-all"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                        {u.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#64748b] dark:text-gray-400">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={u.role === 'admin' ? 'red' : 'gray'}>
                          {u.role === 'admin' ? 'Admin' : 'Member'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-[#64748b] dark:text-gray-400">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openDeleteConfirm(u)}
                          disabled={u._id === currentUser?._id}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          title="Delete user profile"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800/60">
              {users.map((u) => (
                <div key={u._id} className="p-5 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-base font-bold text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <Mail size={12} />
                        {u.email}
                      </p>
                    </div>
                    <Badge variant={u.role === 'admin' ? 'red' : 'gray'}>
                      {u.role === 'admin' ? 'Admin' : 'Member'}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs border-t border-gray-50 dark:border-gray-800/40">
                    <span className="flex items-center gap-1 text-[#64748b] dark:text-gray-400 font-semibold">
                      <Calendar size={12} />
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </span>
                    <button
                      onClick={() => openDeleteConfirm(u)}
                      disabled={u._id === currentUser?._id}
                      className="p-2 text-red-500 bg-red-50 dark:bg-red-950/20 rounded-lg hover:bg-red-100 disabled:opacity-35 disabled:cursor-not-allowed transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Team Member"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="Jane Doe"
            required
            icon={User}
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="jane@company.com"
            required
            icon={Mail}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Min 6 characters"
            required
            icon={Key}
          />
          <Select
            label="System Role"
            name="role"
            value={form.role}
            onChange={handleInputChange}
            options={roleOptions}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-6">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Add User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove User"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-650 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Are you sure you want to delete {selectedUser?.name}?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                This account will be permanently removed from the collaborative board. Any tasks assigned to them will remain, but assignee information will be lost.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-6">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} isLoading={isSubmitting}>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
