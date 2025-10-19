// components/ErrorBoundary.jsx
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error to console for debugging
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		this.setState({
			error: error,
			errorInfo: errorInfo
		});

		// You can also log the error to an error reporting service here
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	render() {
		if (this.state.hasError) {
			// Fallback UI
			return (
				<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<div className="flex items-start space-x-3">
						<AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
						<div className="flex-1 min-w-0">
							<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
								Something went wrong with the message rendering
							</h3>
							<p className="text-sm text-red-700 dark:text-red-300 mt-1">
								The message couldn't be displayed properly. This might be due to invalid formatting.
							</p>
							{process.env.NODE_ENV === 'development' && this.state.error && (
								<details className="mt-2">
									<summary className="text-xs text-red-600 dark:text-red-400 cursor-pointer">
										Show error details (Development only)
									</summary>
									<pre className="text-xs text-red-600 dark:text-red-400 mt-1 overflow-auto bg-red-100 dark:bg-red-900/40 p-2 rounded">
                    {this.state.error.toString()}
										{this.state.errorInfo.componentStack}
                  </pre>
								</details>
							)}
							<button
								onClick={this.handleReset}
								className="inline-flex items-center space-x-1 mt-2 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
							>
								<RefreshCw className="w-3 h-3" />
								<span>Try again</span>
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
