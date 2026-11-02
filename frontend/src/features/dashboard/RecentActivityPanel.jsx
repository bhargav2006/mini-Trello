import React from 'react';
import useActivity from '../../hooks/useActivity';
import { Activity, Clock } from 'lucide-react';

export default function RecentActivityPanel() {
  const { activities, clearActivities } = useActivity();

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
        <h3 className="text-xs font-bold text-textPrimary uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={14} className="text-primary" />
          Recent Activity
        </h3>
        {activities.length > 0 && (
          <button
            onClick={clearActivities}
            className="text-[10px] font-bold text-textSecondary hover:text-primary transition-colors uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs font-semibold text-textSubtle">No recent workspace actions</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1 hide-scrollbar">
          {activities.map((a) => {
            // Pick dot color based on action type
            const typeColor = {
              create: 'bg-success shadow-[0_0_8px_var(--color-success)]',
              update: 'bg-info shadow-[0_0_8px_var(--color-info)]',
              delete: 'bg-error shadow-[0_0_8px_var(--color-error)]',
              system: 'bg-textSubtle shadow-sm',
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
                  <p className="text-textPrimary font-medium break-words">
                    {a.text}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-textSubtle mt-1">
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
