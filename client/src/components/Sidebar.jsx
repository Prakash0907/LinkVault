import React, { useContext, useState } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';
import { Folder, Plus, LayoutGrid, Trash2 } from 'lucide-react';

export default function Sidebar({ activeCollection, setActiveCollection }) {
  const { collections, createCollection, deleteCollection } = useContext(BookmarkContext);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName);
      setNewCollectionName('');
      setIsCreating(false);
    }
  };

  const handleDeleteCollection = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this collection? All bookmarks inside will be permanently deleted.')) {
      if (activeCollection === id) {
        setActiveCollection(null);
      }
      await deleteCollection(id);
    }
  };

  return (
    <div className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Library</h2>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveCollection(null)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                activeCollection === null ? 'bg-primary-600/10 text-primary-500' : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
              }`}
            >
              <LayoutGrid size={18} />
              <span>All Bookmarks</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Collections</h2>
          <button onClick={() => setIsCreating(!isCreating)} className="text-gray-400 hover:text-primary-500 transition-colors">
            <Plus size={16} />
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreate} className="mb-4">
            <input
              type="text"
              autoFocus
              className="input-field text-xs py-1.5"
              placeholder="Collection name..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onBlur={() => setIsCreating(false)}
            />
          </form>
        )}

        <ul className="space-y-1">
          {collections.map((c) => (
            <li key={c._id} className="group relative">
              <button
                onClick={() => setActiveCollection(c._id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeCollection === c._id ? 'bg-primary-600/10 text-primary-500' : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
                }`}
              >
                <Folder size={18} />
                <span className="truncate pr-6">{c.name}</span>
              </button>
              <button
                onClick={(e) => handleDeleteCollection(e, c._id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-dark-700"
                title="Delete Collection"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
