import React, { useState } from 'react';

const QueryBuilder = () => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState('No results yet...');

  const handleRunQuery = () => {
    if (!sqlQuery.trim()) {
      setQueryResults('<p style="color: #8e1c0f;">Please enter a SQL query first.</p>');
      return;
    }
    
    const query = sqlQuery.toLowerCase();
    let result = '';
    
    if (query.includes('select') && query.includes('users')) {
      result = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background: #f0f0f0;">
            <th style="padding: 8px; border: 1px solid #ddd;">ID</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Name</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Email</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Status</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">001</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Sean de Lara</td>
            <td style="padding: 8px; border: 1px solid #ddd;">delara.sean@gmail.com</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Active</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">002</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Jenat Iguod</td>
            <td style="padding: 8px; border: 1px solid #ddd;">iguod.jenat@gmail.com</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Active</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">003</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Elixer Alcoba</td>
            <td style="padding: 8px; border: 1px solid #ddd;">alcobaelixer@gmail.com</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Active</td>
          </tr>
        </table>
        <p style="color: #1f7a2f; margin-top: 10px;">Query executed successfully. 3 rows returned.</p>
      `;
    } else if (query.includes('select') && query.includes('venues')) {
      result = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background: #f0f0f0;">
            <th style="padding: 8px; border: 1px solid #ddd;">venue_ID</th>
            <th style="padding: 8px; border: 1px solid #ddd;">venue_Name</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Address</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Capacity</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">V001</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Sunset Hall</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Manila</td>
            <td style="padding: 8px; border: 1px solid #ddd;">250</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">V002</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Blue Lagoon Venue</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Quezon City</td>
            <td style="padding: 8px; border: 1px solid #ddd;">380</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">V003</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Royal Pavilion</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Pasig</td>
            <td style="padding: 8px; border: 1px solid #ddd;">500</td>
          </tr>
        </table>
        <p style="color: #1f7a2f; margin-top: 10px;">Query executed successfully. 3 rows returned.</p>
      `;
    } else if (query.includes('update') || query.includes('insert') || query.includes('delete')) {
      result = `<p style="color: #1f7a2f;">Query executed successfully. 1 row affected.</p>`;
    } else {
      result = `<p style="color: #1f7a2f;">Query executed successfully. No results to display.</p>`;
    }
    
    setQueryResults(result);
  };

  const handleClearQuery = () => {
    setSqlQuery('');
    setQueryResults('No results yet...');
  };

  return (
    <section className="venue-ease-page">
      <h2>QUERY EDITOR</h2>

      <div className="venue-ease-query-box">
        {/* SQL Analyzer */}
        <div className="venue-ease-query-section">
          <div className="venue-ease-query-header">
            SQL Analyzer
            <div>
              <button className="venue-ease-query-btn" onClick={handleRunQuery}>Run</button>
              <button className="venue-ease-query-btn" onClick={handleClearQuery}>Clear</button>
            </div>
          </div>
          <div className="venue-ease-query-content">
            <textarea 
              className="venue-ease-textarea"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="Write SQL query here..."
            />
          </div>
        </div>

        {/* Results */}
        <div className="venue-ease-query-section">
          <div className="venue-ease-query-header">Results</div>
          <div className="venue-ease-query-content" dangerouslySetInnerHTML={{ __html: queryResults }} />
        </div>
      </div>
    </section>
  );
};

export default QueryBuilder;