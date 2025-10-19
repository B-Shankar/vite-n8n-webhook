// components/Header.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

const Header = ({
	                darkMode,
	                connectionStatus,
	                onToggleDarkMode,
	                onTestConnection,
	                isLoading
                }) => {
	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 sticky top-0 z-50 shadow-sm">
			<div className="max-w-4xl mx-auto flex items-center justify-between">
				<div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
					<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
						<span className="text-white font-bold text-sm">AI</span>
					</div>
					<div className="min-w-0 flex-1">
						<h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
							n8n Chat Assistant
						</h1>
						<ConnectionStatus
							status={connectionStatus}
							className="hidden sm:flex"
						/>
					</div>
				</div>

				<div className="flex items-center space-x-2 flex-shrink-0">
					{/* Mobile connection status */}
					<ConnectionStatus
						status={connectionStatus}
						className="flex sm:hidden"
						compact
					/>

					{/* Test button */}
					<button
						onClick={onTestConnection}
						disabled={isLoading}
						className="px-2 sm:px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors disabled:opacity-50"
					>
						<span className="hidden sm:inline">Test n8n</span>
						<span className="sm:hidden">Test</span>
					</button>

					{/* Dark mode toggle */}
					<button
						onClick={onToggleDarkMode}
						className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
						aria-label="Toggle dark mode"
					>
						{darkMode ? (
							<Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
						) : (
							<Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile connection status full width */}
			<div className="sm:hidden mt-2">
				<ConnectionStatus
					status={connectionStatus}
					className="flex justify-center"
				/>
			</div>
		</header>
	);
};

export default Header;
