import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-lg transition-colors ${
				theme === 'dark'
					? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
					: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
			}`}
			aria-label="Toggle theme"
		>
			{theme === 'dark' ? (
				<Sun className="w-5 h-5" />
			) : (
				<Moon className="w-5 h-5" />
			)}
		</button>
	);
};

export default ThemeToggle;
