// components/ChatMessage.jsx
import React, { useState } from 'react';
import { User, Bot, Clock, Copy, Check } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import ErrorBoundary from './ErrorBoundary';

const ChatMessage = ({ message }) => {
	const [showFullTime, setShowFullTime] = useState(false);
	const [copied, setCopied] = useState(false);
	const isUser = message.sender === 'user';

	const formatTime = (timestamp, full = false) => {
		const date = new Date(timestamp);
		if (full) {
			return date.toLocaleString([], {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});
		}
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const getRelativeTime = (timestamp) => {
		const now = new Date();
		const messageTime = new Date(timestamp);
		const diffInSeconds = Math.floor((now - messageTime) / 1000);

		if (diffInSeconds < 60) return 'just now';
		if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
		if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
		return formatTime(timestamp);
	};

	// Check if message contains markdown formatting
	const hasMarkdown = (text) => {
		const markdownPatterns = [
			/\*\*.*?\*\*/g,  // Bold: **text**
			/\*.*?\*/g,      // Italic: *text*
			/`.*?`/g,        // Code: `text`
			/``````/g, // Code block: ``````
			/^#+\s/gm,       // Headers: # ## ###
			/^\*\s/gm,       // Bullet list: * item
			/^\d+\.\s/gm,    // Numbered list: 1. item
			/\[.*?\]\(.*?\)/g, // Links: [text](url)
			/^>\s/gm,        // Blockquote: > text
		];

		return markdownPatterns.some(pattern => pattern.test(text));
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(message.text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 animate-fadeIn`}>
			<div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] ${
				isUser ? 'flex-row-reverse space-x-reverse' : ''
			}`}>
				{/* Avatar */}
				<div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md ${
					isUser
						? 'bg-gradient-to-r from-blue-500 to-blue-600'
						: 'bg-gradient-to-r from-purple-500 to-pink-500'
				}`}>
					{isUser ? (
						<User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
					) : (
						<Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
					)}
				</div>

				{/* Message Bubble */}
				<div className="group relative flex-1 min-w-0">
					<div className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border transition-all hover:shadow-md ${
						isUser
							? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500'
							: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700'
					}`}>
						{/* Message Content with Error Boundary */}
						<div className="text-sm sm:text-base leading-relaxed break-words">
							{!isUser && hasMarkdown(message.text) ? (
								<ErrorBoundary>
									<MarkdownMessage content={message.text} />
								</ErrorBoundary>
							) : (
								<p className="whitespace-pre-wrap">{message.text}</p>
							)}
						</div>

						{/* Copy Button (for AI messages with markdown) */}
						{!isUser && hasMarkdown(message.text) && (
							<button
								onClick={copyToClipboard}
								className="absolute top-2 right-2 p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
								title="Copy message"
							>
								{copied ? (
									<Check className="w-3 h-3 text-green-600" />
								) : (
									<Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
								)}
							</button>
						)}
					</div>

					{/* Timestamp */}
					<div
						className={`flex items-center mt-1 px-2 ${
							isUser ? 'justify-end' : 'justify-start'
						}`}
						onClick={() => setShowFullTime(!showFullTime)}
					>
						<div className={`flex items-center space-x-1 text-xs cursor-pointer transition-opacity
              ${isUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            `}>
							<Clock className="w-3 h-3" />
							<span className="select-none">
                {showFullTime ? formatTime(message.timestamp, true) : getRelativeTime(message.timestamp)}
              </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
