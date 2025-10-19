// components/ConnectionStatus.jsx
import React from 'react';

const ConnectionStatus = ({ status, className = '', compact = false }) => {
	const getStatusConfig = () => {
		switch (status) {
			case 'connected':
				return {
					color: 'bg-green-500',
					text: compact ? 'Connected' : 'n8n Connected',
					textColor: 'text-green-600 dark:text-green-400'
				};
			case 'sending':
				return {
					color: 'bg-yellow-500 animate-pulse',
					text: compact ? 'Sending...' : 'Sending to n8n...',
					textColor: 'text-yellow-600 dark:text-yellow-400'
				};
			case 'error':
				return {
					color: 'bg-red-500',
					text: compact ? 'Error' : 'n8n Connection Error',
					textColor: 'text-red-600 dark:text-red-400'
				};
			default:
				return {
					color: 'bg-gray-500',
					text: 'Unknown',
					textColor: 'text-gray-600 dark:text-gray-400'
				};
		}
	};

	const { color, text, textColor } = getStatusConfig();

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<div className={`w-2 h-2 rounded-full ${color}`}></div>
			<p className={`text-xs font-medium ${textColor}`}>
				{text}
			</p>
		</div>
	);
};

export default ConnectionStatus;
