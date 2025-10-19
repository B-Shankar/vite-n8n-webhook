// components/InputSection.jsx
import React from 'react';
import ModeToggle from './ModeToggle';
import TextInput from './TextInput';
import VoiceInput from './VoiceInput';
import SendButton from './SendButton';

const InputSection = ({
	                      inputText,
	                      setInputText,
	                      inputMode,
	                      isListening,
	                      isLoading,
	                      speechSupported,
	                      onSend,
	                      onToggleMode,
	                      onStartListening,
	                      onStopListening
                      }) => {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
			e.preventDefault();
			if (!isLoading && inputText.trim()) {
				onSend();
			}
		}
	};

	const handleSendClick = (e) => {
		e.preventDefault();
		if (!isLoading && inputText.trim()) {
			onSend();
		}
	};

	const isSendDisabled = !inputText.trim() || isLoading;

	return (
		<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 z-40 shadow-lg">
			<div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
				{/* Mode Toggle */}
				<ModeToggle
					currentMode={inputMode}
					onToggle={onToggleMode}
					isLoading={isLoading}
					speechSupported={speechSupported}
				/>

				{/* Input Area */}
				<form onSubmit={handleSendClick} className="flex items-end space-x-2 sm:space-x-3">
					{inputMode === 'type' ? (
						<TextInput
							value={inputText}
							onChange={setInputText}
							onKeyPress={handleKeyPress}
							disabled={isLoading}
							rows={3}
						/>
					) : (
						<VoiceInput
							isListening={isListening}
							isLoading={isLoading}
							onStart={onStartListening}
							onStop={onStopListening}
							transcribedText={inputText}
						/>
					)}

					<SendButton
						onClick={handleSendClick}
						disabled={isSendDisabled}
						isLoading={isLoading}
					/>
				</form>

				{/* Speech Recognition Status */}
				{inputMode === 'speak' && inputText && (
					<div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
							<span className="font-medium">Transcribed:</span> {inputText}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default InputSection;
