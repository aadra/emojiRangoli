import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [emoji1, setEmoji1] = useState('');
  const [emoji2, setEmoji2] = useState('');
  const [rangoli, setRangoli] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRangoli = async () => {
    setLoading(true);
    setRangoli('');

    const prompt = `Create a beautiful rangoli pattern using these two emojis: ${emoji1} and ${emoji2}. The pattern should resemble a traditional Indian rangoli.`;
    
    try {
      const response = await axios.post('/.netlify/functions/generateEmojiRangoli', {
        prompt,
        max_tokens: 100,
      });
      const generatedRangoli = response.data.choices[0].text.trim();
      setRangoli(generatedRangoli);
    } catch (error) {
      console.error('Error generating emoji rangoli:', error);
      alert('Failed to generate rangoli.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Emoji Rangoli Generator</h1>
      <div>
        <input
          type="text"
          value={emoji1}
          onChange={(e) => setEmoji1(e.target.value)}
          placeholder="Enter first emoji"
          maxLength="2"
        />
        <input
          type="text"
          value={emoji2}
          onChange={(e) => setEmoji2(e.target.value)}
          placeholder="Enter second emoji"
          maxLength="2"
        />
        <button onClick={generateRangoli} disabled={loading || !emoji1 || !emoji2}>
          {loading ? 'Generating...' : 'Generate Rangoli'}
        </button>
      </div>
      {rangoli && <div style={{ fontSize: '24px', marginTop: '20px', whiteSpace: 'pre-line' }}>{rangoli}</div>}
    </div>
  );
}

export default App;
