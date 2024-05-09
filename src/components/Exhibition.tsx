import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import './Exhibition.css';

type ImageData = {
    iteration: number;
    image_url: string;
    description: string;
};

const ExhibitionPage: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [currentIteration, setCurrentIteration] = useState<number>(1);

    useEffect(() => {
        const socket = io('http://localhost:5001');

        const handleNewImage = (data: ImageData) => {
            setImages(prevImages => [...prevImages, data]);
            setCurrentIteration(data.iteration);  // Update to show the newest image
        };

        socket.on('update_image', handleNewImage);

        return () => {
            socket.off('update_image', handleNewImage);
            socket.disconnect();
        };
    }, []);

    const handleThumbnailClick = useCallback((iteration: number) => {
        setCurrentIteration(iteration);
    }, []);

    return (
        <>
            <Header />
            <div className="exhibition-page">
                <div className="image-stage">
                    {images.length > 0 ? (
                        <img src={images.find(img => img.iteration === currentIteration)?.image_url || 'https://via.placeholder.com/600'} 
                             alt={`Iteration ${currentIteration}`} />
                    ) : (
                        <img src="https://via.placeholder.com/600" alt="Waiting for images..." />
                    )}
                    <p className="image-description">
                        {images.find(img => img.iteration === currentIteration)?.description || 'Waiting for image descriptions...'}
                    </p>
                    <div className="iteration-number">Iteration: {currentIteration}</div>
                </div>
                <div className="slider-container">
                    {images.map((img, index) => (
                        <button key={index} className={`thumbnail ${img.iteration === currentIteration ? 'active' : ''}`} 
                                onClick={() => handleThumbnailClick(img.iteration)}>
                            <img src={img.image_url} alt={`Thumb ${img.iteration}`} />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ExhibitionPage;
