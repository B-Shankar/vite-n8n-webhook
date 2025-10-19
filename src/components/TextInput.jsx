// components/TextInput.jsx
import React, { useRef, useEffect } from 'react';

const TextInput = ({ value, onChange, onKeyPress, disabled, rows = 3 }) => {
	const textareaRef = useRef(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			const maxHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight) * rows;
			textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
		}
	}, [value, rows]);

	return (
		<div className="flex-1 relative">
      <textarea
	      ref={textareaRef}
	      value={value}
	      onChange={(e) => onChange(e.target.value)}
	      onKeyDown={onKeyPress}
	      placeholder="What do you want to know? (Press Enter to send, Shift+Enter for new line)"
	      disabled={disabled}
	      rows={rows}
	      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all leading-relaxed ${
		      disabled ? 'opacity-50 cursor-not-allowed' : ''
	      }`}
	      style={{
		      minHeight: `${rows * 1.5}rem`,
		      maxHeight: `${rows * 1.5}rem`
	      }}
      />
			<div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">
				{value.length}
			</div>
		</div>
	);
};

export default TextInput;
