import React, { useState } from 'react';
import './App.css';
function App() {
  const [questionId, setQuestionId] = useState('');
  const [response, setResponse] = useState('');

  const handleQuestionChange = (event) => {
    setQuestionId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResponse('');

    fetch(`http://localhost:3001/stream?questionId=${questionId}`)
      .then((response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const readStream = () => {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                return;
              }

              const chunk = decoder.decode(value);
              setResponse((prevResponse) => prevResponse + chunk);

              readStream();
            })
            .catch((error) => {
              console.error('Error reading stream:', error);
            });
        };

        readStream();
      })
      .catch((error) => {
        console.error('Error fetching response:', error);
      });
  };

  return (
    <div className="app">
      <h1>ChatGPT Stream App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select a question:
          <select value={questionId} onChange={handleQuestionChange}>
          <option value="">-- Select a question --</option>
            <option value="1">What's the core idea of SICP in 150 words?</option>
            <option value="2">Why did Terry Davis go mad?</option>
            <option value="3">What did John Carmack achieve at ID Software?</option>
            <option value="4">What were the last words of Captain Ahab in Moby Dick?</option>
            <option value="5">Do you think K's inability to find The Castle is a mirroring of man's inability to find answers to the most important questions in his life?</option>
          
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="response">
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
