import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../shared/ThemeToggle";
import {
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserSquare2,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function MainLayout({ children }) {
  const { user, isAdmin, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // User Avatar Initial letter helper
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
      isActive
        ? "bg-[#ef2b2d]/10 text-[#ef2b2d] border-[#ef2b2d]/25 dark:bg-[#ef2b2d]/20 dark:border-[#ef2b2d]/30"
        : "text-gray-600 dark:text-gray-400 hover:text-[#ef2b2d] hover:bg-[#ef2b2d]/5 dark:hover:bg-[#ef2b2d]/10 hover:border-transparent border-transparent"
    }`;

  const mobileNavLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 border ${
      isActive
        ? "bg-[#ef2b2d]/10 text-[#ef2b2d] border-[#ef2b2d]/25 dark:bg-[#ef2b2d]/20 dark:border-[#ef2b2d]/30"
        : "text-gray-600 dark:text-gray-450 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#ef2b2d] border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-150 transition-colors duration-300">
      {/* Immersive radial glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ef2b2d]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Header */}
      <nav className="sticky top-0 z-40 w-full bg-white/70 dark:bg-[#111827]/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
            <div className="w-9 h-9 rounded-lg bg-[#ef2b2d] flex items-center justify-center font-display font-black text-white shadow-[0_0_15px_rgba(239,43,45,0.3)] transition-transform duration-300 group-hover:scale-105">
              KB
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-base font-display text-gray-900 dark:text-white">
                <span className="text-[#ef2b2d] font-normal">KB</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <NavLink to="/dashboard" className={navLinkStyle}>
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink to="/users" className={navLinkStyle}>
                <Users size={16} />
                Users
              </NavLink>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle className="shadow-sm border border-gray-200/50 dark:border-gray-800/40 bg-white/50 dark:bg-gray-900/50" />

            {/* Profile Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all border border-transparent hover:border-gray-200/40 dark:hover:border-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-[#ef2b2d] text-white flex items-center justify-center text-xs font-bold shadow-md">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#111827] rounded-xl border border-gray-200/60 dark:border-gray-800/80 shadow-2xl overflow-hidden animate-fade-in z-50">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800/80">
                      <p className="text-[10px] font-bold tracking-wider text-[#64748b] dark:text-gray-400 uppercase">
                        Signed In As
                      </p>
                      <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-1 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#64748b] dark:text-gray-400 truncate mt-0.5">
                        {user.email}
                      </p>
                      <div className="mt-2.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isAdmin
                              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
                              : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800/50"
                          }`}>
                          {isAdmin ? <ShieldCheck size={11} /> : null}
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1f2937]/50 hover:text-[#ef2b2d] dark:hover:text-white transition-colors">
                        <UserSquare2 size={16} className="text-gray-400" />
                        Profile Settings
                      </button>
                    </div>

                    <div className="border-t border-gray-150 dark:border-gray-800/80 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/40 bg-white dark:bg-[#111827] px-4 py-4 space-y-1.5 shadow-lg">
            <NavLink
              to="/dashboard"
              className={mobileNavLinkStyle}
              onClick={() => setMobileMenuOpen(false)}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/users"
                className={mobileNavLinkStyle}
                onClick={() => setMobileMenuOpen(false)}>
                <Users size={18} />
                Users
              </NavLink>
            )}
            <NavLink
              to="/profile"
              className={mobileNavLinkStyle}
              onClick={() => setMobileMenuOpen(false)}>
              <UserSquare2 size={18} />
              Profile Settings
            </NavLink>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Workspace Pages Container */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="animate-fade-in flex-1">{children}</div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200/50 dark:border-gray-800/40 text-center text-xs text-[#64748b] dark:text-gray-400 font-semibold shrink-0">
          © 2026 All rights reserved.
        </footer>
      </main>
    </div>
  );
}
