import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-[#ef2b2d]" />
          <p className="text-sm font-semibold tracking-wider text-[#64748b] dark:text-gray-400 uppercase">
            Verifying Authority...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Show warning toast and redirect
    setTimeout(() => {
      toast.error('Access Denied: Admins Only', { id: 'admin-denied' });
    }, 0);
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
