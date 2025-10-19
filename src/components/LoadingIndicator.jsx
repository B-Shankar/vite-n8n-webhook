// components/LoadingIndicator.jsx
import React from 'react';

const LoadingIndicator = () => {
	return (
		<div className="flex justify-start">
			<div className="bg-white dark:bg-gray-800 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-2">
					<div className="flex space-x-1">
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
						<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
					</div>
					<span className="text-xs text-gray-500 dark:text-gray-400">n8n processing...</span>
				</div>
			</div>
		</div>
	);
};

export default LoadingIndicator;
