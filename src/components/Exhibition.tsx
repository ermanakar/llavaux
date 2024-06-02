import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import Header from './Header';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Exhibition.css';
import classnames from 'classnames';

type ImageData = {
  iteration_number: number;
  image_url: string;
  description: string;
  revised_prompt: string;
  timestamp: string;
};

const ExhibitionPage: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIterationIndex, setCurrentIterationIndex] = useState<number>(-1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isThumbnailPanelOpen, setIsThumbnailPanelOpen] = useState(false);
  const socket = useRef<Socket | null>(null);
  const imagesRef = useRef<ImageData[]>([]);
  const SWIPE_THRESHOLD = 50;
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/images')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (data.length > 0) {
          setImages(data);
          setCurrentIterationIndex(data.length - 1);
          imagesRef.current = data;
        }
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001');
    socket.current.on('update_image', (data: ImageData) => {
      console.log('Received socket update:', data);
      setImages((prevImages) => {
        const imageExists = prevImages.some(image => image.image_url === data.image_url);
        if (!imageExists) {
          const newImages = [...prevImages, data];
          imagesRef.current = newImages;
          setCurrentIterationIndex(newImages.length - 1);
          return newImages;
        }
        return prevImages;
      });
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleThumbnailClick = (index: number) => {
    setCurrentIterationIndex(index);
    setIsThumbnailPanelOpen(false);
  };

  const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);
  const toggleThumbnailPanel = () => setIsThumbnailPanelOpen((prev) => !prev);

  const getDescription = (description?: string) => {
    if (!description) return 'No description available.';
    return isDescriptionExpanded ? description : `${description.substring(0, 100)}...`;
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = event.touches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > SWIPE_THRESHOLD) {
      handleNextIteration();
    } else if (distance < -SWIPE_THRESHOLD) {
      handlePreviousIteration();
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const handleNextIteration = () => {
    if (currentIterationIndex < images.length - 1) {
      setCurrentIterationIndex((prev) => prev + 1);
    }
  };

  const handlePreviousIteration = () => {
    if (currentIterationIndex > 0) {
      setCurrentIterationIndex((prev) => prev - 1);
    }
  };

  const currentImage = images[currentIterationIndex];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Exhibition Page</title>
      </Helmet>
      <Header />
      <div className="exhibition-page">
        {currentImage && (
          <div
            className="exhibition-page__background"
            style={{ backgroundImage: `url(${currentImage.image_url})` }}
          />
        )}
        <div className="exhibition-page__image-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          {currentImage ? (
            <>
              <img src={currentImage.image_url} alt={`Iteration ${currentImage.iteration_number}`} />
              <div className="exhibition-page__image-description" onClick={toggleDescription}>
                <p>{getDescription(currentImage.description)}</p>
              </div>
            </>
          ) : (
            <div className="exhibition-page__waiting">Loading...</div>
          )}
        </div>
        <div className={classnames('exhibition-page__slider-container', { 'active': isThumbnailPanelOpen })}>
          {images.map((image, index) => (
            <div
              key={index}
              className={classnames('exhibition-page__thumbnail', { 'exhibition-page__thumbnail--active': index === currentIterationIndex })}
              onClick={() => handleThumbnailClick(index)}>
              <img src={image.image_url} alt={`Iteration ${image.iteration_number}`} />
              <div className="exhibition-page__thumbnail-iteration-number">
                {image.iteration_number}
              </div>
            </div>
          ))}
        </div>
        <button className="exhibition-page__read-more" onClick={toggleThumbnailPanel}>
          {isThumbnailPanelOpen ? 'Close Thumbnails' : 'Show Thumbnails'}
        </button>
      </div>
    </HelmetProvider>
  );
};

export default ExhibitionPage;
