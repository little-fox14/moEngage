import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch lists from the API
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/lists');
        setLists(response.data);
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Failed to fetch lists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/lists/${id}`);
      setLists(lists.filter((list) => list._id !== id));
      if (selectedList && selectedList._id === id) {
        setSelectedList(null);
        setShow(false);
      }
    } catch (err) {
      console.error('Error deleting list:', err);
      setError('Failed to delete list. Please try again later.');
    }
  };

  // View images in a list
  const handleViewImages = (list) => {
    setSelectedList(list);
    setShow(true);
  };

  // Remove an image from the list
  const handleRemoveImage = (index) => {
    const updatedList = { ...selectedList };
    updatedList.imageLinks.splice(index, 1);
    updatedList.responseCodes.splice(index, 1);
    setSelectedList(updatedList);
  };

  // Save the updated list
  const saveUpdatedList = async () => {
    try {
      await axios.put(`http://localhost:8000/api/lists/${selectedList._id}`, selectedList);
      setLists(lists.map((list) => (list._id === selectedList._id ? selectedList : list)));
      setShow(false);
    } catch (err) {
      console.error('Error saving list:', err);
      setError('Failed to save list. Please try again later.');
    }
  };

  

  
  return (
    <div className="min-h-screen bg-grey-100 p-4">
      <div className="max-w-2xl mx-auto bg-grey p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Saved Lists</h1>
        <ul className="space-y-4">
          {lists.map((list) => (
            <li key={list._id} className="flex justify-between items-center p-4 border border-gray-300 rounded hover:bg-gray-50">
              <div>
                <span className="text-lg font-medium">{list.name}</span>
                <br />
                <span className="text-sm text-gray-500">Created on: {new Date(list.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleViewImages(list)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                >
                  View Images
                </button>
                <button
                  onClick={() => handleDelete(list._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {show && selectedList && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">{selectedList.name}</h2>
            <div className="text-sm text-gray-500 mb-4">Created on: {new Date(selectedList.createdAt).toLocaleDateString()}</div>
            <div className="grid grid-cols-2 gap-4">
              {selectedList.imageLinks.map((link, index) => (
                <div key={index} className="relative">
                  <img
                    src={link}
                    alt={`Response code ${selectedList.responseCodes[index]}`}
                    className="w-full h-auto rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={saveUpdatedList}
              className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
