// components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList';
import InputSection from './InputSection';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useWebhook } from '../hooks/useWebhook';

const ChatInterface = () => {
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Hey Bhimashankar. How can I help you today?",
			sender: 'ai',
			timestamp: new Date().toISOString()
		}
	]);
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem('darkMode');
		return saved ? JSON.parse(saved) : false;
	});
	const [inputMode, setInputMode] = useState('type');
	const messagesEndRef = useRef(null);

	// Custom hooks
	const {
		isListening,
		startListening,
		stopListening,
		transcript,
		isSupported: speechSupported
	} = useSpeechRecognition();

	const { sendMessage, connectionStatus, testConnection } = useWebhook();

	// Update input text from speech recognition
	useEffect(() => {
		if (transcript) {
			setInputText(transcript);
		}
	}, [transcript]);

	// Auto-scroll to bottom
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Dark mode handler
	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	const handleSendMessage = async () => {
		if (!inputText.trim()) return;

		const userMessage = {
			id: Date.now(),
			text: inputText.trim(),
			sender: 'user',
			timestamp: new Date().toISOString()
		};

		setMessages(prev => [...prev, userMessage]);
		const messageToSend = inputText.trim();
		setInputText('');
		setIsLoading(true);

		try {
			const response = await sendMessage(messageToSend);

			const aiMessage = {
				id: Date.now() + 1,
				text: response.message || `Processed your message: "${messageToSend}"`,
				sender: 'ai',
				timestamp: new Date().toISOString()
			};

			setMessages(prev => [...prev, aiMessage]);
		} catch (error) {
			const errorMessage = {
				id: Date.now() + 1,
				text: `Sorry, I'm having trouble connecting. Error: ${error.message}`,
				sender: 'ai',
				timestamp: new Date().toISOString()
			};
			setMessages(prev => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleInputMode = () => {
		setInputMode(prev => prev === 'type' ? 'speak' : 'type');
		if (isListening) {
			stopListening();
		}
		setInputText('');
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<div className={`min-h-screen flex flex-col transition-colors duration-300 ${
			darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
		}`}>
			<Header
				darkMode={darkMode}
				connectionStatus={connectionStatus}
				onToggleDarkMode={toggleDarkMode}
				onTestConnection={testConnection}
				isLoading={isLoading}
			/>

			<MessageList
				messages={messages}
				isLoading={isLoading}
				messagesEndRef={messagesEndRef}
			/>

			<InputSection
				inputText={inputText}
				setInputText={setInputText}
				inputMode={inputMode}
				isListening={isListening}
				isLoading={isLoading}
				speechSupported={speechSupported}
				onSend={handleSendMessage}
				onToggleMode={toggleInputMode}
				onStartListening={startListening}
				onStopListening={stopListening}
			/>
		</div>
	);
};

export default ChatInterface;
