import React, { useState } from 'react';
import clsx from 'clsx';

const Visiteur: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<string[]>([]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = `Vous: ${input}`;
      setMessages([...messages, userMessage]);
      setInput(''); 
      

      const response = `Réponse du système pour: ${input}`;
      setResults([...results, response]); 
    }
  };

  return (
    <div className="chat-container">
      <h1 className="header">Comment puis-je vous aider ?</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result">
            {result}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message ici..."
          required
          rows={4}
          className="input-textarea"
        />
        <button type="submit" className='btn btn-primary'>Envoyer</button>
      </form>
    </div>
  );
};

// Styles en CSS
const styles = `
  .chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
  }

  .messages {
    max-height: 200px; /* Ajusté la hauteur pour faire de la place pour les résultats */
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .message {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #e9ecef;
  }

  .results {
    max-height: 200px; /* Hauteur de la section des résultats */
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #007bff; /* Bordure pour distinguer les résultats */
    border-radius: 5px;
    background-color: #f0f8ff; /* Couleur de fond claire */
  }

  .result {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #d1ecf1; /* Couleur pour les réponses */
  }

  .input-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: none;
    font-family: inherit;
    font-size: 16px;
  }

  .btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #45a049;
  }

  .btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default Visiteur;