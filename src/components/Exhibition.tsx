import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import Header from './Header';
import Modal from './Modal';
import SEO from './SEO';
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

  const swipeThreshold = 50;
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001');
    socket.current.on('update_image', (data: ImageData) => {
      setImages((prevImages) => [...prevImages, data]);
      setCurrentIteration(data.iteration);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const handleThumbnailClick = (iteration: number) => {
    if (iteration > 0 && iteration <= images.length) {
      setCurrentIteration(iteration);
      setIsThumbnailPanelOpen(false);
    }
  };

  const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);
  const toggleThumbnailPanel = () => setIsThumbnailPanelOpen((prev) => !prev);

  const getDescription = (description?: string) => {
    if (!description) return 'No description available';
    return isDescriptionExpanded || description.length <= 150
      ? description
      : `${description.substring(0, 150)}...`;
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIteration < images.length) {
      handleThumbnailClick(currentIteration + 1);
    } else if (direction === 'right' && currentIteration > 1) {
      handleThumbnailClick(currentIteration - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (touchStart - touchEnd > swipeThreshold) handleSwipe('left');
    else if (touchEnd - touchStart > swipeThreshold) handleSwipe('right');
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

  const currentImage = images.find((img) => img.iteration === currentIteration);

  return (
    <>
      <SEO 
        title="Exhibition - AI Art by Obelix" 
        description="Explore the AI-generated art exhibition by Obelix, showcasing the intersection of AI and human creativity."
        keywords="AI art, AI exhibition, Obelix, AI creativity, AI and art"
        author="Obelix"
      />
      <Header />
      <main className="exhibition-page">
        <div
          className="exhibition-page__image-stage"
          onClick={toggleThumbnailPanel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {currentImage ? (
            <>
              <img src={currentImage.image_url} alt={`Iteration ${currentIteration}`} />
              <div className="exhibition-page__image-description" onClick={toggleDescription}>
                {getDescription(currentImage.description)}
                {currentImage.description.length > 150 && (
                  <span className="exhibition-page__read-more">
                    {isDescriptionExpanded ? 'Read less' : 'Read more'}
                  </span>
                )}
              </div>
              <div className="exhibition-page__iteration-number">
                Iteration: {currentIteration}
              </div>
            </>
          ) : (
            <div className="exhibition-page__waiting">
              Waiting for images...
            </div>
          )}
        </div>
        <div
          className={classnames('exhibition-page__slider-container', { active: isThumbnailPanelOpen })}
          onClick={(e) => e.stopPropagation()}
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
        {currentImage ? (
          <>
            <img src={currentImage.image_url} alt={`Iteration ${currentIteration}`} style={{ width: '100%', maxHeight: '80vh' }} />
            <p>{getDescription(currentImage.description)}</p>
          </>
        ) : (
          <div>Waiting for images...</div>
        )}
      </Modal>
    </>
  );
};

export default ExhibitionPage;
