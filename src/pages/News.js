import React, { useState } from 'react';
import '../styles/News.css';

const companies = [
  { company: 'Tesla'},
  { company: 'Apple'},
  { company: 'Amazon'},
  { company: 'Google'},
  { company: 'Microsoft'},
  { company: 'Netflix'}
];

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanyNews = async (company) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(`https://fetch-news-to-display-production.up.railway.app/api/news/${company}`);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}\n${errorDetails}`);
      };

      const rawData = await response.json();
      const formattedData = rawData.map((article) => ({
        company_name: article.company_name,
        id: article.id,
        link: article.link,
        published_date: article.published_date,
        summary: article.summary,
        title: article.title,
      }));

      setData(formattedData);

    } catch (error) {
      setError(`Failed to fetch company news: ${error.message}`);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='news-header-area fade-in' style={{ animationDelay: '0.2s' }}>
        <h1>Financial News</h1>
        <p>Stay updated with the latest news about your favorite companies.</p>
      </div>    
      
      <div className="company-grid fade-in" style={{ animationDelay: '0.4s' }}>
        {companies.map((company) => (
          <div
            key={company.company}
            className='company-box'
            onClick={() => fetchCompanyNews(company.company)}
          >
            <h3>{company.company}</h3>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading, please wait...</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}

      {data.length > 0 && (
        <div className='news-containers fade-in' style={{ animationDelay: '0.6s' }}>
          {data.map((article, index) => (
            <div
              key={article.id}
              className='article-container fade-in'
              onClick={() => window.open(article.link, "_blank")}
              style={{ 
                animationDelay: `${0.6 + index * 0.1}s`, 
                cursor: "pointer", 
                border: "1px solid #ccc", 
                padding: "10px", 
                margin: "10px 0" 
              }}
            >
              <h4>{article.title}</h4>
              <p>{article.summary}</p>
              <p style={{ fontStyle: "italic", color: "gray" }}>{article.published_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
