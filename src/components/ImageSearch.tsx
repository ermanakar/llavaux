import React, { useState } from 'react';
import './ImageSearch.css';

interface ImageResult {
  id: number;
  job_id: string;
  iteration_number: number;
  timestamp: string;
  description: string;
  image_url: string;
  revised_prompt: string;
  title: string;
  tags: string;
  short_description: string;
}

const ImageSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ImageResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:5001/api/search?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="image-search-page">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for images"
        />
        <button className="cta-button" onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="results-list">
        {results.map((image) => (
          <div key={image.id} className="result-item">
            <img src={image.image_url} alt={image.description} onClick={() => openModal(image.image_url)} />
            <div className="description-container">
              <p>
                {expanded[image.id] ? image.description : `${image.description.slice(0, 100)}...`}
              </p>
              <button className="expand-button" onClick={() => toggleExpand(image.id)}>
                {expanded[image.id] ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Full screen" />
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
