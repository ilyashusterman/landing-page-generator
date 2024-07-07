import React, { useState, useEffect, useRef } from "react";
import "./PreviewModal.css"; // Import CSS for styling

const PreviewModal = ({ preview, index, previews, lastPreviewRef }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);
  return (
    <div className="preview-thumbnail">
      <iframe
        srcDoc={preview.html}
        title={`preview-${index}`}
        ref={index === previews.length - 1 ? lastPreviewRef : null}
      />
      <button onClick={openModal}>View Larger</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <iframe
              id="large-image"
              srcDoc={preview.html}
              title={`preview-modal-${index}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewModal;
