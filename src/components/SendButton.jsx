// components/SendButton.jsx
import React from 'react';
import { Send, Loader } from 'lucide-react';

const SendButton = ({ onClick, disabled, isLoading }) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			disabled={disabled}
			className={`p-2 sm:p-3 rounded-full transition-all flex items-center justify-center flex-shrink-0 ${
				disabled
					? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
					: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
			}`}
		>
			{isLoading ? (
				<Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
			) : (
				<Send className="w-4 h-4 sm:w-5 sm:h-5" />
			)}
		</button>
	);
};

export default SendButton;
