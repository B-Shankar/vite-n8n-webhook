// components/VoiceInput.jsx
import React from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceInput = ({ isListening, isLoading, onStart, onStop, transcribedText }) => {
	const handleMicClick = () => {
		if (isListening) {
			onStop();
		} else {
			onStart();
		}
	};

	return (
		<div className="flex-1 flex items-center justify-center">
			<button
				type="button"
				onClick={handleMicClick}
				disabled={isLoading}
				className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl border-2 border-dashed transition-all ${
					isListening
						? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 animate-pulse'
						: isLoading
							? 'border-gray-200 bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
							: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
				}`}
			>
				<div className="flex items-center justify-center space-x-2 sm:space-x-3">
					{isListening ? (
						<>
							<div className="relative">
								<MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
								<div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-ping"></div>
							</div>
							<span className="font-medium text-sm sm:text-base">Listening... Tap to stop</span>
						</>
					) : (
						<>
							<Mic className="w-5 h-5 sm:w-6 sm:h-6" />
							<span className="font-medium text-sm sm:text-base">
                {isLoading ? 'Processing...' : 'Tap to start speaking'}
              </span>
						</>
					)}
				</div>
			</button>
		</div>
	);
};

export default VoiceInput;
