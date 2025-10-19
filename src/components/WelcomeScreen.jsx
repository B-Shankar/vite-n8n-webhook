// components/WelcomeScreen.jsx
import React from 'react';

const WelcomeScreen = () => {
	return (
		<div className="text-center py-6 sm:py-8">
			<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
				<span className="text-white font-bold text-lg sm:text-xl">AI</span>
			</div>
			<h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
				How can I help you today?
			</h2>
			<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
				Connected to n8n webhook for AI processing
			</p>
		</div>
	);
};

export default WelcomeScreen;
