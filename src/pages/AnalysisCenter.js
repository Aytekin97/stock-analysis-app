import React, { useState } from 'react';
import '../styles/AnalysisCenter.css';
import DocumentUploader from '../components/DocumentUploader';


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
  const [analysisUrl, setAnalysisUrl] = useState(null)

  const handleDocumentUpload = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('company_name', selectedCompany);
    

    try {
      const response = await fetch('https://pdf-upload-services-production.up.railway.app/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      const { file_url, message } = await response.json();
      
      if (response.status === 200) {
          // File uploaded successfully; preprocess it
          setDocumentUrl(file_url); // Save file URL
          await preprocessDocument(file_url); // Call preprocessing function
      } else if (response.status === 409) {
          // File already exists in S3; set preProcessedData to true
          console.log(message); // Log the server message for debugging
          setPreProcessedData(true); // Show preProcessedData section
      }

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
      const response = await fetch('https://document-pre-processing-services-production.up.railway.app/api/preprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_url: url, // Include file URL
          company_name: selectedCompany, // Include company name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to preprocess document');
      }

      const data = await response.json();
      console.log(data)
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
      const encodedCompanyName = encodeURIComponent(selectedCompany); // Encode company name to handle special characters
      const response = await fetch(`https://equity-research-report-generator-production.up.railway.app/api/generate-analysis?company_name=${encodedCompanyName}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to analyze data');
      }

      const result = await response.json();
      console.log("Analysis result:", result);
      const { pdf_url } = result;

      if (pdf_url) {
          setAnalysisUrl(pdf_url); // Save the S3 URL for download
      } else {
          throw new Error('PDF URL not found in response');
      }

    } catch (error) {
      setError(error.message);
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setError(null);
    setSelectedCompany(null);
    setUploadDocument(false);
    setDocumentUrl(null);
    setPreProcessedData(null);
    // etc.
  };

  return (
    <div>
      <div className='header-area'>
        <h1>Analysis Center</h1>
        <p>Select a company and optionally upload a document for analysis.</p>
      </div>

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

      {selectedCompany && !uploadDocument && !analysisUrl && (
        <div className="upload-option">
          <h3>Selected Company: {selectedCompany}</h3>
          <p>Do you want to upload a document?</p>
          <div className="button-group">
            <button onClick={() => setUploadDocument(true)} className="yes-button">Yes</button>
            <button onClick={performAnalysis} className="no-button">No</button>
          </div>
        </div>
      )}

      {uploadDocument && !documentUrl && (
        <DocumentUploader handleDocumentUpload={handleDocumentUpload} />
      )}

      {documentUrl && !preProcessedData && loading && <p>Processing document...</p>}

      {preProcessedData && (
        <div className="analysis-option">
          <p>Document preprocessed successfully. Ready for analysis.</p>
          <button onClick={performAnalysis}>Perform Analysis</button>
        </div>
      )}

      {analysisUrl && (
        <div className="download-section">
          <p>Analysis completed! You can download your report below:</p>
          <a
            href={analysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-link"
          >
            Download Report
          </a>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}
      {error && (
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleReset}>Start Over</button>
        </div>
      )}
    </div>
  );
};

export default AnalysisCenter;
