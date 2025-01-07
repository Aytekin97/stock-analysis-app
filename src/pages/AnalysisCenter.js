import React, { useState } from 'react';
import '../styles/AnalysisCenter.css';

const companies = [
  { company: 'Tesla'},
  { company: 'Apple'},
  { company: 'Amazon'},
  { company: 'Google'},
  { company: 'Microsoft'},
  { company: 'Netflix'}
];

const AnalysisCenter = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [uploadDocument, setUploadDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [preProcessedData, setPreProcessedData] = useState(null);
  const [error, setError] = useState(null);

  const handleDocumentUpload = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      const { url } = await response.json();
      setDocumentUrl(url);
      await preprocessDocument(url);

    } catch (error) {
      setError(error.message);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const preprocessDocument = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/preprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to preprocess document');
      }

      const data = await response.json();
      setPreProcessedData(data);

    } catch (error) {
      setError(error.message);
      console.error("Preprocessing error:", error);
    } finally {
      setLoading(false);
    }
  };

  const performAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: selectedCompany,
          documentData: preProcessedData || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze data');
      }

      const result = await response.json();
      console.log("Analysis result:", result);

    } catch (error) {
      setError(error.message);
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Analysis Center</h1>
      <p>Select a company and optionally upload a document for analysis.</p>

      {!selectedCompany && (
        <div className="company-grid">
          {companies.map((company) => (
            <div
              key={company.company}
              className='company-box'
              onClick={() => setSelectedCompany(company.company)}
            >
              <h3>{company.company}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedCompany && !uploadDocument && (
        <div className="upload-option">
          <h3>Selected Company: {selectedCompany}</h3>
          <p>Do you want to upload a document?</p>
          <button onClick={() => setUploadDocument(true)}>Yes</button>
          <button onClick={performAnalysis}>No</button>
        </div>
      )}

      {uploadDocument && !documentUrl && (
        <div className="upload-container">
          <h3>Upload a PDF Document</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files[0] && handleDocumentUpload(e.target.files[0])}
          />
        </div>
      )}

      {documentUrl && !preProcessedData && loading && <p>Processing document...</p>}

      {preProcessedData && (
        <div className="analysis-option">
          <p>Document preprocessed successfully. Ready for analysis.</p>
          <button onClick={performAnalysis}>Perform Analysis</button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default AnalysisCenter;
