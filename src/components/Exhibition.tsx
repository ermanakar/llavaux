import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import Header from './Header';
import Modal from './Modal';
import './Exhibition.css';
import classnames from 'classnames';

type ImageData = {
  iteration: number;
  image_url: string;
  description: string;
};

const ExhibitionPage: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isThumbnailPanelOpen, setIsThumbnailPanelOpen] = useState(false);
  const socket = useRef<Socket | null>(null);

  // Swipe detection settings
  const swipeThreshold = 50; // Minimum distance (in pixels) for a swipe gesture
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001');
    socket.current.on('update_image', (data: ImageData) => {
      setImages(prevImages => [...prevImages, data]);
      setCurrentIteration(data.iteration);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const handleThumbnailClick = (iteration: number) => {
    if (iteration > 0 && iteration <= images.length) {
      setCurrentIteration(iteration);
      setIsThumbnailPanelOpen(false); // Close the thumbnail panel on selection
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };

  const toggleThumbnailPanel = () => {
    setIsThumbnailPanelOpen(prev => !prev);
  };

  const currentImage = images.find(img => img.iteration === currentIteration);
  const getDescription = (description?: string) => {
    if (!description) return 'No description available';
    return isDescriptionExpanded || description.length <= 150 ? description : `${description.substring(0, 150)}...`;
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIteration < images.length) {
      handleThumbnailClick(currentIteration + 1);
    } else if (direction === 'right' && currentIteration > 1) {
      handleThumbnailClick(currentIteration - 1);
    }
  };

  // Detect swipe gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0); // Reset previous touch end position
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart - touchEnd > swipeThreshold) {
      handleSwipe('left');
    } else if (touchEnd - touchStart > swipeThreshold) {
      handleSwipe('right');
    }
  };

  const renderThumbnail = (img: ImageData) => (
    <button
      key={img.iteration}
      className={classnames('exhibition-page__thumbnail', {
        'exhibition-page__thumbnail--active': img.iteration === currentIteration,
      })}
      onClick={() => handleThumbnailClick(img.iteration)}
    >
      <img src={img.image_url} alt={`Thumbnail of iteration ${img.iteration}`} />
    </button>
  );

  return (
    <>
      <Header />
      <main className="exhibition-page">
        <div
          className="exhibition-page__image-stage"
          onClick={toggleThumbnailPanel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={currentImage?.image_url || 'https://via.placeholder.com/500'}
            alt={`Iteration ${currentIteration}`}
          />
          <div className="exhibition-page__image-description" onClick={toggleDescription}>
            {getDescription(currentImage?.description)}
            {currentImage?.description && currentImage.description.length > 150 && (
              <span className="exhibition-page__read-more">{isDescriptionExpanded ? 'Read less' : 'Read more'}</span>
            )}
          </div>
          <div className="exhibition-page__iteration-number">
            Iteration: {currentIteration}
          </div>
        </div>
        <div
          className={classnames('exhibition-page__slider-container', {
            'active': isThumbnailPanelOpen,
          })}
          onClick={e => e.stopPropagation()} // Prevents the slider container from propagating click to the image stage
        >
          {images.map(renderThumbnail)}
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onNext={() => handleThumbnailClick(currentIteration + 1)}
        onPrev={() => handleThumbnailClick(currentIteration - 1)}
      >
        <img
          src={currentImage?.image_url || 'https://via.placeholder.com/500'}
          alt={`Iteration ${currentIteration}`}
          style={{ width: '100%', maxHeight: '80vh' }}
        />
        <p>{getDescription(currentImage?.description)}</p>
      </Modal>
    </>
  );
};

export default ExhibitionPage;