import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUser, updateUserRole } from '../../../services/user.service';
import toast from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    role: 'BUYER',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, fullName) => {
    if (!window.confirm(`¿Eliminar al usuario "${fullName}"?`)) return;
    try {
      await deleteUser(userId);
      toast.success('Usuario eliminado');
      loadUsers();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.userId);
    setEditForm({
      fullName: user.fullName || '',
      email: user.email || '',
      role: user.role || 'BUYER',
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({ fullName: '', email: '', role: 'BUYER' });
  };

  const handleSaveEdit = async (userId) => {
    try {
      await updateUser(userId, {
        fullName: editForm.fullName,
        email: editForm.email,
      });

      await updateUserRole(userId, { role: editForm.role });

      toast.success('Usuario actualizado correctamente');
      setEditingUserId(null);
      loadUsers();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      toast.error('Error al actualizar usuario');
    }
  };

  const getRoleBadgeClass = (role) => {
    const roleUpper = role?.toUpperCase() || 'BUYER';
    switch (roleUpper) {
      case 'ADMIN':
        return 'bg-orange-500/20 text-orange-400';
      case 'ORGANIZER':
        return 'bg-blue-500/20 text-blue-400';
      case 'BUYER':
      default:
        return 'bg-green-500/20 text-green-400';
    }
  };

  if (loading) return <p className="text-gray-400 text-center py-8">Cargando usuarios...</p>;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden mt-6">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Usuarios del Sistema</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => {
              const isEditing = editingUserId === user.userId;
              return (
                <tr key={user.userId} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="bg-white/10 text-white rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.fullName
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-white/10 text-white rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing ? (
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="bg-white/10 text-white rounded px-2 py-1"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="ORGANIZER">ORGANIZER</option>
                        <option value="BUYER">BUYER</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                        {user.role || 'BUYER'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSaveEdit(user.userId)}
                          className="text-green-400 hover:text-green-300 text-sm font-medium"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-400 hover:text-gray-300 text-sm font-medium"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-neon-blue hover:text-neon-blue/80 text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.userId, user.fullName)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;