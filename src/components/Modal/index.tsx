import React from 'react';
import './styles.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

export function Modal({ show, onClose, children }: ModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
