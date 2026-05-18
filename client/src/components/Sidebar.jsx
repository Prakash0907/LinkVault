import React, { useContext, useState } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';
import { Folder, Plus, LayoutGrid } from 'lucide-react';

export default function Sidebar({ activeCollection, setActiveCollection }) {
  const { collections, createCollection } = useContext(BookmarkContext);
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
            <li key={c._id}>
              <button
                onClick={() => setActiveCollection(c._id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeCollection === c._id ? 'bg-primary-600/10 text-primary-500' : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
                }`}
              >
                <Folder size={18} />
                <span className="truncate">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
