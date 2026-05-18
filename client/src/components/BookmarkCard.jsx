import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function BookmarkCard({ bookmark }) {
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10"
    >
      <div className="h-40 bg-dark-900 relative overflow-hidden flex items-center justify-center">
        {bookmark.image ? (
          <img src={bookmark.image} alt={bookmark.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-600 flex flex-col items-center">
            <ExternalLink size={32} className="mb-2 opacity-50" />
            <span className="text-sm">No preview available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {bookmark.favicon ? (
            <img src={bookmark.favicon} alt="" className="w-4 h-4 rounded-sm" />
          ) : (
            <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
          )}
          <span className="text-xs text-gray-400 truncate">{getDomain(bookmark.url)}</span>
        </div>
        <h3 className="font-semibold text-gray-100 text-sm line-clamp-2 leading-tight mb-1 group-hover:text-primary-400 transition-colors">
          {bookmark.title || bookmark.url}
        </h3>
        {bookmark.description && (
          <p className="text-xs text-gray-500 line-clamp-2">{bookmark.description}</p>
        )}
      </div>
    </a>
  );
}
