// components/MessageList.jsx
import React from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import WelcomeScreen from './WelcomeScreen';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
	return (
		<main className="flex-1 overflow-hidden flex flex-col">
			<div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
				<div className="max-w-4xl mx-auto space-y-4">
					{messages.length === 1 && <WelcomeScreen />}

					{messages.map((message) => (
						<ChatMessage key={message.id} message={message} />
					))}

					{isLoading && <LoadingIndicator />}

					<div ref={messagesEndRef} />
				</div>
			</div>
		</main>
	);
};

export default MessageList;
