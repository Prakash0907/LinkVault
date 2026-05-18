import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Bookmark } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-primary-500">
        <Bookmark size={24} />
        <span className="text-xl font-bold text-white tracking-wide">LinkVault</span>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Welcome, {user.name}</span>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      )}
    </nav>
  );
}
