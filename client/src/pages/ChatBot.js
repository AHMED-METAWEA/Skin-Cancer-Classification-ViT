import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ChatBot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: t('hello_i_am_skinai') } // Initial AI message
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages update

    const handleSend = async () => {
    if (input.trim() === '') return;

    const newUserMessage = { sender: 'user', text: input };
    // Add user message to state immediately for quick display
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput(''); // Clear input field

    try {
      // Send message to the backend
      const response = await fetch('http://localhost:5001/chatbot', { // Make sure the URL and port match your Flask server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newUserMessage.text }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to get response from backend');
      }

      const data = await response.json();
      const aiResponse = { sender: 'ai', text: data.response };

      // Add AI response to state
      setMessages(prevMessages => [...prevMessages, aiResponse]);

    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally, display an error message in the chat
      const errorMessage = { sender: 'ai', text: `Error: ${error.message}` };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 102px)', // Adjust based on header/footer height
      maxWidth: 800, // Max width for chat container
      margin: 'auto', // Center the chat container
      background: 'rgba(255,255,255,0.8)',
      borderRadius: 40,
      boxShadow: '0 4px 25px #0001',
      padding: 20,
      border: '1px solid rgba(255,255,255,0.3)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#222' }}>{t('Chat Skinai')}</h2>
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        paddingRight: 20, // Space for scrollbar
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 15, // Space between messages
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              maxWidth: '70%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#6366f1' : '#f3f4f6',
              color: msg.sender === 'user' ? '#fff' : '#333',
              borderRadius: 12,
              padding: '10px 15px',
              wordBreak: 'break-word', // Prevent long words from overflowing
              boxShadow: '0 1px 4px #0001'
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('type_your_message')}
          style={{
            flexGrow: 1,
            padding: '12px 15px',
            border: '1px solid #ccc',
            borderRadius: 40,
            fontSize: 16
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 40,
            padding: '12px 20px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #388e3c22'
          }}
        >
          {t('send')}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;