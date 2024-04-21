import React, { useState } from 'react';
import ChatBot from '../../components/chatbot/ChatBot';
import ProChatBot from '../../components/chatbot/ProChatBot';
import EnterpriseChatBot from '../../components/chatbot/EnterpriseChatBot';
// import Sidebar from '../Components/Sidebar';
// import Footer from '../Components/Footer';

const ChatPage = ({ type }) => {
    const [chatMessages, setChatMessages] = useState([]);

    // Function to clear chat messages
    const clearChat = () => {
        localStorage.removeItem('chatMessages');
        setChatMessages([]);
    };

    // Render different chat components based on the type
    const renderChatComponent = () => {
        switch (type) {
            case 'Pro':
                return <ProChatBot />;
            case 'Enterprise':
                return <EnterpriseChatBot />;
            case 'Chat':
            default:
                return <ChatBot />;
        }
    };

    return (
        <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
                <div className="col d-flex flex-column h-sm-100">
                    {renderChatComponent()}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;