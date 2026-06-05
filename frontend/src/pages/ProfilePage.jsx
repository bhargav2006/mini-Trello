import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { taskAPI } from '../services/api';
import Badge from '../shared/Badge';
import { Calendar, Mail, Shield, User, Loader2, Award, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Fetch user's assigned tasks
    taskAPI.getAll()
      .then((res) => {
        const list = res.data.tasks ?? res.data ?? [];
        // Filter by assignee
        const myTasks = list.filter((t) => {
          const assigneeId = t.assignee?._id ?? t.assignee;
          return assigneeId === user._id;
        });
        setUserTasks(myTasks);
      })
      .catch((err) => {
        console.error('Failed to load user tasks:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;

  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const todoCount = userTasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = userTasks.filter((t) => t.status === 'inprogress').length;
  const doneCount = userTasks.filter((t) => t.status === 'done').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="mb-6 text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          My Account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review profile details, permissions, and theme configurations
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/60 dark:border-gray-800/80 p-8 shadow-premium dark:shadow-premium-dark relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#ef2b2d]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#ef2b2d] text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shrink-0 select-none">
          {getInitials(user.name)}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left mt-2 space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <div className="mt-1 flex items-center justify-center md:justify-start gap-2 text-sm text-[#64748b] dark:text-gray-400">
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${
              user.role === 'admin'
                ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30'
                : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800/50'
            }`}>
              <Shield size={13} className="text-current" />
              <span>{user.role === 'admin' ? 'System Administrator' : 'Workspace Member'}</span>
            </span>

            {user.createdAt && (
              <span className="flex items-center gap-1.5 text-xs text-[#64748b] dark:text-gray-400">
                <Calendar size={13} />
                Joined {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid Settings & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left pane: Stats summary */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Productivity Dashboard */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/60 dark:border-gray-800/80 p-6 shadow-premium dark:shadow-premium-dark">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Award size={18} className="text-[#ef2b2d]" />
              Assigned Work Overview
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-[#ef2b2d] h-8 w-8" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 text-center">
                  <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{todoCount}</p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-450 uppercase tracking-wider mt-1">To Do</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 text-center">
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{inProgressCount}</p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-450 uppercase tracking-wider mt-1">In Progress</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 text-center">
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{doneCount}</p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-450 uppercase tracking-wider mt-1">Completed</p>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Task List */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/60 dark:border-gray-800/80 p-6 shadow-premium dark:shadow-premium-dark">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              My Task Board List
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="animate-spin text-[#ef2b2d]" />
              </div>
            ) : userTasks.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/10">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-450">
                  No tasks currently assigned to you.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {userTasks.map((t) => {
                  const statusColors = {
                    todo: 'yellow',
                    inprogress: 'blue',
                    done: 'green',
                  };

                  return (
                    <div
                      key={t._id}
                      className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-gray-50/30 dark:bg-gray-900/10 hover:border-gray-200 dark:hover:border-gray-700/60 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                          {t.title}
                        </p>
                        {t.dueDate && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 mt-1">
                            <Clock size={11} />
                            Due {new Date(t.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <Badge variant={statusColors[t.status] || 'gray'}>
                        {t.status === 'inprogress' ? 'In Progress' : t.status === 'todo' ? 'To Do' : 'Done'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right pane: Preferences */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200/60 dark:border-gray-800/80 p-6 shadow-premium dark:shadow-premium-dark h-fit space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              System Settings
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Customize workspace appearance
            </p>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Theme Preference
                </p>
                <p className="text-[11px] text-[#64748b] dark:text-gray-400 mt-0.5">
                  Currently: <span className="font-semibold uppercase text-[#ef2b2d]">{theme}</span>
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-all"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
