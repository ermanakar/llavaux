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
  const [isExhibitionEntered, setIsExhibitionEntered] = useState(false);
  const socket = useRef<Socket | null>(null);
  const imagesRef = useRef<ImageData[]>([]);
  const SWIPE_THRESHOLD = 50;
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001');
    socket.current.on('update_image', (data: ImageData) => {
      console.log('Received socket update:', data);
      setImages((prevImages) => {
        const imageExists = prevImages.some((image) => image.image_url === data.image_url);
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

  const handleEnterExhibition = () => {
    fetch('http://localhost:5001/api/images')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        if (data.length > 0) {
          setImages(data);
          setCurrentIterationIndex(data.length - 1);
          imagesRef.current = data;
        }
        setIsExhibitionEntered(true);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        alert(`Error fetching images: ${error.message}`);
      });
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIterationIndex(index);
    setIsThumbnailPanelOpen(false);
  };

  const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);
  const toggleThumbnailPanel = () => setIsThumbnailPanelOpen((prev) => !prev);

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
        {!isExhibitionEntered ? (
          <div className="exhibition-page__enter-button">
            <button onClick={handleEnterExhibition}>Enter Exhibition</button>
          </div>
        ) : (
          <>
            {currentImage && (
              <div
                className="exhibition-page__background"
                style={{
                  backgroundImage: `url(${currentImage.image_url})`,
                }}
              />
            )}
            <div
              className="exhibition-page__image-stage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {currentImage ? (
                <img
                  src={currentImage.image_url}
                  alt={`Iteration ${currentImage.iteration_number}`}
                />
              ) : (
                <div className="exhibition-page__waiting">Loading...</div>
              )}
            </div>
            <div
              className={classnames('exhibition-page__slider-container', {
                active: isThumbnailPanelOpen,
              })}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={classnames('exhibition-page__thumbnail', {
                    'exhibition-page__thumbnail--active':
                      index === currentIterationIndex,
                  })}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image.image_url}
                    alt={`Iteration ${image.iteration_number}`}
                  />
                  <div className="exhibition-page__thumbnail-iteration-number">
                    {image.iteration_number}
                  </div>
                </div>
              ))}
            </div>
            <button
              className={classnames('exhibition-page__read-more', {
                'exhibition-page__read-more--hidden': !isThumbnailPanelOpen,
              })}
              onClick={toggleThumbnailPanel}
            >
              {isThumbnailPanelOpen ? 'Close Thumbnails' : 'Show Thumbnails'}
            </button>
            <div
              className={classnames('exhibition-page__description-floating', {
                'exhibition-page__description-floating--expanded': isDescriptionExpanded,
              })}
            >
              <button
                className="exhibition-page__toggle-description"
                onClick={toggleDescription}
              >
                {isDescriptionExpanded ? 'Hide Description' : 'Description'}
              </button>
              {isDescriptionExpanded && (
                <div className="exhibition-page__full-description">
                  <h3>Description</h3>
                  <div className="exhibition-page__description-text">
                    <p>{currentImage?.description || 'No description available.'}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default ExhibitionPage;