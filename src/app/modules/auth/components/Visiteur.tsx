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



export default Visiteur;
