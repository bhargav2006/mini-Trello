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
        ? "bg-primary-container text-on-primary-container border-primary/25 font-bold shadow-sm"
        : "text-textSecondary hover:text-textPrimary hover:bg-surface-sunken border-transparent"
    }`;

  const mobileNavLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 border ${
      isActive
        ? "bg-primary-container text-on-primary-container border-primary/25 font-bold shadow-sm"
        : "text-textSecondary hover:bg-surface-sunken hover:text-textPrimary border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-bg text-textPrimary transition-colors duration-300">
      {/* Immersive radial glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Header */}
      <nav className="sticky top-0 z-40 w-full bg-surface/85 backdrop-blur-md border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo Section with Circular Personal Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border shadow-sm group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/bhargav-kb-logo-circular.png"
                alt="KB Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-base font-display text-textPrimary">
                <span className="text-primary font-bold">KB</span> <span className="font-semibold">Task Board</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <NavLink
              to="/dashboard"
              className={navLinkStyle}
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: 'var(--color-primary-container)',
                      color: 'var(--color-on-primary-container)',
                      borderColor: 'rgba(66, 148, 106, 0.4)',
                    }
                  : {}
              }>
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/users"
                className={navLinkStyle}
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: 'var(--color-primary-container)',
                        color: 'var(--color-on-primary-container)',
                        borderColor: 'rgba(66, 148, 106, 0.4)',
                      }
                    : {}
                }>
                <Users size={16} />
                Users
              </NavLink>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Profile Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-surface-sunken transition-all border border-transparent hover:border-border">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-primary, #0F766E)',
                      color: '#FFFFFF',
                    }}>
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-textPrimary ml-1">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface rounded-xl border border-border shadow-popover overflow-hidden animate-fade-in z-50">
                    <div className="px-5 py-4 border-b border-border">
                      <p className="text-[10px] font-bold tracking-wider text-textSecondary uppercase">
                        Signed In As
                      </p>
                      <p className="text-sm font-extrabold text-textPrimary mt-1 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-textSecondary truncate mt-0.5">
                        {user.email}
                      </p>
                      <div className="mt-2.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isAdmin
                              ? "bg-primary-container text-on-primary-container border-primary/20"
                              : "bg-surface-sunken text-textSecondary border-border"
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
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-textPrimary hover:bg-surface-sunken hover:text-primary transition-colors">
                        <UserSquare2 size={16} className="text-textSecondary" />
                        Profile Settings
                      </button>
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-error hover:bg-error-bg transition-colors">
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
              className="md:hidden p-2 rounded-lg text-textSecondary hover:bg-surface-sunken">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface px-4 py-4 space-y-1.5 shadow-popover">
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-error hover:bg-error-bg transition-colors">
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
        <footer className="mt-12 pt-6 border-t border-border text-center text-xs text-textSubtle font-semibold shrink-0">
          © 2026 KB Task Board · Powered by Verdant & Obsidian Global Design System.
        </footer>
      </main>
    </div>
  );
}
