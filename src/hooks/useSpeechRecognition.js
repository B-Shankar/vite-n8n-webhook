// hooks/useSpeechRecognition.js
import { useState, useRef, useEffect } from 'react';

export const useSpeechRecognition = () => {
	const [isListening, setIsListening] = useState(false);
	const [transcript, setTranscript] = useState('');
	const [isSupported, setIsSupported] = useState(false);
	const recognitionRef = useRef(null);

	useEffect(() => {
		if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
			setIsSupported(true);
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.continuous = false;
			recognitionRef.current.interimResults = false;
			recognitionRef.current.lang = 'en-US';

			recognitionRef.current.onresult = (event) => {
				const newTranscript = event.results[0][0].transcript;
				setTranscript(newTranscript);
				setIsListening(false);
			};

			recognitionRef.current.onerror = (event) => {
				console.error('Speech recognition error:', event.error);
				setIsListening(false);
			};

			recognitionRef.current.onend = () => {
				setIsListening(false);
			};
		}
	}, []);

	const startListening = () => {
		if (recognitionRef.current && !isListening && isSupported) {
			setIsListening(true);
			setTranscript('');
			try {
				recognitionRef.current.start();
			} catch (error) {
				console.error('Error starting speech recognition:', error);
				setIsListening(false);
			}
		}
	};

	const stopListening = () => {
		if (recognitionRef.current && isListening) {
			recognitionRef.current.stop();
			setIsListening(false);
		}
	};

	return {
		isListening,
		transcript,
		isSupported,
		startListening,
		stopListening
	};
};
