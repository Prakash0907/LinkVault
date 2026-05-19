import React, { createContext, useState, useCallback } from 'react';
import api from '../services/api';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = useCallback(async (collectionId = '') => {
    setLoading(true);
    try {
      const url = collectionId ? `/bookmarks?collectionId=${collectionId}` : '/bookmarks';
      const res = await api.get(url);
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchBookmarks = async (query) => {
    setLoading(true);
    try {
      const res = await api.get(`/bookmarks/search?q=${query}`);
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = useCallback(async () => {
    try {
      const res = await api.get('/collections');
      setCollections(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveBookmark = async (url, collectionId) => {
    const res = await api.post('/bookmarks', { url, collectionId });
    setBookmarks((prev) => [res.data, ...prev]);
    return res.data;
  };

  const deleteBookmark = async (id) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const createCollection = async (name) => {
    const res = await api.post('/collections', { name });
    setCollections((prev) => [res.data, ...prev]);
  };

  const deleteCollection = async (id) => {
    try {
      await api.delete(`/collections/${id}`);
      setCollections((prev) => prev.filter((c) => c._id !== id));
      setBookmarks((prev) => prev.filter((b) => b.collectionId !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        collections,
        loading,
        fetchBookmarks,
        searchBookmarks,
        fetchCollections,
        saveBookmark,
        deleteBookmark,
        createCollection,
        deleteCollection,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

