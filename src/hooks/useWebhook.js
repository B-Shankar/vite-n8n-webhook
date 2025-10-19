// hooks/useWebhook.js
import { useState } from 'react';

const WEBHOOK_URL = 'WEB_HOOK_URL';

export const useWebhook = () => {
	const [connectionStatus, setConnectionStatus] = useState('connected');

	const parseWebhookResponse = (responseText) => {
		try {
			const jsonResponse = JSON.parse(responseText);

			// Handle different possible response formats from n8n
			const aiResponse = jsonResponse.output ||
				jsonResponse.response ||
				jsonResponse.message ||
				jsonResponse.result ||
				jsonResponse.text ||
				jsonResponse.content ||
				responseText;

			// Ensure we return the raw text with markdown formatting intact
			return typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse);
		} catch (e) {
			// If not JSON, return as plain text (preserving markdown)
			return responseText;
		}
	};

	const sendMessage = async (message) => {
		console.log('Sending message to n8n webhook:', message);
		setConnectionStatus('sending');

		try {
			const response = await fetch(WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chatInput: message,
					sessionId: 'chat-session-' + Date.now(),
					user: {
						name: 'Bhimashankar',
						timestamp: new Date().toISOString()
					},
					message: message,
				})
			});

			if (response.ok) {
				const responseText = await response.text();
				console.log('Raw n8n response:', responseText);

				const aiResponse = parseWebhookResponse(responseText);
				console.log('Parsed AI response:', aiResponse);

				setConnectionStatus('connected');
				return {
					success: true,
					message: aiResponse || 'Received response from n8n webhook'
				};
			} else {
				throw new Error(`n8n webhook returned ${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			console.error('Error communicating with n8n webhook:', error);
			setConnectionStatus('error');
			throw error;
		}
	};

	const testConnection = async () => {
		try {
			const response = await sendMessage('Test connection: Can you respond with **bold text** and *italic text*?');
			alert(`n8n webhook test successful!\nResponse: ${response.message}`);
		} catch (error) {
			alert(`n8n webhook test failed:\n${error.message}`);
		}
	};

	return {
		sendMessage,
		connectionStatus,
		testConnection
	};
};
