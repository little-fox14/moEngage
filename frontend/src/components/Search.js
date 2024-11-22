import React, { useState, useEffect } from 'react';
import axios from 'axios';

const httpCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
  300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404,
  405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
  421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503,
  504, 505, 506, 507, 508, 510, 511
];

const httpCodeImages = httpCodes.reduce((acc, code) => {
  acc[code] = `https://http.dog/${code}.jpg`;
  return acc;
}, {});

const Search = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter) {
      const regex = new RegExp(`^${filter.replace(/x/g, '\\d')}`);
      const filteredCodes = httpCodes.filter(code => regex.test(code.toString()));
      const filteredImages = filteredCodes.map(code => ({ code, image: httpCodeImages[code] }));
      setResults(filteredImages);
    } else {
      setResults([]);
    }
  }, [filter]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('List name is required.');
      return;
    }
    if (results.length === 0) {
      setError('No HTTP codes to save. Please filter and try again.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const responseCodes = results.map(result => result.code);
      const imageLinks = results.map(result => result.image);
      const creationDate = new Date().toISOString();

      await axios.post('http://localhost:8000/api/lists', { name, creationDate, responseCodes, imageLinks });
      alert('List saved successfully!');
      window.location.href = '/lists';
    } catch (err) {
      console.error('Error saving list:', err);
      setError('An error occurred while saving. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Search HTTP Codes</h1>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by code"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          {results.map((result) => (
            <img key={result.code} src={result.image} alt={result.code} className="w-full h-auto rounded" />
          ))}
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="List Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
        >
          Save List
        </button>
      </div>
    </div>
  );
};

export default Search;
