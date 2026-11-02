import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { SocketProvider } from '../contexts/SocketContext';
import AppRoutes from '../routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            
            {/* Global notification alerts container */}
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'bg-surface text-textPrimary border border-border rounded-xl text-sm font-medium shadow-popover',
                duration: 3500,
                style: {
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }
              }}
            />

            {/* Application core routes */}
            <AppRoutes />

          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
