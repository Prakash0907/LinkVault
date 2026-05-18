import React, { useState, useEffect, useContext } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BookmarkCard from '../components/BookmarkCard';
import SearchBar from '../components/SearchBar';
import AddBookmarkModal from '../components/AddBookmarkModal';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { bookmarks, fetchBookmarks, fetchCollections, searchBookmarks, collections } = useContext(BookmarkContext);
  const [activeCollection, setActiveCollection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    fetchBookmarks(activeCollection);
  }, [activeCollection, fetchBookmarks]);

  const handleSearch = (query) => {
    if (query) {
      searchBookmarks(query);
    } else {
      fetchBookmarks(activeCollection);
    }
  };

  const currentCollectionName = activeCollection
    ? collections.find((c) => c._id === activeCollection)?.name
    : 'All Bookmarks';

  return (
    <div className="flex flex-col h-screen bg-dark-900 text-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeCollection={activeCollection} setActiveCollection={setActiveCollection} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <h1 className="text-2xl font-bold text-white">{currentCollectionName}</h1>
              
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <SearchBar onSearch={handleSearch} />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary flex items-center space-x-2 whitespace-nowrap"
                >
                  <Plus size={20} />
                  <span>Add Bookmark</span>
                </button>
              </div>
            </div>

            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-dark-800 p-6 rounded-full mb-6">
                  <Plus size={48} className="text-gray-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-2">No bookmarks found</h2>
                <p className="text-gray-500 max-w-sm">
                  {activeCollection 
                    ? "This collection is empty. Click the button above to add your first bookmark."
                    : "You haven't saved any bookmarks yet. Start adding links to organize them here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bookmarks.map((bookmark) => (
                  <BookmarkCard key={bookmark._id} bookmark={bookmark} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <AddBookmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeCollection={activeCollection}
      />
    </div>
  );
}
