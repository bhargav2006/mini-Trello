import { useState, useEffect, useCallback, useMemo } from 'react';
import { userAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.getAll();
      const usersList = data.users ?? data ?? [];
      setUsers(usersList);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id) => {
    try {
      await userAPI.delete(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success('User removed from workspace');
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Failed to delete user';
      toast.error(msg);
      throw err;
    }
  };

  const addUser = async (userData) => {
    try {
      const { data } = await authAPI.register(
        userData.name,
        userData.email,
        userData.password,
        userData.role
      );
      const newUser = data.user ?? data;
      setUsers((prev) => [newUser, ...prev]);
      toast.success(`${newUser.name} added successfully`);
      return newUser;
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Failed to add user';
      toast.error(msg);
      throw err;
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const query = search.toLowerCase();
      return (
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  return {
    users: filteredUsers,
    allUsers: users,
    loading,
    search,
    setSearch,
    deleteUser,
    addUser,
    refetch: fetchUsers,
  };
}
