import React, { useState } from 'react';
import Header from './Header'; 
import './Exhibition.css'; 

const ExhibitionPage: React.FC = () => {
    const totalIterations = 10;
    const [currentIteration, setCurrentIteration] = useState(totalIterations);
    const [imageData, setImageData] = useState({
        imageUrl: 'https://via.placeholder.com/800', // Use a placeholder image
        description: `Description for iteration ${currentIteration}`
    });

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const iterationNumber = parseInt(event.target.value, 10);
        setCurrentIteration(iterationNumber);
        setImageData({
            imageUrl: 'https://via.placeholder.com/800', // Keep using the placeholder for all iterations for now
            description: `Description for iteration ${iterationNumber}`
        });
    };

    return (
        <>
            <Header />
            <div className="exhibition-page">
                <div className="image-stage">
                    <img src={imageData.imageUrl} alt={`Iteration ${currentIteration}`} />
                    <p className="image-description">{imageData.description}</p>
                    <div className="iteration-number">Iteration: {currentIteration}</div>
                </div>
                <div className="slider-container">
                    {Array.from({ length: totalIterations }, (_, index) => (
                        <button key={index} className={`thumbnail ${index + 1 === currentIteration ? 'active' : ''}`} onClick={() => handleSliderChange({ target: { value: index + 1 } } as any)}>
                            <img src="https://via.placeholder.com/100" alt={`Thumb ${index + 1}`} />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ExhibitionPage;
