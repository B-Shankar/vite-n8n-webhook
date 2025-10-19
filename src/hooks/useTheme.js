import { useState, useEffect } from 'react';

export const useTheme = () => {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('theme');
			return saved || 'light';
		}
		return 'light';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prev => prev === 'light' ? 'dark' : 'light');
	};

	return { theme, toggleTheme };
};
