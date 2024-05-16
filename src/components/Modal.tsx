import React, { useEffect } from 'react';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
};

const Modal = ({ isOpen, onClose, children, onNext, onPrev }: ModalProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">Close</button>
        <button onClick={onPrev} className="modal-nav-button left">Prev</button>
        <button onClick={onNext} className="modal-nav-button right">Next</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
