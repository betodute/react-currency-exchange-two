import './App.css'
import { useState, useEffect } from 'react';

export const News = (props) => {

  const [headlines, setHeadlines] = useState('[]');

  useEffect(() => {
    console.log("this is the key:", process.env.REACT_APP_NYT_KEY)
    const fetchFinancialHeadlines = async () => {
      try {
        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=financial&api-key=${process.env.REACT_APP_NYT_KEY}`);
        const data = await response.json();
        setHeadlines(data);
      } catch (error) {
        console.error('Error:', error);
      }
      console.log(headlines.response.docs)
    };
    fetchFinancialHeadlines();
  }, [])

  return (
    <div className='news-wrapper rounded bg-warning-subtle bg-opacity-50'>
      <h3 className='news-title'>latest financial from the nyts</h3>
      <ul>
        {headlines.response && headlines.response.docs && headlines.response.docs.map((doc, index) => (
          <li key={index} className='single-headline'> 
            <a href={doc.web_url} className='link-headline'>{doc.headline.main}</a>
            <p className='single-snippet'> {doc.snippet} </p>
          </li>
        ))}
      </ul>
    </div>
  );
  
}