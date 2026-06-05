import React from 'react';
import { ClipboardList, Clock, Activity, CheckCircle, Percent } from 'lucide-react';

export default function AnalyticsSummary({ tasks }) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'inprogress').length;
  const completed = tasks.filter((t) => t.status === 'done').length;

  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { label: 'Total Tasks', value: total, icon: ClipboardList, color: 'text-[#64748b] bg-gray-50 dark:bg-gray-800' },
    { label: 'To Do', value: todo, icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/10 border-amber-100 dark:border-amber-950/20' },
    { label: 'In Progress', value: inProgress, icon: Activity, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-950/20' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-950/20' },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-4 shadow-sm flex items-center gap-3.5 hover:scale-[1.01] transition-transform duration-200"
            >
              <div className={`p-2.5 rounded-lg border border-transparent ${c.color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">{c.label}</p>
                <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Rate Meter */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs font-bold text-[#64748b] dark:text-gray-400 uppercase tracking-wider">
            Workspace Completion Rate
          </span>
          <span className="text-sm font-black text-[#ef2b2d] dark:text-red-400">
            {rate}%
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ef2b2d] to-red-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${rate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
