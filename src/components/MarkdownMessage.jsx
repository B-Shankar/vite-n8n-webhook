// components/MarkdownMessage.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownMessage = ({ content }) => {
	return (
		<div className="markdown-content">
			<ReactMarkdown
				components={{
					// Custom styling for different markdown elements
					h1: ({ children }) => (
						<h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{children}</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-md font-medium mb-2 text-gray-900 dark:text-white">{children}</h3>
					),
					p: ({ children }) => (
						<p className="mb-2 last:mb-0 leading-relaxed text-gray-800 dark:text-gray-200">{children}</p>
					),
					strong: ({ children }) => (
						<strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
					),
					em: ({ children }) => (
						<em className="italic text-gray-800 dark:text-gray-200">{children}</em>
					),
					code: ({ children, inline }) =>
						inline ? (
							<code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
								{children}
							</code>
						) : (
							<code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm font-mono overflow-x-auto">
								{children}
							</code>
						),
					pre: ({ children }) => (
						<pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm font-mono overflow-x-auto mb-2">
              {children}
            </pre>
					),
					ul: ({ children }) => (
						<ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
					),
					ol: ({ children }) => (
						<ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
					),
					li: ({ children }) => (
						<li className="text-gray-800 dark:text-gray-200">{children}</li>
					),
					blockquote: ({ children }) => (
						<blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-2 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300">
							{children}
						</blockquote>
					),
					a: ({ children, href }) => (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
						>
							{children}
						</a>
					),
					table: ({ children }) => (
						<div className="overflow-x-auto mb-2">
							<table className="min-w-full border border-gray-300 dark:border-gray-600">
								{children}
							</table>
						</div>
					),
					thead: ({ children }) => (
						<thead className="bg-gray-100 dark:bg-gray-700">{children}</thead>
					),
					tbody: ({ children }) => (
						<tbody>{children}</tbody>
					),
					tr: ({ children }) => (
						<tr className="border-b border-gray-200 dark:border-gray-600">{children}</tr>
					),
					th: ({ children }) => (
						<th className="px-3 py-2 text-left font-semibold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600 last:border-r-0">
							{children}
						</th>
					),
					td: ({ children }) => (
						<td className="px-3 py-2 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-600 last:border-r-0">
							{children}
						</td>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownMessage;
