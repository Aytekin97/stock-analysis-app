import React, { useState } from 'react';

function DocumentUploader({ handleDocumentUpload }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleDocumentUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      handleDocumentUpload(e.target.files[0]);
    }
  };

  return (
    <div className="upload-section">
      <h3>Upload a PDF Document</h3>
      
      {/* Container for drag & drop or manual file selection */}
      <form 
        className={`upload-container ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="pdf-upload"
          className="drag-drop-label"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p>Drag &amp; drop or <span>click</span> to upload</p>
        </label>
      </form>
    </div>
  );
}

export default DocumentUploader;
