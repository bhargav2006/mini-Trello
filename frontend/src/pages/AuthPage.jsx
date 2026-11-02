import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../services/api";
import Input from "../shared/Input";
import Select from "../shared/Select";
import Button from "../shared/Button";
import ThemeToggle from "../shared/ThemeToggle";
import AmbientRibbonBackground from "../shared/AmbientRibbonBackground";
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AuthPage({ initialMode = "login" }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'login' or 'register'
  const [mode, setMode] = useState(() => {
    if (location.pathname === "/register") return "register";
    if (location.pathname === "/login") return "login";
    return initialMode;
  });

  // Synchronize mode when browser URL/history changes
  useEffect(() => {
    if (location.pathname === "/register" && mode !== "register") {
      setMode("register");
    } else if (location.pathname === "/login" && mode !== "login") {
      setMode("login");
    }
  }, [location.pathname, mode]);

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    navigate(newMode === "register" ? "/register" : "/login", { replace: false });
  };

  // =====================
  // LOGIN FORM STATE
  // =====================
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (loginErrors[name]) setLoginErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateLogin = () => {
    const errs = {};
    if (!loginData.email) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!loginData.password) {
      errs.password = "Password is required";
    }
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoginLoading(true);
    try {
      const { data } = await authAPI.login(loginData.email, loginData.password);
      const { token, user } = data;
      login(token, user);
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error?.error ??
        err.response?.data?.message ??
        "Incorrect email or password";
      toast.error(msg);
    } finally {
      setIsLoginLoading(false);
    }
  };

  // =====================
  // REGISTER FORM STATE
  // =====================
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    if (registerErrors[name])
      setRegisterErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateRegister = () => {
    const errs = {};
    if (!registerData.name.trim()) errs.name = "Full name is required";
    if (!registerData.email) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!registerData.password) {
      errs.password = "Password is required";
    } else if (registerData.password.length < 6) {
      errs.password = "Password must be at least 6 characters long";
    }
    if (registerData.password !== registerData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    setRegisterErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsRegisterLoading(true);
    try {
      await register(
        registerData.name.trim(),
        registerData.email,
        registerData.password,
        registerData.role
      );
      toast.success("Registration successful! Welcome aboard.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error?.error ??
        err.response?.data?.message ??
        "Registration failed";
      toast.error(msg);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const roleOptions = [
    { value: "member", label: "Workspace Member" },
    { value: "admin", label: "Board Administrator" },
  ];

  const isRegister = mode === "register";

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-bg text-textPrimary transition-colors duration-300 overflow-x-hidden">
      {/* 3D Flowing Ambient Ribbon Background Canvas */}
      <AmbientRibbonBackground />

      {/* Atmospheric ambient lighting glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle className="shadow-md border border-border bg-surface/85 backdrop-blur-md" />
      </div>

      {/* ========================================================
          SLIDING DUAL-PANEL AUTH CONTAINER
          Desktop: 50/50 animated sliding panels
          - Login Mode: Form on RIGHT, Showcase on LEFT
          - Click Register: Form moves RIGHT-TO-LEFT to left side!
          - Click Login: Form moves LEFT-TO-RIGHT back to right side!
          ======================================================== */}
      <div className="relative w-full max-w-[1060px] min-h-[640px] rounded-3xl overflow-hidden border border-border bg-surface/90 backdrop-blur-xl shadow-2xl z-10 my-8">
        
        {/* DESKTOP VIEWPORT (> md): True 2-Way Sliding Motion */}
        <div className="hidden md:block relative w-full min-h-[640px]">
          
          {/* ==================================================
              PANEL 1: THE BRANDING / SHOWCASE PANEL (50% Width)
              Moves from LEFT to RIGHT when switching to Register
              ================================================== */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 p-10 lg:p-14 flex flex-col justify-between bg-surface-sunken/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
              isRegister
                ? "translate-x-full border-l border-border"
                : "translate-x-0 border-r border-border"
            }`}
          >
            {/* Grid background simulation */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Glowing Accent Dots */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)] animate-pulse-subtle pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary/60 rounded-full shadow-[0_0_15px_var(--color-primary)] animate-float pointer-events-none" />

            {/* Top Brand Logo */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border shadow-md shrink-0">
                <img
                  src="/assets/bhargav-kb-logo-circular.png"
                  alt="KB Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-lg text-textPrimary tracking-tight font-display">
                <span className="text-primary font-bold">KB</span> Task Board
              </span>
            </div>

            {/* Dynamic Center Content based on Mode */}
            <div className="my-auto py-8 relative z-10 transition-opacity duration-500">
              {!isRegister ? (
                /* LOGIN SHOWCASE */
                <div className="animate-fade-in">
                  <h1 className="text-3xl lg:text-4xl font-black font-display leading-tight tracking-tight text-textPrimary">
                    Build Your{" "}
                    <span
                      className="font-black"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      Workspace
                    </span>
                  </h1>
                  <p className="mt-4 text-textSecondary text-sm leading-relaxed">
                    Collaborate, organize, and deliver work with a clean
                    real-time task board built for modern agile teams.
                  </p>

                  {/* Micro stats banner */}
                  <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
                    <div>
                      <p className="text-[11px] font-semibold text-textSubtle uppercase tracking-wider">
                        Speed
                      </p>
                      <p className="text-lg font-bold font-display mt-0.5 text-primary">
                        Real-time
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-textSubtle uppercase tracking-wider">
                        Sync
                      </p>
                      <p className="text-lg font-bold font-display mt-0.5 text-textPrimary">
                        Instant
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-textSubtle uppercase tracking-wider">
                        Design
                      </p>
                      <p className="text-lg font-bold font-display mt-0.5 text-tertiary">
                        Verdant
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Prompt to slide to Register */}
                  <div className="mt-8 p-4 rounded-xl bg-surface/70 border border-border">
                    <p className="text-xs text-textSecondary">
                      Don't have an account yet?
                    </p>
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                      <span>Create your account</span>
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                /* REGISTER SHOWCASE */
                <div className="animate-fade-in">
                  <h1 className="text-3xl lg:text-4xl font-black font-display leading-tight tracking-tight text-textPrimary">
                    Join the{" "}
                    <span
                      className="font-black"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      Collective
                    </span>
                  </h1>
                  <p className="mt-4 text-textSecondary text-sm leading-relaxed">
                    Set up your member profile or administrator account to manage
                    sprints, track project velocity, and sync board state instantly.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-textSecondary">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>Live WebSocket synchronization across all boards</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-textSecondary">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>Admin and Member role-based access control</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-textSecondary">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>Verdant Signal & Obsidian Forest dual themes</span>
                    </div>
                  </div>

                  {/* Quick Action Prompt to slide to Login */}
                  <div className="mt-8 p-4 rounded-xl bg-surface/70 border border-border">
                    <p className="text-xs text-textSecondary">
                      Already registered with us?
                    </p>
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors group cursor-pointer"
                    >
                      <span>Sign in to your workspace</span>
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Copyright */}
            <div className="text-xs text-textSubtle mt-auto relative z-10">
              © {new Date().getFullYear()} KB Task Board. All rights reserved.
            </div>
          </div>

          {/* ==================================================
              PANEL 2: THE FORM PANEL (50% Width)
              - In Login: Sits on RIGHT (translateX(100%))
              - In Register: Moves from RIGHT to LEFT (translateX(0%))
              Smooth, hardware-accelerated 60fps sliding motion!
              ================================================== */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 p-8 lg:p-14 flex flex-col justify-center bg-surface transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 overflow-y-auto ${
              isRegister ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Slideable Form Container */}
            <div className="w-full max-w-md mx-auto">
              {!isRegister ? (
                /* ========================
                   LOGIN FORM
                   ======================== */
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-black font-display text-textPrimary">
                      Sign In
                    </h2>
                    <p className="text-sm text-textSecondary mt-1">
                      Access your digital board workspace to sync tasks
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      error={loginErrors.email}
                      placeholder="email@company.com"
                      required
                      icon={Mail}
                      disabled={isLoginLoading}
                    />

                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      error={loginErrors.password}
                      placeholder="••••••••"
                      required
                      icon={Lock}
                      disabled={isLoginLoading}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full mt-2"
                      loading={isLoginLoading}
                      icon={LogIn}
                      style={{
                        backgroundColor: "var(--color-primary, #0F766E)",
                        color: "#FFFFFF",
                      }}
                    >
                      Sign In
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-xs text-textSecondary border-t border-border pt-4">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className="font-bold text-primary hover:underline hover:text-primary-hover transition-colors cursor-pointer ml-1"
                    >
                      Register here
                    </button>
                  </div>
                </div>
              ) : (
                /* ========================
                   REGISTER FORM
                   ======================== */
                <div className="animate-fade-in">
                  <div className="mb-5">
                    <h2 className="text-2xl lg:text-3xl font-black font-display text-textPrimary">
                      Create Account
                    </h2>
                    <p className="text-sm text-textSecondary mt-0.5">
                      Join the collaborative digital board workspace
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    <Input
                      label="Full Name"
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      error={registerErrors.name}
                      placeholder="John Doe"
                      required
                      icon={User}
                      disabled={isRegisterLoading}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      error={registerErrors.email}
                      placeholder="email@company.com"
                      required
                      icon={Mail}
                      disabled={isRegisterLoading}
                    />

                    <Select
                      label="Workspace Role"
                      name="role"
                      value={registerData.role}
                      onChange={handleRegisterChange}
                      options={roleOptions}
                      disabled={isRegisterLoading}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        error={registerErrors.password}
                        placeholder="••••••••"
                        required
                        icon={Lock}
                        disabled={isRegisterLoading}
                      />

                      <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        error={registerErrors.confirmPassword}
                        placeholder="••••••••"
                        required
                        icon={Lock}
                        disabled={isRegisterLoading}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full mt-2"
                      loading={isRegisterLoading}
                      icon={UserPlus}
                      style={{
                        backgroundColor: "var(--color-primary, #0F766E)",
                        color: "#FFFFFF",
                      }}
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className="mt-5 text-center text-xs text-textSecondary border-t border-border pt-3.5">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="font-bold text-primary hover:underline hover:text-primary-hover transition-colors cursor-pointer ml-1"
                    >
                      Sign in here
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE VIEWPORT (< md): Smooth Carousel Slide Transition
            Maintains the same right-to-left and left-to-right gesture!
            ======================================================== */}
        <div className="block md:hidden p-6 sm:p-8">
          {/* Mobile Top Brand Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border shadow-sm shrink-0">
                <img
                  src="/assets/bhargav-kb-logo-circular.png"
                  alt="KB Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-base text-textPrimary tracking-tight font-display">
                <span className="text-primary font-bold">KB</span> Task Board
              </span>
            </div>

            {/* Mobile Mode Switch Pill */}
            <div className="flex rounded-lg bg-surface-sunken p-1 border border-border text-xs font-bold">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`px-3 py-1 rounded-md transition-all ${
                  !isRegister
                    ? "bg-primary text-white shadow-sm"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`px-3 py-1 rounded-md transition-all ${
                  isRegister
                    ? "bg-primary text-white shadow-sm"
                    : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Carousel for Mobile */}
          <div className="overflow-hidden w-full relative">
            <div
              className={`flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isRegister ? "-translate-x-1/2" : "translate-x-0"
              }`}
            >
              {/* Slide 1: Login */}
              <div className="w-1/2 pr-3">
                <div className="mb-5">
                  <h2 className="text-2xl font-black font-display text-textPrimary">
                    Sign In
                  </h2>
                  <p className="text-xs text-textSecondary mt-1">
                    Access your digital board workspace to sync tasks
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    error={loginErrors.email}
                    placeholder="email@company.com"
                    required
                    icon={Mail}
                    disabled={isLoginLoading}
                  />

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    error={loginErrors.password}
                    placeholder="••••••••"
                    required
                    icon={Lock}
                    disabled={isLoginLoading}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    loading={isLoginLoading}
                    icon={LogIn}
                    style={{
                      backgroundColor: "var(--color-primary, #0F766E)",
                      color: "#FFFFFF",
                    }}
                  >
                    Sign In
                  </Button>
                </form>

                <div className="mt-5 text-center text-xs text-textSecondary border-t border-border pt-3">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-bold text-primary hover:underline hover:text-primary-hover cursor-pointer ml-1"
                  >
                    Register here
                  </button>
                </div>
              </div>

              {/* Slide 2: Register */}
              <div className="w-1/2 pl-3">
                <div className="mb-4">
                  <h2 className="text-2xl font-black font-display text-textPrimary">
                    Create Account
                  </h2>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Join the collaborative digital board workspace
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    error={registerErrors.name}
                    placeholder="John Doe"
                    required
                    icon={User}
                    disabled={isRegisterLoading}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    error={registerErrors.email}
                    placeholder="email@company.com"
                    required
                    icon={Mail}
                    disabled={isRegisterLoading}
                  />

                  <Select
                    label="Workspace Role"
                    name="role"
                    value={registerData.role}
                    onChange={handleRegisterChange}
                    options={roleOptions}
                    disabled={isRegisterLoading}
                  />

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    error={registerErrors.password}
                    placeholder="••••••••"
                    required
                    icon={Lock}
                    disabled={isRegisterLoading}
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    error={registerErrors.confirmPassword}
                    placeholder="••••••••"
                    required
                    icon={Lock}
                    disabled={isRegisterLoading}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    loading={isRegisterLoading}
                    icon={UserPlus}
                    style={{
                      backgroundColor: "var(--color-primary, #0F766E)",
                      color: "#FFFFFF",
                    }}
                  >
                    Create Account
                  </Button>
                </form>

                <div className="mt-4 text-center text-xs text-textSecondary border-t border-border pt-3">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-bold text-primary hover:underline hover:text-primary-hover cursor-pointer ml-1"
                  >
                    Sign in here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
