import React, { useState } from 'react';
import axios from 'axios';

const HOld = () => {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/url', { url });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting URL:', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <form onSubmit={handleSubmit}>
        <label className="block text-lg font-medium mb-2">Enter Preview URL:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://localhost:3000"
          className="w-full border px-3 py-2 rounded shadow-sm"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save URL
        </button>
      </form>
      {submitted && <p className="mt-4 text-green-600">✅ URL submitted successfully!</p>}
    </div>
  );
};

export default HOld;
