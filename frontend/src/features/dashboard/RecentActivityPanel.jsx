import React from 'react';
import useActivity from '../../hooks/useActivity';
import { Activity, Clock, Trash } from 'lucide-react';

export default function RecentActivityPanel() {
  const { activities, clearActivities } = useActivity();

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200/50 dark:border-gray-800/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-800/80 pb-3">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={14} className="text-[#ef2b2d]" />
          Recent Activity
        </h3>
        {activities.length > 0 && (
          <button
            onClick={clearActivities}
            className="text-[10px] font-bold text-[#64748b] hover:text-[#ef2b2d] dark:hover:text-red-400 transition-colors uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs font-semibold text-gray-400">No recent workspace actions</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1 hide-scrollbar">
          {activities.map((a) => {
            // Pick dot color based on action type
            const typeColor = {
              create: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
              update: 'bg-blue-500 shadow-[0_0_8px_#3b82f6]',
              delete: 'bg-red-500 shadow-[0_0_8px_#ef4444]',
              system: 'bg-gray-400 dark:bg-gray-500 shadow-sm',
            };

            const timeStr = new Date(a.time).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={a.id} className="flex gap-3 text-xs leading-relaxed">
                {/* Timeline Node dot */}
                <div className="mt-1.5 shrink-0">
                  <div className={`w-2 h-2 rounded-full ${typeColor[a.type] || typeColor.system}`} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 dark:text-gray-300 font-medium break-words">
                    {a.text}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#64748b] dark:text-gray-505 mt-1">
                    <Clock size={9} />
                    {timeStr}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
