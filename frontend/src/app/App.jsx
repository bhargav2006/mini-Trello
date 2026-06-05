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
                className: 'bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-150 border border-gray-100 dark:border-gray-800 rounded-xl text-sm font-medium shadow-lg',
                duration: 3500,
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
