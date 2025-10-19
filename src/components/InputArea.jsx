// components/InputArea.jsx
import React, { useRef, useEffect } from 'react';
import { Send, Mic, Type, MicOff, Loader } from 'lucide-react';

const InputArea = ({
	                   inputText,
	                   setInputText,
	                   inputMode,
	                   isListening,
	                   onSend,
	                   onToggleMode,
	                   onStartListening,
	                   onStopListening,
	                   isLoading
                   }) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		if (textareaRef.current && inputMode === 'type') {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
		}
	}, [inputText, inputMode]);

	// Fixed handleKeyPress with proper event handling
	const handleKeyPress = (e) => {
		console.log('Key pressed:', e.key, 'shiftKey:', e.shiftKey);
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (!isLoading && inputText.trim()) {
				console.log('Enter pressed, calling onSend');
				onSend();
			}
		}
	};

	// Fixed handleSendClick
	const handleSendClick = (e) => {
		e.preventDefault();
		console.log('Send button clicked, input:', inputText);
		if (!isLoading && inputText.trim()) {
			onSend();
		}
	};

	const handleMicClick = () => {
		if (isListening) {
			onStopListening();
		} else {
			onStartListening();
		}
	};

	const isSendDisabled = !inputText.trim() || isLoading;

	return (
		<div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 sticky bottom-0">
			<div className="max-w-4xl mx-auto">
				{/* Input Mode Toggle */}
				<div className="flex items-center justify-center mb-3">
					<div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 flex shadow-inner">
						<button
							type="button"
							onClick={onToggleMode}
							disabled={isLoading}
							className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
								inputMode === 'type'
									? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
							} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							<Type className="w-4 h-4" />
							<span>Type</span>
						</button>
						<button
							type="button"
							onClick={onToggleMode}
							disabled={isLoading}
							className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
								inputMode === 'speak'
									? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
							} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							<Mic className="w-4 h-4" />
							<span>Speak</span>
						</button>
					</div>
				</div>

				{/* Input Area */}
				<form onSubmit={(e) => { e.preventDefault(); handleSendClick(e); }} className="flex items-end space-x-3">
					{inputMode === 'type' ? (
						<div className="flex-1 relative">
              <textarea
	              ref={textareaRef}
	              value={inputText}
	              onChange={(e) => {
		              console.log('Input changed:', e.target.value);
		              setInputText(e.target.value);
	              }}
	              onKeyDown={handleKeyPress}
	              placeholder="What do you want to know?"
	              disabled={isLoading}
	              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all ${
		              isLoading ? 'opacity-50 cursor-not-allowed' : ''
	              }`}
	              rows="3"
	              style={{ minHeight: '48px', maxHeight: '120px' }}
              />
						</div>
					) : (
						<div className="flex-1 flex items-center justify-center">
							<button
								type="button"
								onClick={handleMicClick}
								disabled={isLoading}
								className={`w-full py-4 px-6 rounded-2xl border-2 border-dashed transition-all ${
									isListening
										? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 animate-pulse'
										: isLoading
											? 'border-gray-200 bg-gray-50 dark:bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
											: 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
								}`}
							>
								<div className="flex items-center justify-center space-x-3">
									{isListening ? (
										<>
											<div className="relative">
												<MicOff className="w-6 h-6" />
												<div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
											</div>
											<span className="font-medium">Listening... Click to stop</span>
										</>
									) : (
										<>
											<Mic className="w-6 h-6" />
											<span className="font-medium">
                        {isLoading ? 'Processing...' : 'Click to start speaking'}
                      </span>
										</>
									)}
								</div>
							</button>
						</div>
					)}

					{/* Send Button */}
					<button
						type="submit"
						onClick={handleSendClick}
						disabled={isSendDisabled}
						className={`p-3 rounded-full transition-all flex items-center justify-center ${
							isSendDisabled
								? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
								: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
						}`}
					>
						{isLoading ? (
							<Loader className="w-5 h-5 animate-spin" />
						) : (
							<Send className="w-5 h-5" />
						)}
					</button>
				</form>

				{/* Speech Recognition Status */}
				{inputMode === 'speak' && inputText && (
					<div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<p className="text-sm text-blue-800 dark:text-blue-200">
							<span className="font-medium">Transcribed:</span> {inputText}
						</p>
					</div>
				)}

				{/* Debug Info (remove in production) */}
				<div className="mt-2 text-center">
          <span className="inline-flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Debug: Input length: {inputText.length}</span>
          </span>
				</div>
			</div>
		</div>
	);
};

export default InputArea;
