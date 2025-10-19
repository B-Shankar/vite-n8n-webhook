// components/ModeToggle.jsx
import React from 'react';
import { Type, Mic, MicOff } from 'lucide-react';

const ModeToggle = ({ currentMode, onToggle, isLoading, speechSupported }) => {
	return (
		<div className="flex items-center justify-center mb-3">
			<div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex shadow-inner">
				<button
					type="button"
					onClick={() => currentMode !== 'type' && onToggle()}
					disabled={isLoading}
					className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
						currentMode === 'type'
							? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
							: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
					} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					<Type className="w-3 h-3 sm:w-4 sm:h-4" />
					<span>Type</span>
				</button>
				<button
					type="button"
					onClick={() => currentMode !== 'speak' && onToggle()}
					disabled={isLoading || !speechSupported}
					className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
						currentMode === 'speak'
							? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
							: speechSupported
								? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-400 cursor-not-allowed'
					} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					{speechSupported ? <Mic className="w-3 h-3 sm:w-4 sm:h-4" /> : <MicOff className="w-3 h-3 sm:w-4 sm:h-4" />}
					<span>Speak</span>
				</button>
			</div>
		</div>
	);
};

export default ModeToggle;
