import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FiMessageCircle, FiSend, FiX, FiMinus, FiMaximize2 } from 'react-icons/fi';
import styled from 'styled-components';

//  chat bubble
const ChatBubble = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 1rem;
  background-color: #4c6ef5;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1050; /* Ensure it stays on top */
  &:hover {
    background-color: #364fc7;
    transform: scale(1.1);
  }
`;

// chat box
const ChatBox = styled.div`
  position: fixed;
  bottom: 20px; /* Positioning the chat box to overlap the bubble */
  right: 20px;
  width: 300px;
  height: ${props => props.isMinimized ? '50px' : '400px'};
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 1050; /* Ensure it stays on top */
  transition: height 0.3s ease-in-out;
  overflow: hidden;
`;

//  message box
const MessageBox = styled.div`
  max-width: 80%;
  padding: 0.75rem;
  border-radius: ${props => props.isUser ? '10px 0 10px 10px' : '0 10px 10px 10px'};
  background-color: ${props => props.isUser ? '#4c6ef5' : '#e9ecef'};
  color: ${props => props.isUser ? 'white' : 'black'};
`;

//  header
const Header = styled.div`
  padding: 10px;
  background-color: #4c6ef5;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// chat content
const ChatContent = styled.div`
  display: ${props => props.isMinimized ? 'none' : 'flex'};
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! How can we help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      const responses = [
        "I understand. Let me help you with that.",
        "Thanks for reaching out! I'll look into this for you.",
        "Could you please provide more details?",
        "I'm checking this for you right now."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomResponse,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {!isOpen && (
        <ChatBubble onClick={openChat}>
          <FiMessageCircle size={24} />
        </ChatBubble>
      )}

      {isOpen && (
        <ChatBox isMinimized={isMinimized}>
          <Header>
            <h5 style={{ margin: 0 }}>Support Chat</h5>
            <div>
              <Button variant="link" style={{ color: 'white' }} onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <FiMaximize2 /> : <FiMinus />}
              </Button>
              <Button variant="link" style={{ color: 'white' }} onClick={closeChat}><FiX /></Button>
            </div>
          </Header>
          <ChatContent isMinimized={isMinimized}>
            <div style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex ${msg.isUser ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <MessageBox isUser={msg.isUser}>
                    <p className="mb-1">{msg.text}</p>
                    <small className="text-muted">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </MessageBox>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
              <Form onSubmit={handleSend}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    <FiSend />
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </ChatContent>
        </ChatBox>
      )}
    </>
  );
}

export default SupportWidget;
