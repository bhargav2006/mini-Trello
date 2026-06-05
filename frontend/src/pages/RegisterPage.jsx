import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Button from '../shared/Button';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register(formData.name.trim(), formData.email, formData.password, formData.role);
      toast.success('Registration successful! Welcome aboard.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error?.error ?? err.response?.data?.message ?? 'Registration failed';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'member', label: 'Workspace Member' },
    { value: 'admin', label: 'Board Administrator' },
  ];

  return (
    <AuthLayout>
      <div className="text-center md:text-left mb-6">
        <h2 className="text-2xl font-black font-display text-gray-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Join the collaborative digital board workspace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="John Doe"
          required
          icon={User}
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@company.com"
          required
          icon={Mail}
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            required
            icon={Lock}
            disabled={isLoading}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            required
            icon={Lock}
            disabled={isLoading}
          />
        </div>

        <Select
          label="Account Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roleOptions}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-6"
          isLoading={isLoading}
          icon={UserPlus}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-[#ef2b2d] hover:text-[#ef2b2d]/80 hover:underline transition-colors"
        >
          Sign In here
        </Link>
      </div>
    </AuthLayout>
  );
}
