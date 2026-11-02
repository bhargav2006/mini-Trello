import React from 'react';
import { ClipboardList, Clock, Activity, CheckCircle, Percent } from 'lucide-react';

export default function AnalyticsSummary({ tasks }) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'inprogress').length;
  const completed = tasks.filter((t) => t.status === 'done').length;

  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ClipboardList,
      className: 'bg-surface-sunken text-textSecondary border-border',
      style: {
        backgroundColor: 'var(--color-surface-sunken)',
        color: 'var(--color-text-muted)',
        borderColor: 'var(--color-border)',
      }
    },
    {
      label: 'To Do',
      value: todo,
      icon: Clock,
      className: 'bg-warning-bg text-warning border-warning-border',
      style: {
        backgroundColor: 'var(--color-warning-bg)',
        color: 'var(--color-warning)',
        borderColor: 'var(--color-warning-border)',
      }
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Activity,
      className: 'bg-info-bg text-info border-info-border',
      style: {
        backgroundColor: 'var(--color-info-bg)',
        color: 'var(--color-info)',
        borderColor: 'var(--color-info-border)',
      }
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle,
      className: 'bg-success-bg text-success border-success-border',
      style: {
        backgroundColor: 'var(--color-success-bg)',
        color: 'var(--color-success)',
        borderColor: 'var(--color-success-border)',
      }
    },
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
              className="bg-surface rounded-xl border border-border p-4 shadow-card flex items-center gap-3.5 hover:scale-[1.01] transition-transform duration-200"
            >
              <div
                className={`p-2.5 rounded-lg border ${c.className}`}
                style={c.style}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">{c.label}</p>
                <p className="text-xl font-extrabold text-textPrimary mt-0.5">{c.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Rate Meter */}
      <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">
            Workspace Completion Rate
          </span>
          <span
            className="text-sm font-black text-primary"
            style={{ color: 'var(--color-primary)' }}
          >
            {rate}%
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2.5 bg-surface-sunken rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${rate}%`,
              backgroundColor: 'var(--color-primary)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
